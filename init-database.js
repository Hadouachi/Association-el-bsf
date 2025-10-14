// Script d'initialisation de base de données pour la production
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Configuration de base de données pour la production
const getDbConfig = () => {
  // En production Vercel, utiliser les variables d'environnement
  if (process.env.VERCEL === 'true') {
    return {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'association_el_bsf',
      port: parseInt(process.env.DB_PORT) || 3306
    };
  }
  
  // En local, utiliser la configuration locale
  return {
    host: 'localhost',
    user: 'root',
    password: 'Hadouachi20@',
    database: 'association_el_bsf',
    port: 3306
  };
};

async function initDatabase() {
  let connection;
  
  try {
    console.log('🔄 Initialisation de la base de données...');
    
    // En production Vercel, ne pas essayer de se connecter à MySQL
    if (process.env.VERCEL === 'true') {
      console.log('✅ Mode production Vercel - Pas de connexion MySQL nécessaire');
      console.log('✅ Les données statiques seront utilisées');
      return;
    }
    
    // En local, essayer de se connecter
    const dbConfig = getDbConfig();
    console.log('🔗 Tentative de connexion à la base de données locale...');
    
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connexion à la base de données établie');
    
    // Vérifier que les tables existent
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`✅ ${tables.length} tables trouvées`);
    
  } catch (error) {
    console.log('⚠️ Impossible de se connecter à la base de données:', error.message);
    console.log('✅ Mode fallback activé - Les données statiques seront utilisées');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Exécuter seulement si ce script est appelé directement
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase };
