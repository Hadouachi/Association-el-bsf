import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'
import { getAbout, isLocal } from '../../../lib/dataManager'

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Hadouachi20@',
  database: 'association_el_bsf',
  port: 3306
}

// GET - Récupérer le contenu de la page À propos
export async function GET(request: NextRequest) {
  let connection
  
  try {
    // En production, utiliser les données statiques
    if (!isLocal) {
      console.log('ℹ️ Récupération du contenu À propos (mode production - données statiques)')
      const about = await getAbout()
      if (about && about.length > 0) {
        console.log('✅ Contenu À propos statique chargé')
        return NextResponse.json(about[0])
      }
    }

    // En local, utiliser la base de données
    connection = await mysql.createConnection(dbConfig)
    
    const [rows] = await connection.execute(`
      SELECT * FROM AboutContent 
      WHERE status = 'published'
      ORDER BY createdAt DESC
      LIMIT 1
    `) as [any[], any]
    
    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Aucun contenu À propos publié trouvé' },
        { status: 404 }
      )
    }
    
    const aboutContent = {
      ...rows[0],
      createdAt: new Date(rows[0].createdAt),
      updatedAt: new Date(rows[0].updatedAt)
    }
    
    return NextResponse.json(aboutContent)
    
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu À propos:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du contenu' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}

// POST - Créer un nouveau contenu À propos
export async function POST(request: NextRequest) {
  let connection
  
  try {
    const body = await request.json()
    const { title, subtitle, description, coverImage, status = 'draft' } = body
    
    if (!title) {
      return NextResponse.json(
        { error: 'Le titre est requis' },
        { status: 400 }
      )
    }
    
    connection = await mysql.createConnection(dbConfig)
    
    const [result] = await connection.execute(`
      INSERT INTO AboutContent (id, title, subtitle, description, coverImage, status)
      VALUES (UUID(), ?, ?, ?, ?, ?)
    `, [title, subtitle, description, coverImage, status]) as [any, any]
    
    const newAboutContent = {
      id: result.insertId,
      title,
      subtitle,
      description,
      coverImage,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    return NextResponse.json(newAboutContent, { status: 201 })
    
  } catch (error) {
    console.error('Erreur lors de la création du contenu À propos:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du contenu' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}
