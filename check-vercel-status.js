// Script pour vérifier le statut de déploiement Vercel
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function checkVercelStatus() {
  console.log('🔍 Vérification du statut Vercel...\n');

  try {
    // Vérifier si le site est accessible
    const response = await fetch('https://association-el-bsf.vercel.app', {
      method: 'HEAD',
      timeout: 10000
    });

    if (response.ok) {
      console.log('✅ Site Vercel accessible !');
      console.log(`📊 Status: ${response.status}`);
      console.log(`🌐 URL: https://association-el-bsf.vercel.app`);
      
      // Tester les APIs
      console.log('\n🧪 Test des APIs...');
      
      const apis = [
        'https://association-el-bsf.vercel.app/api/activities',
        'https://association-el-bsf.vercel.app/api/news',
        'https://association-el-bsf.vercel.app/api/about'
      ];

      for (const api of apis) {
        try {
          const apiResponse = await fetch(api);
          if (apiResponse.ok) {
            const data = await apiResponse.json();
            console.log(`✅ ${api} - ${Array.isArray(data) ? data.length : 1} éléments`);
          } else {
            console.log(`❌ ${api} - Status: ${apiResponse.status}`);
          }
        } catch (error) {
          console.log(`❌ ${api} - Erreur: ${error.message}`);
        }
      }

    } else {
      console.log(`❌ Site non accessible - Status: ${response.status}`);
    }

  } catch (error) {
    console.log('❌ Erreur lors de la vérification:', error.message);
    console.log('\n💡 Solutions possibles:');
    console.log('   1. Vercel est encore en train de déployer');
    console.log('   2. Vérifiez votre dashboard Vercel');
    console.log('   3. Attendez quelques minutes et réessayez');
  }
}

checkVercelStatus();
