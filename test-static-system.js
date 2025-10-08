// Script pour tester le système statique
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE = 'http://localhost:3000/api';

async function testSystem() {
  console.log('🧪 Test du système statique\n');

  try {
    // Test 1: Vérifier le mode local
    console.log('1️⃣ Test: Mode local (base de données)');
    const activitiesResponse = await fetch(`${API_BASE}/activities`);
    
    if (activitiesResponse.ok) {
      const activities = await activitiesResponse.json();
      console.log(`✅ ${activities.length} activités trouvées en mode local`);
      activities.forEach(activity => {
        console.log(`   - ${activity.title} (${activity.status})`);
      });
    } else {
      console.log('❌ Erreur lors de la récupération des activités');
    }

    // Test 2: Vérifier les actualités
    console.log('\n2️⃣ Test: Actualités en mode local');
    const newsResponse = await fetch(`${API_BASE}/news`);
    
    if (newsResponse.ok) {
      const news = await newsResponse.json();
      console.log(`✅ ${news.length} actualités trouvées en mode local`);
      news.forEach(article => {
        console.log(`   - ${article.title} (${article.status})`);
      });
    } else {
      console.log('❌ Erreur lors de la récupération des actualités');
    }

    // Test 3: Vérifier le contenu À propos
    console.log('\n3️⃣ Test: Contenu À propos en mode local');
    const aboutResponse = await fetch(`${API_BASE}/about`);
    
    if (aboutResponse.ok) {
      const about = await aboutResponse.json();
      console.log(`✅ Contenu À propos trouvé: ${about.title}`);
    } else {
      console.log('❌ Erreur lors de la récupération du contenu À propos');
    }

    console.log('\n🎉 Tests terminés !');
    console.log('\n📝 Vérifiez maintenant dans votre navigateur:');
    console.log('   - http://localhost:3000/fr/activities');
    console.log('   - http://localhost:3000/fr/news');
    console.log('   - http://localhost:3000/fr/about');

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
  }
}

// Attendre que le serveur soit prêt
setTimeout(() => {
  testSystem();
}, 3000);
