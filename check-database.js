const mysql = require('mysql2/promise');

async function checkDatabase() {
  console.log('🔍 Vérification de la base de données...');
  
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('✅ Connexion à la base de données réussie');
    
    // Vérifier les tables existantes
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📋 Tables existantes:', tables.map(t => Object.values(t)[0]));
    
    // Vérifier la table Activity
    try {
      const [rows] = await connection.execute('SELECT COUNT(*) as count FROM Activity');
      console.log('📊 Nombre d\'activités:', rows[0].count);
    } catch (error) {
      console.log('❌ Table Activity n\'existe pas ou erreur:', error.message);
    }
    
    await connection.end();
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
  }
}

checkDatabase();
