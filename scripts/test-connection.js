const { testConnection, closeConnection } = require('../config/database')

async function main() {
  console.log('🔍 Test de connexion à la base de données...')
  
  try {
    const isConnected = await testConnection()
    
    if (isConnected) {
      console.log('🎉 Connexion réussie ! La base de données est accessible.')
      console.log('\n📋 Prochaines étapes :')
      console.log('1. Créer la base de données MySQL : association_el_bsf')
      console.log('2. Exécuter : npm run db:migrate')
      console.log('3. Exécuter : npm run db:seed')
      console.log('4. Démarrer l\'application : npm run dev')
    } else {
      console.log('❌ Échec de la connexion.')
      console.log('\n🔧 Vérifiez :')
      console.log('- MySQL est-il démarré ?')
      console.log('- Les informations de connexion dans .env sont-elles correctes ?')
      console.log('- La base de données association_el_bsf existe-t-elle ?')
    }
  } catch (error) {
    console.error('💥 Erreur lors du test de connexion:', error)
  } finally {
    await closeConnection()
  }
}

main()

