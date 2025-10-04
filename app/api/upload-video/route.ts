import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    console.log('Upload video API called')
    
    const formData = await request.formData()
    const file = formData.get('file') as File

    console.log('File received:', file ? {
      name: file.name,
      size: file.size,
      type: file.type
    } : 'No file')

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    // Vérifier que c'est bien une vidéo
    if (!file.type.startsWith('video/')) {
      return NextResponse.json(
        { error: 'Le fichier doit être une vidéo' },
        { status: 400 }
      )
    }

    // Vérifier la taille (max 100MB)
    const maxSize = 100 * 1024 * 1024 // 100MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux (max 100MB)' },
        { status: 400 }
      )
    }

    // Créer le dossier s'il n'existe pas
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'videos')
    console.log('Upload directory:', uploadDir)
    await mkdir(uploadDir, { recursive: true })

    // Générer un nom de fichier unique
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop()
    const filename = `video-${timestamp}-${randomString}.${extension}`

    // Chemin complet du fichier
    const filepath = join(uploadDir, filename)
    console.log('File path:', filepath)

    // Convertir le fichier en buffer et l'écrire
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log('Buffer size:', buffer.length)
    await writeFile(filepath, buffer)
    console.log('File written successfully')

    // Pour l'instant, utiliser des dimensions par défaut
    // Les vraies dimensions seront récupérées côté client
    const videoDimensions = { width: 640, height: 360 }

    // Retourner l'URL publique
    const url = `/uploads/videos/${filename}`

    return NextResponse.json({ 
      url,
      filename,
      size: file.size,
      type: file.type,
      dimensions: videoDimensions
    })

  } catch (error) {
    console.error('Erreur lors de l\'upload de la vidéo:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload' },
      { status: 500 }
    )
  }
}




