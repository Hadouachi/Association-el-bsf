// Prisma n'est pas utilisé en production - données statiques uniquement
let prisma: any = null

if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== 'true') {
  try {
    const { PrismaClient } = require('@prisma/client')
    const globalForPrisma = globalThis as unknown as {
      prisma: any | undefined
    }
    prisma = globalForPrisma.prisma ?? new PrismaClient()
    globalForPrisma.prisma = prisma
  } catch (error) {
    console.log('⚠️ Prisma non disponible en production')
    prisma = null
  }
}

export { prisma }

