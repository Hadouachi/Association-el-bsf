const mysql = require('mysql2/promise');

async function initDatabase() {
  console.log('🔍 DATABASE_URL:', process.env.DATABASE_URL ? 'Définie' : 'Non définie');
  
  if (!process.env.DATABASE_URL) {
    console.log('❌ DATABASE_URL non définie, arrêt du script');
    return;
  }
  
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  console.log('🔌 Connexion à la base de données...');
  
  try {
    // Créer la table Activity
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Activity (
        id VARCHAR(191) NOT NULL PRIMARY KEY,
        title VARCHAR(191) NOT NULL,
        description TEXT,
        coverImage VARCHAR(191),
        images TEXT,
        videos TEXT,
        contentBlocks TEXT,
        style TEXT,
        status VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Table Activity créée');

    // Créer la table News
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS News (
        id VARCHAR(191) NOT NULL PRIMARY KEY,
        title VARCHAR(191) NOT NULL,
        content TEXT NOT NULL,
        excerpt VARCHAR(191),
        image VARCHAR(191),
        category VARCHAR(191) NOT NULL DEFAULT 'GENERAL',
        author VARCHAR(191),
        status VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
        publishedAt DATETIME(3),
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Table News créée');

    // Créer la table AboutContent
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS AboutContent (
        id VARCHAR(191) NOT NULL PRIMARY KEY,
        title VARCHAR(191) NOT NULL,
        subtitle VARCHAR(191),
        description TEXT,
        coverImage VARCHAR(191),
        status VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Table AboutContent créée');

    // Créer la table ContentBlocks
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ContentBlocks (
        id VARCHAR(191) NOT NULL PRIMARY KEY,
        type VARCHAR(191) NOT NULL,
        content TEXT,
        settings TEXT,
        videos TEXT,
        \`order\` INT NOT NULL DEFAULT 0,
        aboutContentId VARCHAR(191) NOT NULL,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Table ContentBlocks créée');

    console.log('🎉 Base de données initialisée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await connection.end();
  }
}

initDatabase();
