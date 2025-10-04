import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

// Configuration de la base de données MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Hadouachi20@',
  database: 'association_el_bsf',
  port: 3306
}

// Fonction pour créer une connexion MySQL
async function getConnection() {
  return await mysql.createConnection(dbConfig)
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const connection = await getConnection()
    
    // Récupérer l'activité avec les content blocks intégrés
    const [activities] = await connection.execute(`
      SELECT 
        id, title, description, longDescription, date, time, location, 
        participants, status, coverImage, images, videos, contentBlocks,
        createdAt, updatedAt
      FROM Activity 
      WHERE id = ?
    `, [params.id])
    
    await connection.end()
    
    if (!activities || (activities as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      )
    }
    
    const activity = (activities as any[])[0]
    
    // Les champs JSON sont déjà parsés par mysql2
    const parsedActivity = {
      ...activity,
      images: Array.isArray(activity.images) ? activity.images : [],
      videos: Array.isArray(activity.videos) ? activity.videos : [],
      contentBlocks: Array.isArray(activity.contentBlocks) ? activity.contentBlocks : []
    }
    
    return NextResponse.json(parsedActivity)
  } catch (error) {
    console.error('Error fetching activity:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activity', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const connection = await getConnection()
    
    // Mettre à jour l'activité avec les content blocks intégrés
    await connection.execute(`
      UPDATE Activity SET 
        title = ?, description = ?, longDescription = ?, date = ?, time = ?, 
        location = ?, participants = ?, status = ?, coverImage = ?, 
        images = ?, videos = ?, contentBlocks = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      body.title,
      body.description || '',
      body.longDescription || '',
      body.date || '',
      body.time || '',
      body.location || '',
      body.participants || '',
      body.status || 'upcoming',
      body.coverImage || '',
      JSON.stringify(body.images || []),
      JSON.stringify(body.videos || []),
      JSON.stringify(body.contentBlocks || []),
      params.id
    ])
    
    await connection.end()
    
    return NextResponse.json({ message: 'Activity updated successfully' })
  } catch (error) {
    console.error('Error updating activity:', error)
    return NextResponse.json(
      { error: 'Failed to update activity' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const connection = await getConnection()
    
    // Supprimer l'activité
    await connection.execute(`
      DELETE FROM Activity WHERE id = ?
    `, [params.id])
    
    await connection.end()
    
    return NextResponse.json({ message: 'Activity deleted successfully' })
  } catch (error) {
    console.error('Error deleting activity:', error)
    return NextResponse.json(
      { error: 'Failed to delete activity' },
      { status: 500 }
    )
  }
}
