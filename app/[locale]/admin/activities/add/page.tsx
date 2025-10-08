'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useActivitiesStore } from '@/lib/activitiesStore'
import { Plus, X, Image as ImageIcon, Video, Type, AlignLeft, Move, Trash2 } from 'lucide-react'

interface ContentBlock {
  id: string
  type: 'title' | 'paragraph' | 'image-gallery' | 'video'
  content: string
  images?: string[]
  videos?: Array<{
    src: string
    title: string
    description: string
    poster: string
  }>
  style?: string
  order: number
}

export default function AddActivityPage() {
  const router = useRouter()
  const { addActivity } = useActivitiesStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingBlockIndex, setEditingBlockIndex] = useState<number | null>(null)
  
  // État du formulaire
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    date: '',
    time: '',
    location: '',
    participants: '',
    status: 'upcoming' as 'upcoming' | 'ongoing' | 'completed',
    coverImage: '',
    images: [] as string[],
    videos: [] as Array<{
      src: string
      title: string
      description: string
      poster: string
    }>
  })

  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
  
  // Gestion des champs du formulaire
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Gestion des content blocks
  const addContentBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      type,
      content: '',
      images: type === 'image-gallery' ? [] : undefined,
      videos: type === 'video' ? [] : undefined,
      style: '',
      order: contentBlocks.length
    }
    setContentBlocks(prev => [...prev, newBlock])
    setEditingBlockIndex(contentBlocks.length)
  }

  const updateContentBlock = (index: number, field: string, value: any) => {
    const newBlocks = [...contentBlocks]
    newBlocks[index] = { ...newBlocks[index], [field]: value }
    setContentBlocks(newBlocks)
  }

  const deleteContentBlock = (index: number) => {
    const newBlocks = contentBlocks.filter((_, i) => i !== index)
    // Réorganiser les ordres
    newBlocks.forEach((block, i) => {
      block.order = i
    })
    setContentBlocks(newBlocks)
    if (editingBlockIndex === index) {
      setEditingBlockIndex(null)
    } else if (editingBlockIndex !== null && editingBlockIndex > index) {
      setEditingBlockIndex(editingBlockIndex - 1)
    }
  }

  const moveContentBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...contentBlocks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex >= 0 && targetIndex < newBlocks.length) {
      // Échanger les blocs
      const temp = newBlocks[index]
      newBlocks[index] = newBlocks[targetIndex]
      newBlocks[targetIndex] = temp
      
      // Mettre à jour les ordres
      newBlocks.forEach((block, i) => {
        block.order = i
      })
      
      setContentBlocks(newBlocks)
      
      // Mettre à jour l'index d'édition si nécessaire
      if (editingBlockIndex === index) {
        setEditingBlockIndex(targetIndex)
      } else if (editingBlockIndex === targetIndex) {
        setEditingBlockIndex(index)
      }
    }
  }

  // Upload d'image de couverture
  const handleCoverImageUpload = async (file: File) => {
    console.log('📤 Upload de l\'image de couverture:', file.name)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await fetch('/api/upload', { method: 'POST', body: formData })
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Upload image de couverture réussi:', data.url)
        handleInputChange('coverImage', data.url)
      } else {
        console.error('❌ Erreur upload image de couverture:', response.status, response.statusText)
        const errorData = await response.text()
        console.error('📋 Détails erreur:', errorData)
        alert('Erreur lors de l\'upload de l\'image de couverture')
      }
    } catch (error) {
      console.error('❌ Erreur upload image de couverture:', error)
      alert('Erreur lors de l\'upload de l\'image de couverture')
    }
  }

  // Upload d'images pour les blocs
  const handleImageUpload = async (files: FileList, blockIndex: number) => {
    const newBlocks = [...contentBlocks]
    if (!newBlocks[blockIndex].images) newBlocks[blockIndex].images = []
    
    console.log('📤 Upload de', files.length, 'fichiers pour le bloc', blockIndex)
    
    const uploadedUrls: string[] = []
    for (const file of Array.from(files)) {
      console.log('📤 Upload de:', file.name)
        const formData = new FormData()
      formData.append('file', file)
      try {
        const response = await fetch('/api/upload', { method: 'POST', body: formData })
        if (response.ok) {
          const data = await response.json()
          console.log('✅ Upload réussi:', data.url)
          uploadedUrls.push(data.url)
        } else {
          console.error('❌ Erreur upload:', response.status, response.statusText)
          const errorData = await response.text()
          console.error('📋 Détails erreur:', errorData)
        }
      } catch (error) {
        console.error('❌ Erreur upload:', error)
      }
    }
    
    console.log('📊 URLs uploadées:', uploadedUrls)
    newBlocks[blockIndex].images = [...newBlocks[blockIndex].images, ...uploadedUrls]
    setContentBlocks(newBlocks)
  }

  // Upload de vidéos pour les blocs
  const handleVideoUpload = async (files: FileList, blockIndex: number) => {
    const newBlocks = [...contentBlocks]
    if (!newBlocks[blockIndex].videos) newBlocks[blockIndex].videos = []
    
    console.log('📤 Upload de', files.length, 'vidéos pour le bloc', blockIndex)
    
    const uploadedVideos: Array<{src: string, title: string, description: string, poster: string}> = []
    for (const file of Array.from(files)) {
      console.log('📤 Upload de vidéo:', file.name)
          const formData = new FormData()
          formData.append('file', file)
      try {
          const response = await fetch('/api/upload', { method: 'POST', body: formData })
          if (response.ok) {
            const data = await response.json()
          console.log('✅ Upload vidéo réussi:', data.url)
          uploadedVideos.push({ 
            src: data.url, 
            title: data.fileName || 'Vidéo', 
            description: '', 
            poster: '' 
          })
        } else {
          console.error('❌ Erreur upload vidéo:', response.status, response.statusText)
          const errorData = await response.text()
          console.error('📋 Détails erreur:', errorData)
        }
      } catch (error) {
        console.error('❌ Erreur upload vidéo:', error)
      }
    }
    
    if (uploadedVideos.length > 0) {
      newBlocks[blockIndex].videos = [...(newBlocks[blockIndex].videos || []), ...uploadedVideos]
      setContentBlocks(newBlocks)
      console.log('✅ Vidéos ajoutées au bloc:', uploadedVideos.length)
    }
  }

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log('📝 Création de l\'activité avec les données:', {
        ...formData,
        contentBlocks: contentBlocks.map(block => ({
          ...block,
          order: block.order
        }))
      })

      await addActivity({
        ...formData,
        contentBlocks: contentBlocks.map(block => ({
          ...block,
          order: block.order
        }))
      })

      console.log('✅ Activité créée avec succès')
      router.push('/fr/admin/activities')
    } catch (error) {
      console.error('❌ Erreur lors de la création:', error)
      alert('Erreur lors de la création de l\'activité')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getBlockIcon = (type: ContentBlock['type']) => {
    switch (type) {
      case 'title': return <Type className="w-4 h-4" />
      case 'paragraph': return <AlignLeft className="w-4 h-4" />
      case 'image-gallery': return <ImageIcon className="w-4 h-4" />
      case 'video': return <Video className="w-4 h-4" />
      default: return <Type className="w-4 h-4" />
    }
  }

  const getBlockTitle = (type: ContentBlock['type']) => {
    switch (type) {
      case 'title': return 'Titre'
      case 'paragraph': return 'Paragraphe'
      case 'image-gallery': return 'Galerie d\'images'
      case 'video': return 'Vidéo'
      default: return 'Bloc'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* En-tête */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Créer une nouvelle activité</h1>
            <p className="mt-1 text-sm text-gray-600">
              Remplissez les informations de base et ajoutez du contenu personnalisé
            </p>
      </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Informations de base */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Informations de base</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre de l'activité *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Ex: Cérémonie de remise des diplômes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="upcoming">À venir</option>
                    <option value="ongoing">En cours</option>
                    <option value="completed">Terminé</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description courte
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Une description courte de l'activité..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description longue
                </label>
                <textarea
                  value={formData.longDescription}
                  onChange={(e) => handleInputChange('longDescription', e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Une description détaillée de l'activité..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lieu
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Ex: Salle de conférence"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de participants
                </label>
                <input
                  type="text"
                  value={formData.participants}
                  onChange={(e) => handleInputChange('participants', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: 50 personnes"
                />
              </div>

              {/* Image de couverture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image de couverture
                </label>
                <div className="space-y-4">
                  {/* Zone d'upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleCoverImageUpload(e.target.files[0])
                        }
                        e.target.value = ''
                      }}
                      className="hidden"
                      id="cover-image-upload"
                    />
                    <label htmlFor="cover-image-upload" className="cursor-pointer">
                      <div className="text-gray-400 mb-2">
                        <ImageIcon className="w-12 h-12 mx-auto" />
                      </div>
                      <span className="text-blue-600 hover:text-blue-500 font-medium">
                        Cliquez pour sélectionner une image de couverture
                      </span>
                      <span className="text-gray-500"> ou glissez-déposez</span>
                      <div className="mt-2 text-xs text-gray-400">
                        PNG, JPG, GIF jusqu'à 10MB
                      </div>
                    </label>
                  </div>

                  {/* Aperçu de l'image de couverture */}
                  {formData.coverImage && (
                    <div className="relative">
                      <img
                        src={formData.coverImage}
                        alt="Aperçu de l'image de couverture"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                <button
                  type="button"
                        onClick={() => handleInputChange('coverImage', '')}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                >
                        ×
                </button>
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        Image de couverture
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Blocks */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Contenu personnalisé</h2>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => addContentBlock('title')}
                    className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Type className="w-4 h-4 mr-1" />
                    Titre
                  </button>
                  <button
                    type="button"
                    onClick={() => addContentBlock('paragraph')}
                    className="flex items-center px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <AlignLeft className="w-4 h-4 mr-1" />
                    Paragraphe
                  </button>
                  <button
                    type="button"
                    onClick={() => addContentBlock('image-gallery')}
                    className="flex items-center px-3 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    <ImageIcon className="w-4 h-4 mr-1" />
                    Galerie
                  </button>
                            <button
                              type="button"
                    onClick={() => addContentBlock('video')}
                    className="flex items-center px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    <Video className="w-4 h-4 mr-1" />
                    Vidéo
                </button>
                </div>
              </div>

              {/* Liste des blocs */}
              <div className="space-y-4">
                      {contentBlocks.map((block, index) => (
                  <div key={block.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getBlockIcon(block.type)}
                        <span className="font-medium text-gray-900">
                          {getBlockTitle(block.type)} #{index + 1}
                          </span>
                        {block.images && block.images.length > 0 && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {block.images.length} image(s)
                          </span>
                          )}
                        {block.videos && block.videos.length > 0 && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            {block.videos.length} vidéo(s)
                            </span>
                          )}
                        </div>
                      <div className="flex items-center space-x-2">
                <button
                  type="button"
                          onClick={() => moveContentBlock(index, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                          <Move className="w-4 h-4 rotate-90" />
                </button>
                <button
                          type="button"
                          onClick={() => moveContentBlock(index, 'down')}
                          disabled={index === contentBlocks.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Move className="w-4 h-4 -rotate-90" />
                </button>
                <button
                          type="button"
                          onClick={() => setEditingBlockIndex(editingBlockIndex === index ? null : index)}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                        >
                          {editingBlockIndex === index ? 'Fermer' : 'Modifier'}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteContentBlock(index)}
                          className="p-1 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Contenu du bloc */}
                    {editingBlockIndex === index && (
                      <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contenu
                        </label>
                        <input
                            type="text"
                            value={block.content}
                            onChange={(e) => updateContentBlock(index, 'content', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder={`Contenu du ${getBlockTitle(block.type).toLowerCase()}...`}
                        />
                      </div>
                      
                        {/* Gestion des images pour les galeries */}
                        {block.type === 'image-gallery' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                              Images
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                                  if (e.target.files) {
                                    handleImageUpload(e.target.files, index)
                                  }
                                  e.target.value = ''
                        }}
                        className="hidden"
                                id={`image-upload-${index}`}
                      />
                              <label htmlFor={`image-upload-${index}`} className="cursor-pointer">
                        <div className="text-gray-400 mb-2">
                          <ImageIcon className="w-12 h-12 mx-auto" />
                        </div>
                        <span className="text-blue-600 hover:text-blue-500 font-medium">
                          Cliquez pour ajouter des images
                        </span>
                        <span className="text-gray-500"> ou glissez-déposez</span>
                                <div className="mt-2 text-xs text-gray-400">
                                  {block.images && block.images.length > 0 && (
                                    <span className="text-green-600">
                                      ✓ {block.images.length} image(s) ajoutée(s)
                                    </span>
                                  )}
                                </div>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        PNG, JPG, GIF jusqu'à 10MB
                      </p>
                    </div>
                    
                            {/* Aperçu des images */}
                            {block.images && block.images.length > 0 && (
                              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                                {block.images.map((image, imgIndex) => (
                                  <div key={imgIndex} className="relative group">
                                    <img
                                      src={image}
                                      alt={`Image ${imgIndex + 1}`}
                                      className="w-full h-20 object-cover rounded-lg"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newImages = block.images?.filter((_, i) => i !== imgIndex) || []
                                        updateContentBlock(index, 'images', newImages)
                                      }}
                                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                        )}

                        {/* Gestion des vidéos pour les blocs vidéo */}
                        {block.type === 'video' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                              Vidéos
                          </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        multiple
                        accept="video/mp4"
                            onChange={(e) => {
                                  if (e.target.files) {
                                    handleVideoUpload(e.target.files, index)
                                  }
                                  e.target.value = ''
                        }}
                        className="hidden"
                                id={`video-upload-${index}`}
                      />
                              <label htmlFor={`video-upload-${index}`} className="cursor-pointer">
                        <div className="text-gray-400 mb-2">
                          <Video className="w-12 h-12 mx-auto" />
                        </div>
                        <span className="text-red-600 hover:text-red-500 font-medium">
                          Cliquez pour ajouter des vidéos MP4
                        </span>
                        <span className="text-gray-500"> ou glissez-déposez</span>
                                <div className="mt-2 text-xs text-gray-400">
                                  {block.videos && block.videos.length > 0 && (
                                    <span className="text-green-600">
                                      ✓ {block.videos.length} vidéo(s) ajoutée(s)
                                    </span>
                                  )}
                                </div>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        MP4 uniquement jusqu'à 50MB
                      </p>
                    </div>
                    
                            {/* Aperçu des vidéos */}
                            {block.videos && block.videos.length > 0 && (
                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {block.videos.map((video, vidIndex) => (
                                  <div key={vidIndex} className="relative group">
                                    <video
                                      src={video.src}
                                      className="w-full h-32 object-cover rounded-lg"
                                      controls
                                    />
                                    <div className="mt-1 text-xs text-gray-600 truncate">
                                      {video.title}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newVideos = block.videos?.filter((_, i) => i !== vidIndex) || []
                                        updateContentBlock(index, 'videos', newVideos)
                                      }}
                                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                        )}
                        
                        {/* Style personnalisé */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Style CSS personnalisé (optionnel)
                          </label>
                          <input
                            type="text"
                            value={block.style || ''}
                            onChange={(e) => updateContentBlock(index, 'style', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Ex: text-center text-blue-600"
                          />
                        </div>
                      </div>
                    )}
                    </div>
                ))}

                {contentBlocks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>Aucun bloc de contenu ajouté</p>
                    <p className="text-sm">Cliquez sur les boutons ci-dessus pour ajouter du contenu</p>
                  </div>
                )}
              </div>
            </div>

                {/* Boutons d'action */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Création...' : 'Créer l\'activité'}
                  </button>
            </div>
          </form>
          </div>
      </div>
    </div>
  )
}
