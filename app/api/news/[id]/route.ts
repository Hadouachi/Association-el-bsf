import { NextRequest, NextResponse } from 'next/server'
import { getConnection } from '@/config/database'
import { isLocal, FALLBACK_DATA } from '../../../../lib/dataManager'
import fs from 'fs'
import path from 'path'

// GET - Récupérer une actualité par ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('📰 Récupération de l\'actualité:', params.id)
    
    // En production, utiliser les données statiques
    if (!isLocal || process.env.VERCEL === 'true') {
      console.log('📰 Récupération de l\'actualité (mode production - données statiques)')
      
      // Charger directement le fichier data-export.json
      try {
        const dataPath = path.join(process.cwd(), 'data-export.json')
        if (fs.existsSync(dataPath)) {
          const rawData = fs.readFileSync(dataPath, 'utf8')
          const exportedData = JSON.parse(rawData)
          
          if (exportedData.news && exportedData.news.length > 0) {
            const news = exportedData.news.find((article: any) => article.id === params.id)
            if (news) {
              console.log('✅ Actualité statique trouvée:', news.title)
              return NextResponse.json(news)
            }
          }
        }
      } catch (error) {
        console.error('❌ Erreur lors du chargement de data-export.json:', error)
      }
      
      // Fallback vers les données de fallback
      const fallbackNews = FALLBACK_DATA.news.find((article: any) => article.id === params.id)
      if (fallbackNews) {
        console.log('✅ Actualité trouvée dans les données de fallback:', fallbackNews.title)
        return NextResponse.json(fallbackNews)
      }
      
      console.log('❌ Actualité non trouvée dans les données statiques')
      return NextResponse.json({ error: 'Actualité non trouvée' }, { status: 404 })
    }

    // En local, utiliser la base de données
    const connection = await getConnection()
    
    const [rows] = await connection.execute(
      'SELECT * FROM News WHERE id = ?',
      [params.id]
    )
    
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'Actualité non trouvée' }, { status: 404 })
    }
    
    const news = (rows as any[])[0]
    console.log('✅ Actualité récupérée:', news.title)
    return NextResponse.json(news)
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de l\'actualité:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération de l\'actualité',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour une actualité
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('✏️ Mise à jour de l\'actualité:', params.id)
    const body = await request.json()
    console.log('📝 Données reçues:', {
      title: body.title,
      author: body.author,
      category: body.category,
      status: body.status
    })
    
    const connection = await getConnection()
    
    // Vérifier que l'actualité existe
    const [existingRows] = await connection.execute(
      'SELECT id FROM News WHERE id = ?',
      [params.id]
    )
    
    if (!Array.isArray(existingRows) || existingRows.length === 0) {
      return NextResponse.json({ error: 'Actualité non trouvée' }, { status: 404 })
    }
    
    // Mettre à jour l'actualité
    await connection.execute(
      `UPDATE News SET 
        title = ?, 
        excerpt = ?, 
        content = ?, 
        author = ?, 
        category = ?, 
        image = ?, 
        status = ?, 
        publishedAt = ?,
        updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        body.title || '',
        body.excerpt || '',
        body.content || '',
        body.author || '',
        body.category || 'Général',
        body.image || '',
        body.status || 'draft',
        body.status === 'published' ? new Date() : null,
        params.id
      ]
    )
    
    console.log('✅ Actualité mise à jour avec succès')
    
    // Récupérer l'actualité mise à jour
    const [updatedRows] = await connection.execute(
      'SELECT * FROM News WHERE id = ?',
      [params.id]
    )
    
    const updatedNews = (updatedRows as any[])[0]
    return NextResponse.json(updatedNews)
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour de l\'actualité:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la mise à jour de l\'actualité',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une actualité
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🗑️ Suppression de l\'actualité:', params.id)
    const connection = await getConnection()
    
    // Vérifier que l'actualité existe
    const [existingRows] = await connection.execute(
      'SELECT id FROM News WHERE id = ?',
      [params.id]
    )
    
    if (!Array.isArray(existingRows) || existingRows.length === 0) {
      return NextResponse.json({ error: 'Actualité non trouvée' }, { status: 404 })
    }
    
    // Supprimer l'actualité
    await connection.execute(
      'DELETE FROM News WHERE id = ?',
      [params.id]
    )
    
    console.log('✅ Actualité supprimée avec succès')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de l\'actualité:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la suppression de l\'actualité',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}
