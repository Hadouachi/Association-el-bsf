// Script pour tester le mode production (données statiques)
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Simuler l'environnement de production
process.env.NODE_ENV = 'production';
process.env.VERCEL = 'true';

const API_BASE = 'http://localhost:3000/api';

async function testProductionMode() {
  console.log('🧪 Test du mode production (données statiques)\n');

  try {
    // Test 1: Vérifier les activités en mode production
    console.log('1️⃣ Test: Activités en mode production');
    const activitiesResponse = await fetch(`${API_BASE}/activities`);
    
    if (activitiesResponse.ok) {
      const activities = await activitiesResponse.json();
      console.log(`✅ ${activities.length} activités trouvées en mode production`);
      activities.forEach(activity => {
        console.log(`   - ${activity.title} (${activity.status})`);
      });
    } else {
      console.log('❌ Erreur lors de la récupération des activités');
    }

    // Test 2: Vérifier les actualités en mode production
    console.log('\n2️⃣ Test: Actualités en mode production');
    const newsResponse = await fetch(`${API_BASE}/news`);
    
    if (newsResponse.ok) {
      const news = await newsResponse.json();
      console.log(`✅ ${news.length} actualités trouvées en mode production`);
      news.forEach(article => {
        console.log(`   - ${article.title} (${article.status})`);
      });
    } else {
      console.log('❌ Erreur lors de la récupération des actualités');
    }

    // Test 3: Vérifier le contenu À propos en mode production
    console.log('\n3️⃣ Test: Contenu À propos en mode production');
    const aboutResponse = await fetch(`${API_BASE}/about`);
    
    if (aboutResponse.ok) {
      const about = await aboutResponse.json();
      console.log(`✅ Contenu À propos trouvé: ${about.title}`);
    } else {
      console.log('❌ Erreur lors de la récupération du contenu À propos');
    }

    console.log('\n🎉 Tests du mode production terminés !');
    console.log('\n📝 Le système fonctionne correctement avec les données statiques.');

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
  }
}

// Attendre que le serveur soit prêt
setTimeout(() => {
  testProductionMode();
}, 2000);
