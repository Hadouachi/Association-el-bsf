import { PrismaClient } from '@prisma/client'
import mysql from 'mysql2/promise'

// Configuration de la base de données
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME || 'association_el_bsf',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Hadouachi20@',
}

// Fonction pour obtenir une connexion MySQL
export const getConnection = async () => {
  return await mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
  })
}

// Client Prisma avec configuration personnalisée
export const createPrismaClient = () => {
  const client = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || `mysql://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
      }
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
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

