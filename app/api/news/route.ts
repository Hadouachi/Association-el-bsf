import { NextRequest, NextResponse } from 'next/server'
import { getConnection } from '@/config/database'
import { getNews, isLocal } from '../../../lib/dataManager'

// GET - Récupérer toutes les actualités
export async function GET(request: NextRequest) {
  try {
    // En production, utiliser les données statiques
    if (!isLocal || process.env.VERCEL === 'true') {
      console.log('📰 Récupération des actualités (mode production - données statiques)')
      const news = await getNews()
      if (news) {
        console.log('✅ Actualités statiques chargées:', news.length)
        return NextResponse.json(news)
      }
    }

    // En local, utiliser la base de données
    console.log('📰 Récupération des actualités')
    const connection = await getConnection()
    
    const [rows] = await connection.execute(
      'SELECT * FROM News WHERE status = "published" ORDER BY publishedAt DESC'
    )
    
    console.log('✅ Actualités récupérées:', (rows as any[]).length)
    return NextResponse.json(rows)
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des actualités:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des actualités',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle actualité
export async function POST(request: NextRequest) {
  try {
    console.log('📝 Création d\'une nouvelle actualité')
    const body = await request.json()
    console.log('📝 Données reçues:', {
      title: body.title,
      author: body.author,
      category: body.category,
      status: body.status
    })
    
    const connection = await getConnection()
    
    // Insérer la nouvelle actualité
    const [result] = await connection.execute(
      `INSERT INTO News (title, excerpt, content, author, category, image, status, publishedAt) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.title || '',
        body.excerpt || '',
        body.content || '',
        body.author || '',
        body.category || 'Général',
        body.image || '',
        body.status || 'draft',
        body.status === 'published' ? new Date() : null
      ]
    )
    
    const insertId = (result as any).insertId
    console.log('✅ Actualité créée avec l\'ID:', insertId)
    
    // Récupérer l'actualité créée
    const [newRows] = await connection.execute(
      'SELECT * FROM News WHERE id = ?',
      [insertId]
    )
    
    const newNews = (newRows as any[])[0]
    return NextResponse.json(newNews)
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'actualité:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la création de l\'actualité',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}
