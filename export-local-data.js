// Script pour exporter les données locales vers la production
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Charger le fichier .env.local
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL non définie dans .env.local');
  process.exit(1);
}

console.log('📤 Export des données locales...');

async function exportData() {
  let connection;
  
  try {
    // Se connecter à la base de données locale
    connection = await mysql.createConnection(DATABASE_URL);
    console.log('✅ Connexion à la base de données locale réussie');

    // Exporter les activités
    console.log('📋 Export des activités...');
    const [activities] = await connection.execute('SELECT * FROM Activity ORDER BY createdAt DESC');
    console.log(`   - ${activities.length} activités exportées`);

    // Exporter les actualités
    console.log('📰 Export des actualités...');
    const [news] = await connection.execute('SELECT * FROM News ORDER BY createdAt DESC');
    console.log(`   - ${news.length} actualités exportées`);

    // Exporter le contenu À propos
    console.log('ℹ️ Export du contenu À propos...');
    const [about] = await connection.execute('SELECT * FROM AboutContent ORDER BY createdAt DESC');
    console.log(`   - ${about.length} contenus À propos exportés`);

    // Créer le fichier d'export
    const exportData = {
      timestamp: new Date().toISOString(),
      activities: activities,
      news: news,
      about: about
    };

    const exportPath = path.join(__dirname, 'data-export.json');
    fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));
    console.log(`✅ Données exportées vers: ${exportPath}`);

    // Créer un script SQL pour la production
    console.log('📝 Génération du script SQL...');
    let sqlScript = `-- Script de synchronisation des données
-- Généré le: ${new Date().toISOString()}

-- Nettoyer les tables existantes (optionnel)
-- DELETE FROM AboutContent;
-- DELETE FROM News;
-- DELETE FROM Activity;

`;

    // Ajouter les activités
    if (activities.length > 0) {
      sqlScript += `-- Insertion des activités\n`;
      activities.forEach(activity => {
        const values = [
          `'${activity.id}'`,
          `'${activity.title.replace(/'/g, "\\'")}'`,
          `'${(activity.description || '').replace(/'/g, "\\'")}'`,
          `'${(activity.longDescription || '').replace(/'/g, "\\'")}'`,
          `'${activity.date || ''}'`,
          `'${activity.time || ''}'`,
          `'${(activity.location || '').replace(/'/g, "\\'")}'`,
          activity.participants || 0,
          `'${activity.status}'`,
          `'${activity.coverImage || ''}'`,
          `'${JSON.stringify(activity.images || [])}'`,
          `'${JSON.stringify(activity.videos || [])}'`,
          `'${JSON.stringify(activity.contentBlocks || [])}'`,
          `'${activity.createdAt}'`,
          `'${activity.updatedAt}'`
        ];
        
        sqlScript += `INSERT INTO Activity (id, title, description, longDescription, date, time, location, participants, status, coverImage, images, videos, contentBlocks, createdAt, updatedAt) VALUES (${values.join(', ')});\n`;
      });
    }

    // Ajouter les actualités
    if (news.length > 0) {
      sqlScript += `\n-- Insertion des actualités\n`;
      news.forEach(article => {
        const values = [
          `'${article.id}'`,
          `'${article.title.replace(/'/g, "\\'")}'`,
          `'${(article.content || '').replace(/'/g, "\\'")}'`,
          `'${(article.excerpt || '').replace(/'/g, "\\'")}'`,
          `'${(article.author || '').replace(/'/g, "\\'")}'`,
          `'${(article.category || '').replace(/'/g, "\\'")}'`,
          `'${article.image || ''}'`,
          `'${article.status}'`,
          article.publishedAt ? `'${article.publishedAt}'` : 'NULL',
          `'${article.createdAt}'`,
          `'${article.updatedAt}'`
        ];
        
        sqlScript += `INSERT INTO News (id, title, content, excerpt, author, category, image, status, publishedAt, createdAt, updatedAt) VALUES (${values.join(', ')});\n`;
      });
    }

    // Ajouter le contenu À propos
    if (about.length > 0) {
      sqlScript += `\n-- Insertion du contenu À propos\n`;
      about.forEach(content => {
        const values = [
          `'${content.id}'`,
          `'${content.title.replace(/'/g, "\\'")}'`,
          `'${(content.subtitle || '').replace(/'/g, "\\'")}'`,
          `'${(content.description || '').replace(/'/g, "\\'")}'`,
          `'${content.coverImage || ''}'`,
          `'${content.status}'`,
          `'${content.createdAt}'`,
          `'${content.updatedAt}'`
        ];
        
        sqlScript += `INSERT INTO AboutContent (id, title, subtitle, description, coverImage, status, createdAt, updatedAt) VALUES (${values.join(', ')});\n`;
      });
    }

    const sqlPath = path.join(__dirname, 'data-sync.sql');
    fs.writeFileSync(sqlPath, sqlScript);
    console.log(`✅ Script SQL généré: ${sqlPath}`);

    console.log('\n🎉 Export terminé avec succès !');
    console.log('\n📝 Fichiers générés:');
    console.log(`   - ${exportPath}`);
    console.log(`   - ${sqlPath}`);
    console.log('\n📋 Prochaines étapes:');
    console.log('   1. Vérifiez les fichiers générés');
    console.log('   2. Lancez le déploiement: .\\deploy-with-sync.ps1');
    console.log('   3. Les données seront synchronisées automatiquement');

  } catch (error) {
    console.error('❌ Erreur lors de l\'export:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Connexion fermée');
    }
  }
}

exportData();
