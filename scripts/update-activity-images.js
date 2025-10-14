const mysql = require('mysql2/promise')

async function updateActivityImages() {
  let connection
  
  try {
    // Configuration de la base de données
    const dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'association_el_bsf',
      port: process.env.DB_PORT || 3306
    }
    
    console.log('🔌 Connexion à la base de données...')
    connection = await mysql.createConnection(dbConfig)
    console.log('✅ Connexion réussie !')
    
    // Vérifier les activités sans image de couverture
    console.log('\n🔍 Vérification des activités sans image de couverture...')
    const [activitiesWithoutImage] = await connection.execute(
      'SELECT id, title, coverImage FROM Activity WHERE coverImage IS NULL OR coverImage = ""'
    )
    
    if (activitiesWithoutImage.length === 0) {
      console.log('✅ Toutes les activités ont déjà des images de couverture !')
      return
    }
    
    console.log(`📊 ${activitiesWithoutImage.length} activités trouvées sans image de couverture :`)
    activitiesWithoutImage.forEach(activity => {
      console.log(`   - ID ${activity.id}: ${activity.title}`)
    })
    
    // Mettre à jour les activités sans image de couverture
    console.log('\n🔄 Mise à jour des images de couverture...')
    const [updateResult] = await connection.execute(`
      UPDATE Activity 
      SET coverImage = CASE 
        WHEN (id % 3) = 0 THEN '/images/activity-cover3.jpg'
        WHEN (id % 3) = 1 THEN '/images/activity-cover1.jpg'
        WHEN (id % 3) = 2 THEN '/images/activity-cover2.jpg'
        ELSE '/images/activity-cover1.jpg'
      END
      WHERE coverImage IS NULL OR coverImage = ""
    `)
    
    console.log(`✅ ${updateResult.affectedRows} activités mises à jour !`)
    
    // Vérifier le résultat
    console.log('\n🔍 Vérification du résultat...')
    const [allActivities] = await connection.execute(
      'SELECT id, title, coverImage FROM Activity ORDER BY id'
    )
    
    console.log('\n📋 Résumé des activités après mise à jour :')
    allActivities.forEach(activity => {
      const isDefault = activity.coverImage.includes('activity-cover')
      const indicator = isDefault ? '🖼️' : '📸'
      console.log(`   ${indicator} ID ${activity.id}: ${activity.title}`)
      console.log(`      Image: ${activity.coverImage}`)
    })
    
    console.log('\n🎉 Migration terminée avec succès !')
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration :', error)
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
      console.log('\n🔌 Connexion fermée.')
    }
  }
}

// Exécuter la migration si le script est appelé directement
if (require.main === module) {
  updateActivityImages()
}

module.exports = updateActivityImages





