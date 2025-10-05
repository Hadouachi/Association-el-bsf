import { PrismaClient } from '@prisma/client'
import mysql from 'mysql2/promise'

// Configuration de la base de données
// IMPORTANT:
// In production (Vercel), we must use DATABASE_URL provided via env vars.
// Never fallback to localhost – that causes ECONNREFUSED on the server.
export const dbConfig = {
  url: process.env.DATABASE_URL,
}

// Fonction pour obtenir une connexion MySQL
export const getConnection = async () => {
  if (!dbConfig.url) {
    throw new Error('DATABASE_URL is not defined. Please set it in your environment.')
  }
  // Prefer passing a single URL string to avoid accidental localhost fallbacks
  return await mysql.createConnection(dbConfig.url)
}

// Client Prisma avec configuration personnalisée
export const createPrismaClient = () => {
  const client = new PrismaClient({
    datasources: {
      db: {
        // Only use DATABASE_URL. If it's missing, Prisma will throw and that's desired.
        url: process.env.DATABASE_URL,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

  return client
}

// Client Prisma par défaut
export const prisma = createPrismaClient()

// Fonction pour tester la connexion
export const testConnection = async () => {
  try {
    await prisma.$connect()
    console.log('✅ Connexion à la base de données réussie')
    return true
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error)
    return false
  }
}

// Fonction pour fermer la connexion
export const closeConnection = async () => {
  await prisma.$disconnect()
  console.log('🔌 Connexion à la base de données fermée')
}

