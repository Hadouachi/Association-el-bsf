const mysql = require('mysql2/promise');

async function createTable() {
  try {
    console.log('🔗 Connexion à la base de données...');
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Hadouachi20@',
      database: 'association_el_bsf'
    });
    
    console.log('✅ Connexion réussie');
    
    console.log('📋 Création de la table activities...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS activities (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        longDescription TEXT,
        date VARCHAR(50),
        time VARCHAR(50),
        location VARCHAR(255),
        participants VARCHAR(50),
        status VARCHAR(50) DEFAULT 'upcoming',
        coverImage TEXT,
        images JSON,
        videos JSON,
        contentBlocks JSON,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Table activities créée avec succès');
    
    // Vérifier que la table existe
    const [tables] = await connection.execute('SHOW TABLES LIKE "activities"');
    if (tables.length > 0) {
      console.log('✅ Vérification : Table activities existe');
    }
    
    await connection.end();
    console.log('🎉 Terminé !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

createTable();

