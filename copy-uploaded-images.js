// Script pour copier les images uploadées vers le dossier public/images
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'public/uploads');
const targetDir = path.join(__dirname, 'public/images');

// Créer le dossier de destination s'il n'existe pas
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Fonction pour copier récursivement
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️ Dossier source non trouvé: ${src}`);
    return;
  }

  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const files = fs.readdirSync(src);
    files.forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copié: ${src} → ${dest}`);
  }
}

// Fonction pour mettre à jour les chemins dans data-export.json
function updateImagePaths() {
  const dataExportPath = path.join(__dirname, 'data-export.json');
  
  if (!fs.existsSync(dataExportPath)) {
    console.log('⚠️ Fichier data-export.json non trouvé');
    return;
  }

  const data = JSON.parse(fs.readFileSync(dataExportPath, 'utf8'));
  let updated = false;

  // Mettre à jour les chemins des activités
  if (data.activities) {
    data.activities.forEach(activity => {
      // Image de couverture
      if (activity.coverImage && activity.coverImage.startsWith('/uploads/')) {
        const newPath = activity.coverImage.replace('/uploads/', '/images/');
        activity.coverImage = newPath;
        updated = true;
      }

      // Images de la galerie
      if (activity.images && Array.isArray(activity.images)) {
        activity.images = activity.images.map(img => {
          if (img.startsWith('/uploads/')) {
            updated = true;
            return img.replace('/uploads/', '/images/');
          }
          return img;
        });
      }

      // Content blocks avec images
      if (activity.contentBlocks && Array.isArray(activity.contentBlocks)) {
        activity.contentBlocks.forEach(block => {
          if (block.images && Array.isArray(block.images)) {
            block.images = block.images.map(img => {
              if (img.startsWith('/uploads/')) {
                updated = true;
                return img.replace('/uploads/', '/images/');
              }
              return img;
            });
          }
        });
      }
    });
  }

  // Mettre à jour les chemins des actualités
  if (data.news) {
    data.news.forEach(news => {
      if (news.image && news.image.startsWith('/uploads/')) {
        news.image = news.image.replace('/uploads/', '/images/');
        updated = true;
      }
    });
  }

  // Mettre à jour les chemins du contenu À propos
  if (data.about) {
    data.about.forEach(about => {
      if (about.coverImage && about.coverImage.startsWith('/uploads/')) {
        about.coverImage = about.coverImage.replace('/uploads/', '/images/');
        updated = true;
      }
    });
  }

  if (updated) {
    fs.writeFileSync(dataExportPath, JSON.stringify(data, null, 2));
    console.log('✅ Chemins d\'images mis à jour dans data-export.json');
  } else {
    console.log('ℹ️ Aucun chemin d\'image à mettre à jour');
  }
}

console.log('🔄 Copie des images uploadées...');

// Copier les images
copyRecursive(sourceDir, targetDir);

console.log('🔄 Mise à jour des chemins d\'images...');

// Mettre à jour les chemins
updateImagePaths();

console.log('✅ Synchronisation des images terminée !');
