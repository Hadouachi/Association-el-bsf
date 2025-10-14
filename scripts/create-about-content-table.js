const mysql = require('mysql2/promise')

async function createAboutContentTable() {
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
    
    // Créer la table AboutContent
    console.log('\n🔨 Création de la table AboutContent...')
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS AboutContent (
        id VARCHAR(255) NOT NULL PRIMARY KEY,
        type ENUM('ANNOUNCEMENT', 'WORK_PROJECT', 'INFORMATION', 'MILESTONE', 'PARTNERSHIP') NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        images JSON,
        videos JSON,
        \`order\` INT DEFAULT 0,
        isPublished BOOLEAN DEFAULT TRUE,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Table AboutContent créée !')
    
    // Créer les index
    console.log('\n🔨 Création des index...')
    try {
      await connection.execute('CREATE INDEX idx_about_content_type ON AboutContent(type)')
      console.log('✅ Index sur le type créé')
    } catch (e) {
      console.log('ℹ️ Index sur le type déjà existant')
    }
    
    try {
      await connection.execute('CREATE INDEX idx_about_content_order ON AboutContent(`order`)')
      console.log('✅ Index sur l\'ordre créé')
    } catch (e) {
      console.log('ℹ️ Index sur l\'ordre déjà existant')
    }
    
    try {
      await connection.execute('CREATE INDEX idx_about_content_published ON AboutContent(isPublished)')
      console.log('✅ Index sur la publication créé')
    } catch (e) {
      console.log('ℹ️ Index sur la publication déjà existant')
    }
    
    // Vérifier si la table contient déjà des données
    const [existingData] = await connection.execute('SELECT COUNT(*) as count FROM AboutContent')
    
    if (existingData[0].count === 0) {
      // Insérer des exemples de contenu
      console.log('\n📝 Insertion d\'exemples de contenu...')
      await connection.execute(`
        INSERT INTO AboutContent (id, type, title, content, \`order\`, isPublished) VALUES
        ('about-1', 'MILESTONE', 'Fondation de l''association', 'L''association El BSF a été fondée en 2020 avec pour mission de promouvoir le développement social et culturel de la communauté.', 1, TRUE),
        ('about-2', 'WORK_PROJECT', 'Projet éducatif 2023', 'Mise en place d''un programme de soutien scolaire pour 50 enfants de la région.', 2, TRUE),
        ('about-3', 'ANNOUNCEMENT', 'Nouveau partenariat', 'L''association a signé un partenariat avec la municipalité pour le développement des activités culturelles.', 3, TRUE)
      `)
      console.log('✅ Exemples de contenu insérés !')
    } else {
      console.log('ℹ️ La table contient déjà des données')
    }
    
    // Vérifier la structure
    console.log('\n🔍 Structure de la table AboutContent:')
    const [describeResult] = await connection.execute('DESCRIBE AboutContent')
    describeResult.forEach(column => {
      console.log(`   - ${column.Field}: ${column.Type} ${column.Null === 'YES' ? '(nullable)' : '(not null)'}`)
    })
    
    // Vérifier les données
    console.log('\n📋 Contenu de la table AboutContent:')
    const [contentData] = await connection.execute('SELECT * FROM AboutContent ORDER BY `order`')
    contentData.forEach(item => {
      console.log(`   - ${item.type}: ${item.title}`)
    })
    
    console.log('\n🎉 Migration AboutContent terminée avec succès !')
    
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
  createAboutContentTable()
}

module.exports = createAboutContentTable





