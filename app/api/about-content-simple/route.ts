import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

// Configuration de la base de données
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Hadouachi20@',
  database: 'association_el_bsf',
  port: 3306
}

// GET - Récupérer tout le contenu À propos
export async function GET() {
  let connection
  
  try {
    console.log('🔌 Tentative de connexion...')
    connection = await mysql.createConnection(dbConfig)
    console.log('✅ Connexion réussie')
    
    console.log('🔍 Exécution de la requête...')
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM aboutcontent')
    console.log('✅ Requête exécutée, résultat:', rows)
    
    return NextResponse.json({ 
      message: 'API simplifiée fonctionne !',
      count: (rows as any)[0]?.count || 0,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Erreur:', error)
    return NextResponse.json(
      {
        error: 'Erreur dans l\'API simplifiée',
        details: error instanceof Error ? error.message : 'Erreur inconnue',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  } finally {
    if (connection) {
      await connection.end()
      console.log('🔌 Connexion fermée')
    }
  }
}


