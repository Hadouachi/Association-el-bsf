const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'association_el_bsf',
  port: parseInt(process.env.DB_PORT || '3306', 10)
};

async function checkRealData() {
  let connection;
  try {
    console.log('🔍 Vérification des vraies données de la base de données...');
    console.log('🔗 Connexion à la base de données...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connexion établie');

    // Vérifier les activités
    console.log('\n📊 ACTIVITÉS:');
    const [activities] = await connection.execute('SELECT id, title, description, status, createdAt FROM Activity ORDER BY createdAt DESC LIMIT 10');
    console.log(`Nombre d'activités: ${activities.length}`);
    activities.forEach((activity, index) => {
      console.log(`${index + 1}. [${activity.id}] "${activity.title}" - ${activity.status} (${activity.createdAt})`);
    });

    // Vérifier les actualités
    console.log('\n📰 ACTUALITÉS:');
    const [news] = await connection.execute('SELECT id, title, category, publishedAt FROM News ORDER BY publishedAt DESC LIMIT 10');
    console.log(`Nombre d'actualités: ${news.length}`);
    news.forEach((article, index) => {
      console.log(`${index + 1}. [${article.id}] "${article.title}" - ${article.category} (${article.publishedAt})`);
    });

    // Vérifier le contenu À propos
    console.log('\nℹ️ CONTENU À PROPOS:');
    const [about] = await connection.execute('SELECT id, title, type FROM AboutContent ORDER BY createdAt DESC LIMIT 10');
    console.log(`Nombre de contenus À propos: ${about.length}`);
    about.forEach((content, index) => {
      console.log(`${index + 1}. [${content.id}] "${content.title}" - ${content.type}`);
    });

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkRealData();
