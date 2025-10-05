const { PrismaClient } = require('@prisma/client');

async function initDatabaseWithPrisma() {
  console.log('🔍 Initialisation de la base de données avec Prisma...');
  
  if (!process.env.DATABASE_URL) {
    console.log('❌ DATABASE_URL non définie');
    return;
  }
  
  const prisma = new PrismaClient();
  
  try {
    console.log('🔌 Connexion à la base de données...');
    
    // Test de connexion
    await prisma.$connect();
    console.log('✅ Connexion réussie');
    
    // Vérifier si les tables existent
    const activities = await prisma.activity.findMany();
    console.log('📊 Nombre d\'activités:', activities.length);
    
    const news = await prisma.news.findMany();
    console.log('📊 Nombre d\'actualités:', news.length);
    
    console.log('🎉 Base de données initialisée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

initDatabaseWithPrisma();
