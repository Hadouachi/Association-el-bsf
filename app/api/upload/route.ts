import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    // Vérifier le type de fichier
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/mp4')

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: 'Seuls les fichiers image et vidéo MP4 sont autorisés' },
        { status: 400 }
      )
    }

    // Définir le répertoire d'upload
    const uploadType = isImage ? 'images' : 'videos'
    const uploadDir = join(process.cwd(), 'public', 'uploads', uploadType)

    // Créer un nom de fichier unique
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop()
    const fileName = `${timestamp}-${randomString}.${extension}`
    const filePath = join(uploadDir, fileName)

    // Créer le dossier s'il n'existe pas
    await mkdir(uploadDir, { recursive: true })

    // Convertir le fichier en buffer et l'écrire
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Retourner l'URL du fichier
    const fileUrl = `/uploads/${uploadType}/${fileName}`

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName: fileName
    })

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload du fichier' },
      { status: 500 }
    )
  }
}