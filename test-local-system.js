// Script pour tester le système local
const { getAllLocalActivities, getLocalActivityById } = require('./data/localActivities.ts');

console.log('🧪 Test du système local des activités\n');

try {
  // Test 1: Récupérer toutes les activités
  console.log('1️⃣ Test: Récupération de toutes les activités');
  const allActivities = getAllLocalActivities();
  console.log(`✅ ${allActivities.length} activités trouvées`);
  
  allActivities.forEach(activity => {
    console.log(`   - ${activity.title} (${activity.status})`);
  });
  
  // Test 2: Récupérer une activité par ID
  console.log('\n2️⃣ Test: Récupération d\'une activité par ID');
  const activity = getLocalActivityById('1');
  if (activity) {
    console.log(`✅ Activité trouvée: ${activity.title}`);
    console.log(`   - Description: ${activity.description}`);
    console.log(`   - Images: ${activity.images.length}`);
    console.log(`   - Vidéos: ${activity.videos.length}`);
    console.log(`   - Blocs de contenu: ${activity.contentBlocks.length}`);
  } else {
    console.log('❌ Activité non trouvée');
  }
  
  // Test 3: Vérifier les médias
  console.log('\n3️⃣ Test: Vérification des médias');
  const fs = require('fs');
  const path = require('path');
  
  allActivities.forEach(activity => {
    console.log(`\n📋 ${activity.title}:`);
    
    // Vérifier l'image de couverture
    const coverPath = path.join('public', activity.coverImage);
    if (fs.existsSync(coverPath)) {
      console.log(`   ✅ Image de couverture: ${activity.coverImage}`);
    } else {
      console.log(`   ❌ Image de couverture manquante: ${activity.coverImage}`);
    }
    
    // Vérifier les images
    activity.images.forEach((image, index) => {
      const imagePath = path.join('public', image);
      if (fs.existsSync(imagePath)) {
        console.log(`   ✅ Image ${index + 1}: ${image}`);
      } else {
        console.log(`   ❌ Image ${index + 1} manquante: ${image}`);
      }
    });
    
    // Vérifier les vidéos
    activity.videos.forEach((video, index) => {
      const videoPath = path.join('public', video.src);
      if (fs.existsSync(videoPath)) {
        console.log(`   ✅ Vidéo ${index + 1}: ${video.src}`);
      } else {
        console.log(`   ❌ Vidéo ${index + 1} manquante: ${video.src}`);
      }
    });
  });
  
  console.log('\n🎉 Tests terminés !');
  
} catch (error) {
  console.error('❌ Erreur lors des tests:', error);
}
