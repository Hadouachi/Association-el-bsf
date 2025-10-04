import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Hadouachi20@',
  database: 'association_el_bsf',
  port: 3306
}

// GET - Récupérer un contenu À propos par ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let connection
  
  try {
    connection = await mysql.createConnection(dbConfig)
    
    const [rows] = await connection.execute(`
      SELECT * FROM AboutContent WHERE id = ?
    `, [params.id]) as [any[], any]
    
    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Contenu À propos non trouvé' },
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

// PUT - Mettre à jour un contenu À propos
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let connection
  
  try {
    const body = await request.json()
    const { title, subtitle, description, coverImage, status } = body
    
    connection = await mysql.createConnection(dbConfig)
    
    // Vérifier que le contenu existe
    const [existingRows] = await connection.execute(`
      SELECT id FROM AboutContent WHERE id = ?
    `, [params.id]) as [any[], any]
    
    if (existingRows.length === 0) {
      return NextResponse.json(
        { error: 'Contenu À propos non trouvé' },
        { status: 404 }
      )
    }
    
    // Mettre à jour le contenu
    await connection.execute(`
      UPDATE AboutContent 
      SET title = ?, subtitle = ?, description = ?, coverImage = ?, status = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [title, subtitle, description, coverImage, status, params.id])
    
    // Récupérer le contenu mis à jour
    const [updatedRows] = await connection.execute(`
      SELECT * FROM AboutContent WHERE id = ?
    `, [params.id]) as [any[], any]
    
    const updatedAboutContent = {
      ...updatedRows[0],
      createdAt: new Date(updatedRows[0].createdAt),
      updatedAt: new Date(updatedRows[0].updatedAt)
    }
    
    return NextResponse.json(updatedAboutContent)
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour du contenu À propos:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du contenu' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}

// DELETE - Supprimer un contenu À propos
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let connection
  
  try {
    connection = await mysql.createConnection(dbConfig)
    
    // Vérifier que le contenu existe
    const [existingRows] = await connection.execute(`
      SELECT id FROM AboutContent WHERE id = ?
    `, [params.id]) as [any[], any]
    
    if (existingRows.length === 0) {
      return NextResponse.json(
        { error: 'Contenu À propos non trouvé' },
        { status: 404 }
      )
    }
    
    // Supprimer le contenu
    await connection.execute(`
      DELETE FROM AboutContent WHERE id = ?
    `, [params.id])
    
    return NextResponse.json({ message: 'Contenu À propos supprimé avec succès' })
    
  } catch (error) {
    console.error('Erreur lors de la suppression du contenu À propos:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du contenu' },
      { status: 500 }
    )
  } finally {
    if (connection) await connection.end()
  }
}
