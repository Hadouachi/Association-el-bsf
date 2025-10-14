const mysql = require('mysql2/promise')

async function checkActivityStructure() {
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
    
    // Vérifier la structure de la table Activity
    console.log('\n🔍 Structure de la table Activity:')
    const [describeResult] = await connection.execute('DESCRIBE Activity')
    describeResult.forEach(column => {
      console.log(`   - ${column.Field}: ${column.Type} ${column.Null === 'YES' ? '(nullable)' : '(not null)'}`)
    })
    
    // Vérifier l'activité "Champion Akhachab Amghar"
    console.log('\n🔍 Recherche de l\'activité "Champion Akhachab Amghar"...')
    const [activities] = await connection.execute(
      'SELECT * FROM Activity WHERE title LIKE ?',
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
    
    // Afficher toutes les colonnes de cette activité
    console.log('\n📋 Toutes les colonnes de cette activité:')
    Object.keys(targetActivity).forEach(key => {
      const value = targetActivity[key]
      if (value && typeof value === 'string' && value.length > 100) {
        console.log(`   - ${key}: ${value.substring(0, 100)}... (longueur: ${value.length})`)
      } else {
        console.log(`   - ${key}: ${value}`)
      }
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification :', error)
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
      console.log('\n🔌 Connexion fermée.')
    }
  }
}

// Exécuter la vérification si le script est appelé directement
if (require.main === module) {
  checkActivityStructure()
}

module.exports = checkActivityStructure





