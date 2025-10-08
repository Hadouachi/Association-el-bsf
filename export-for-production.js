// Script pour exporter les données locales pour la production
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Hadouachi20@',
  database: 'association_el_bsf',
  port: 3306
};

async function exportData() {
  let connection;
  
  try {
    console.log('🔄 Connexion à la base de données locale...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connexion établie');

    // Exporter les activités
    console.log('📊 Export des activités...');
    const [activities] = await connection.execute(`
      SELECT 
        id, title, description, longDescription, date, time, location, 
        participants, status, coverImage, images, videos, contentBlocks,
        createdAt, updatedAt
      FROM Activity 
      ORDER BY createdAt DESC
    `);
    
    // Parser les champs JSON
    const parsedActivities = activities.map(activity => ({
      ...activity,
      images: Array.isArray(activity.images) ? activity.images : [],
      videos: Array.isArray(activity.videos) ? activity.videos : [],
      contentBlocks: Array.isArray(activity.contentBlocks) ? activity.contentBlocks : []
    }));
    
    console.log(`✅ ${parsedActivities.length} activités exportées`);

    // Exporter les actualités
    console.log('📰 Export des actualités...');
    const [news] = await connection.execute(`
      SELECT * FROM News 
      WHERE status = 'published'
      ORDER BY publishedAt DESC
    `);
    
    console.log(`✅ ${news.length} actualités exportées`);

    // Exporter le contenu À propos
    console.log('ℹ️ Export du contenu À propos...');
    const [about] = await connection.execute(`
      SELECT * FROM AboutContent 
      WHERE status = 'published'
      ORDER BY createdAt DESC
    `);
    
    console.log(`✅ ${about.length} contenus À propos exportés`);

    // Créer l'objet de données
    const exportData = {
      activities: parsedActivities,
      news: news,
      about: about,
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    };

    // Sauvegarder dans data-export.json
    const exportPath = path.join(__dirname, 'data-export.json');
    fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));
    
    console.log('✅ Données exportées vers data-export.json');
    console.log(`📁 Fichier: ${exportPath}`);
    
    // Afficher un résumé
    console.log('\n📊 Résumé de l\'export:');
    console.log(`   - Activités: ${parsedActivities.length}`);
    console.log(`   - Actualités: ${news.length}`);
    console.log(`   - Contenu À propos: ${about.length}`);
    
    console.log('\n🚀 Prêt pour le déploiement !');
    console.log('   Les données seront automatiquement utilisées en production.');

  } catch (error) {
    console.error('❌ Erreur lors de l\'export:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

exportData();
