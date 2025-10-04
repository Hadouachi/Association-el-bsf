const mysql = require('mysql2/promise')

async function removeVideosFromActivities() {
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
    
    // Vérifier la structure actuelle de la table
    console.log('\n🔍 Vérification de la structure de la table Activity...')
    const [describeResult] = await connection.execute('DESCRIBE Activity')
    console.log('Structure de la table Activity:')
    describeResult.forEach(column => {
      console.log(`   - ${column.Field}: ${column.Type} ${column.Null === 'YES' ? '(nullable)' : '(not null)'}`)
    })
    
    // Vérifier les activités avec des vidéos
    console.log('\n🔍 Vérification des activités avec des vidéos...')
    const [activitiesWithVideos] = await connection.execute(
      'SELECT id, title, videos FROM Activity WHERE videos IS NOT NULL AND videos != "[]"'
    )
    
    if (activitiesWithVideos.length === 0) {
      console.log('✅ Aucune activité avec des vidéos trouvée !')
      return
    }
    
    console.log(`📊 ${activitiesWithVideos.length} activités trouvées avec des vidéos :`)
    activitiesWithVideos.forEach(activity => {
      console.log(`   - ID ${activity.id}: ${activity.title}`)
      console.log(`     Vidéos: ${JSON.stringify(activity.videos)}`)
    })
    
    // Mettre à jour les activités pour supprimer les vidéos
    console.log('\n🔄 Suppression des vidéos des activités...')
    const [updateResult] = await connection.execute(
      'UPDATE Activity SET videos = NULL WHERE videos IS NOT NULL AND videos != "[]"'
    )
    
    console.log(`✅ ${updateResult.affectedRows} activités mises à jour !`)
    
    // Vérifier le résultat
    console.log('\n🔍 Vérification du résultat...')
    const [allActivities] = await connection.execute(
      'SELECT id, title, videos FROM Activity ORDER BY id LIMIT 10'
    )
    
    console.log('\n📋 Aperçu des activités après mise à jour :')
    allActivities.forEach(activity => {
      const hasVideos = activity.videos && activity.videos !== '[]'
      const indicator = hasVideos ? '🎥' : '✅'
      console.log(`   ${indicator} ID ${activity.id}: ${activity.title}`)
      console.log(`      Vidéos: ${activity.videos || 'NULL'}`)
    })
    
    console.log('\n🎉 Migration terminée avec succès !')
    console.log('💡 Les vidéos ne sont plus gérées en dehors des blocs personnalisés.')
    
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
  removeVideosFromActivities()
}

module.exports = removeVideosFromActivities




