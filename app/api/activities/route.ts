import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

// Always connect using DATABASE_URL to avoid localhost fallbacks in production
async function getConnection() {
  const { DATABASE_URL } = process.env
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined. Cannot establish DB connection.')
  }
  return await mysql.createConnection(DATABASE_URL)
}

export async function GET() {
  try {
    console.log('🔄 Connexion à la base de données...')
    const connection = await getConnection()
    console.log('✅ Connexion établie')
    
    // Récupérer toutes les activités avec les content blocks intégrés
    console.log('📊 Récupération des activités...')
    const [activities] = await connection.execute(`
      SELECT 
        id, title, description, longDescription, date, time, location, 
        participants, status, coverImage, images, videos, contentBlocks,
        createdAt, updatedAt
      FROM Activity 
      ORDER BY createdAt DESC
    `)
    
    console.log('📋 Activités récupérées:', (activities as any[]).length)
    await connection.end()
    
    // Les champs JSON sont déjà parsés par mysql2
    const parsedActivities = (activities as any[]).map(activity => {
      console.log('🔄 Processing activité:', activity.title)
      return {
        ...activity,
        images: Array.isArray(activity.images) ? activity.images : [],
        videos: Array.isArray(activity.videos) ? activity.videos : [],
        contentBlocks: Array.isArray(activity.contentBlocks) ? activity.contentBlocks : []
      }
    })
    
    console.log('✅ Activités parsées:', parsedActivities.length)
    return NextResponse.json(parsedActivities)
  } catch (error) {
    console.error('❌ Error fetching activities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities', details: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const connection = await getConnection()
    
    // Générer un ID unique
    const activityId = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    
    // Insérer l'activité avec les content blocks intégrés
    const [result] = await connection.execute(`
      INSERT INTO Activity (
        id, title, description, longDescription, date, time, location, 
        participants, status, coverImage, images, videos, contentBlocks
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      activityId,
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
      JSON.stringify(body.contentBlocks || [])
    ])
    
    await connection.end()
    
    // Retourner l'activité créée
    const newActivity = {
      id: activityId,
      title: body.title,
      description: body.description || '',
      longDescription: body.longDescription || '',
      date: body.date || '',
      time: body.time || '',
      location: body.location || '',
      participants: body.participants || '',
      status: body.status || 'upcoming',
      coverImage: body.coverImage || '',
      images: body.images || [],
      videos: body.videos || [],
      contentBlocks: body.contentBlocks || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    return NextResponse.json(newActivity, { status: 201 })
  } catch (error) {
    console.error('Error creating activity:', error)
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    )
  }
}
