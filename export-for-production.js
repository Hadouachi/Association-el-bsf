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
    console.log('🔄 Tentative de connexion à la base de données locale...');
    
    // En production Vercel, utiliser les données de fallback
    if (process.env.VERCEL === 'true') {
      console.log('✅ Mode production Vercel - Utilisation des données de fallback');
      await exportFallbackData();
      return;
    }
    
    // En local, essayer de se connecter à la base de données
    try {
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

    } catch (dbError) {
      console.log('⚠️ Impossible de se connecter à la base de données locale');
      console.log('✅ Utilisation des données de fallback');
      await exportFallbackData();
    }

  } catch (error) {
    console.error('❌ Erreur lors de l\'export:', error);
    console.log('✅ Utilisation des données de fallback');
    await exportFallbackData();
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Fonction pour exporter les données de fallback
async function exportFallbackData() {
  console.log('📦 Export des données de fallback...');
  
  // Importer les données locales
  const { getAllLocalActivities } = require('./data/localActivities');
  
  const fallbackData = {
    activities: getAllLocalActivities(),
    news: [
      {
        id: "1",
        title: "Ouverture de nouveaux cours de Tajweed",
        excerpt: "Nous sommes ravis d'annoncer l'ouverture de nouveaux cours de Tajweed pour tous les niveaux.",
        content: "Ces cours sont conçus pour améliorer votre récitation du Coran avec les règles appropriées.",
        author: "Association El BSF",
        category: "Éducation",
        image: "/images/news/tajweed.jpg",
        status: "published",
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    about: [
      {
        id: "1",
        title: "À propos de l'Association El BSF",
        subtitle: "Notre mission",
        description: "L'Association El BSF œuvre pour l'éducation et le développement communautaire.",
        coverImage: "/images/about/association.jpg",
        status: "published",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    exportedAt: new Date().toISOString(),
    version: '1.0.0',
    source: 'fallback'
  };

  // Sauvegarder dans data-export.json
  const exportPath = path.join(__dirname, 'data-export.json');
  fs.writeFileSync(exportPath, JSON.stringify(fallbackData, null, 2));
  
  console.log('✅ Données de fallback exportées vers data-export.json');
  console.log(`📁 Fichier: ${exportPath}`);
  
  // Afficher un résumé
  console.log('\n📊 Résumé de l\'export (fallback):');
  console.log(`   - Activités: ${fallbackData.activities.length}`);
  console.log(`   - Actualités: ${fallbackData.news.length}`);
  console.log(`   - Contenu À propos: ${fallbackData.about.length}`);
  
  console.log('\n🚀 Prêt pour le déploiement !');
  console.log('   Les données de fallback seront utilisées en production.');
}

exportData();
