import { NextRequest, NextResponse } from 'next/server'
import { getConnection } from '@/config/database'

// GET - Récupérer une activité spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🔍 Récupération de l\'activité:', params.id)
    const connection = await getConnection()
    
    const [rows] = await connection.execute(
      'SELECT * FROM Activity WHERE id = ?',
      [params.id]
    )
    
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'Activité non trouvée' }, { status: 404 })
    }
    
    const activity = rows[0] as any
    console.log('✅ Activité trouvée:', activity.title)
    
    // Parser les champs JSON si nécessaire
    if (activity.contentBlocks && typeof activity.contentBlocks === 'string') {
      try {
        activity.contentBlocks = JSON.parse(activity.contentBlocks)
      } catch (e) {
        console.error('❌ Erreur parsing contentBlocks:', e)
        activity.contentBlocks = []
      }
    }
    
    if (activity.images && typeof activity.images === 'string') {
      try {
        activity.images = JSON.parse(activity.images)
      } catch (e) {
        console.error('❌ Erreur parsing images:', e)
        activity.images = []
      }
    }
    
    if (activity.videos && typeof activity.videos === 'string') {
      try {
        activity.videos = JSON.parse(activity.videos)
      } catch (e) {
        console.error('❌ Erreur parsing videos:', e)
        activity.videos = []
      }
    }
    
    return NextResponse.json(activity)
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de l\'activité:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de l\'activité' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour une activité
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('✏️ Mise à jour de l\'activité:', params.id)
    const body = await request.json()
    console.log('📝 Données reçues:', {
      title: body.title,
      date: body.date,
      time: body.time,
      contentBlocks: body.contentBlocks?.length || 0
    })
    
    const connection = await getConnection()
    
    // Vérifier que l'activité existe
    const [existingRows] = await connection.execute(
      'SELECT id FROM Activity WHERE id = ?',
      [params.id]
    )
    
    if (!Array.isArray(existingRows) || existingRows.length === 0) {
      return NextResponse.json({ error: 'Activité non trouvée' }, { status: 404 })
    }
    
    // Préparer les données pour la mise à jour
    const updateData = {
      title: body.title || '',
      description: body.description || '',
      longDescription: body.longDescription || '',
      date: body.date || '',
      time: body.time || '',
      location: body.location || '',
      participants: body.participants || '',
      status: body.status || 'upcoming',
      coverImage: body.coverImage || '',
      images: JSON.stringify(body.images || []),
      videos: JSON.stringify(body.videos || []),
      contentBlocks: JSON.stringify(body.contentBlocks || []),
      updatedAt: new Date()
    }
    
    // Mettre à jour l'activité
    await connection.execute(
      `UPDATE Activity SET 
        title = ?, 
        description = ?, 
        longDescription = ?, 
        date = ?, 
        time = ?, 
        location = ?, 
        participants = ?, 
        status = ?, 
        coverImage = ?, 
        images = ?, 
        videos = ?, 
        contentBlocks = ?, 
        updatedAt = ?
      WHERE id = ?`,
      [
        updateData.title,
        updateData.description,
        updateData.longDescription,
        updateData.date,
        updateData.time,
        updateData.location,
        updateData.participants,
        updateData.status,
        updateData.coverImage,
        updateData.images,
        updateData.videos,
        updateData.contentBlocks,
        updateData.updatedAt,
        params.id
      ]
    )
    
    console.log('✅ Activité mise à jour avec succès')
    
    // Récupérer l'activité mise à jour
    const [updatedRows] = await connection.execute(
      'SELECT * FROM Activity WHERE id = ?',
      [params.id]
    )
    
    const updatedActivity = (updatedRows as any[])[0] as any
    
    // Parser les champs JSON
    if (updatedActivity.contentBlocks && typeof updatedActivity.contentBlocks === 'string') {
      try {
        updatedActivity.contentBlocks = JSON.parse(updatedActivity.contentBlocks)
      } catch (e) {
        updatedActivity.contentBlocks = []
      }
    }
    
    if (updatedActivity.images && typeof updatedActivity.images === 'string') {
      try {
        updatedActivity.images = JSON.parse(updatedActivity.images)
      } catch (e) {
        updatedActivity.images = []
      }
    }
    
    if (updatedActivity.videos && typeof updatedActivity.videos === 'string') {
      try {
        updatedActivity.videos = JSON.parse(updatedActivity.videos)
      } catch (e) {
        updatedActivity.videos = []
      }
    }
    
    return NextResponse.json(updatedActivity)
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour de l\'activité:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la mise à jour de l\'activité',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une activité
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🗑️ Suppression de l\'activité:', params.id)
    const connection = await getConnection()
    
    // Vérifier que l'activité existe
    const [existingRows] = await connection.execute(
      'SELECT id FROM Activity WHERE id = ?',
      [params.id]
    )
    
    if (!Array.isArray(existingRows) || existingRows.length === 0) {
      return NextResponse.json({ error: 'Activité non trouvée' }, { status: 404 })
    }
    
    // Supprimer l'activité
    await connection.execute(
      'DELETE FROM Activity WHERE id = ?',
      [params.id]
    )
    
    console.log('✅ Activité supprimée avec succès')
    return NextResponse.json({ message: 'Activité supprimée avec succès' })
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de l\'activité:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'activité' },
      { status: 500 }
    )
  }
}
