import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    const uploadedFiles = []
    
    for (const file of files) {
      if (file.size === 0) continue
      
      // Générer un nom de fichier unique
      const timestamp = Date.now()
      const randomId = Math.random().toString(36).substr(2, 9)
      const fileName = `${timestamp}-${randomId}-${file.name}`
      
      // Chemin de destination
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'about')
      const filePath = join(uploadDir, fileName)
      
      // Créer le dossier s'il n'existe pas
      await mkdir(uploadDir, { recursive: true })
      
      // Convertir le fichier en buffer et l'écrire
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(filePath, buffer)
      
      // Ajouter les informations du fichier uploadé
      uploadedFiles.push({
        src: `/uploads/about/${fileName}`,
        alt: file.name,
        caption: file.name,
        originalName: file.name,
        size: file.size,
        type: file.type
      })
    }
    
    return NextResponse.json({
      message: `${uploadedFiles.length} fichier(s) uploadé(s) avec succès`,
      files: uploadedFiles
    })
    
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload des fichiers' },
      { status: 500 }
    )
  }
}






