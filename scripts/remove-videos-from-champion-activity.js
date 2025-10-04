const mysql = require('mysql2/promise')

async function removeVideosFromChampionActivity() {
  let connection
  
  try {
    // Configuration de la base de données
    const dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Hadouachi20@',
      database: process.env.DB_NAME || 'association_el_bsf',
      port: process.env.DB_PORT || 3306
    }
    
    console.log('🔌 Connexion à la base de données...')
    connection = await mysql.createConnection(dbConfig)
    console.log('✅ Connexion réussie !')
    
    // Trouver l'activité "Champion Akhachab Amghar"
    console.log('\n🔍 Recherche de l\'activité "Champion Akhachab Amghar"...')
    const [activities] = await connection.execute(
      'SELECT id, title, videos FROM Activity WHERE title LIKE ?',
      ['%Champion Akhachab Amghar%']
    )
    
    if (activities.length === 0) {
      console.log('❌ Aucune activité trouvée avec ce titre')
      return
    }
    
    const targetActivity = activities[0]
    console.log(`📊 Activité trouvée:`)
    console.log(`   - ID: ${targetActivity.id}`)
    console.log(`   - Titre: ${targetActivity.title}`)
    console.log(`   - Vidéos: ${targetActivity.videos || 'Aucune'}`)
    
    // Vérifier le contenu des vidéos
    if (targetActivity.videos) {
      try {
        const videos = JSON.parse(targetActivity.videos)
        console.log('\n🔍 Analyse des vidéos:')
        console.log(`   - Nombre de vidéos: ${videos.length}`)
        
        videos.forEach((video, index) => {
          console.log(`   Vidéo ${index + 1}:`)
          console.log(`     - Source: ${video.src}`)
          console.log(`     - Titre: ${video.title}`)
          console.log(`     - Description: ${video.description}`)
        })
        
        // Supprimer les vidéos
        console.log('\n🔄 Suppression des vidéos...')
        const [updateResult] = await connection.execute(
          'UPDATE Activity SET videos = NULL WHERE id = ?',
          [targetActivity.id]
        )
        
        if (updateResult.affectedRows > 0) {
          console.log('✅ Vidéos supprimées avec succès !')
          
          // Vérifier le résultat
          const [updatedActivity] = await connection.execute(
            'SELECT id, title, videos FROM Activity WHERE id = ?',
            [targetActivity.id]
          )
          
          console.log('\n🔍 Vérification du résultat:')
          console.log(`   - ID: ${updatedActivity[0].id}`)
          console.log(`   - Titre: ${updatedActivity[0].title}`)
          console.log(`   - Vidéos: ${updatedActivity[0].videos || 'NULL (supprimées)'}`)
          
        } else {
          console.log('❌ Erreur lors de la mise à jour')
        }
        
      } catch (parseError) {
        console.error('❌ Erreur lors du parsing des vidéos:', parseError)
        console.log('💡 Tentative de nettoyage manuel...')
        
        // Nettoyage manuel si le parsing échoue
        const [updateResult] = await connection.execute(
          'UPDATE Activity SET videos = NULL WHERE id = ?',
          [targetActivity.id]
        )
        
        if (updateResult.affectedRows > 0) {
          console.log('✅ Vidéos supprimées (nettoyage manuel)')
        }
      }
    } else {
      console.log('✅ Aucune vidéo à nettoyer')
    }
    
    console.log('\n🎉 Nettoyage terminé avec succès !')
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage :', error)
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
      console.log('\n🔌 Connexion fermée.')
    }
  }
}

// Exécuter le nettoyage si le script est appelé directement
if (require.main === module) {
  removeVideosFromChampionActivity()
}

module.exports = removeVideosFromChampionActivity
