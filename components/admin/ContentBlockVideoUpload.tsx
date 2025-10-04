'use client'
import { useState, useRef } from 'react'
import { Upload, X, Video, Trash2, Play } from 'lucide-react'

interface ContentBlockVideoUploadProps {
  videos: Array<{
    src: string
    title: string
    description: string
    poster: string
    width?: number
    height?: number
  }>
  onVideosChange: (videos: Array<{
    src: string
    title: string
    description: string
    poster: string
    width?: number
    height?: number
  }>) => void
  label?: string
}

export default function ContentBlockVideoUpload({
  videos,
  onVideosChange,
  label = "Vidéos"
}: ContentBlockVideoUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadVideo = async (file: File): Promise<{url: string, dimensions: {width: number, height: number}}> => {
    const formData = new FormData()
    formData.append('file', file)

    console.log('Uploading video:', file.name, 'Size:', file.size, 'Type:', file.type)

    const response = await fetch('/api/upload-video', {
      method: 'POST',
      body: formData
    })

    console.log('Upload response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Upload error details:', errorData)
      throw new Error(`Erreur lors de l'upload de la vidéo: ${response.status} - ${errorData.error || 'Erreur inconnue'}`)
    }

    const data = await response.json()
    console.log('Upload success:', data)
    return {
      url: data.url,
      dimensions: data.dimensions || { width: 640, height: 360 }
    }
  }

  const handleFileSelect = async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    setIsUploading(true)
    setUploadProgress({})
    
    try {
      const validFiles = Array.from(selectedFiles).filter(file => file.type.startsWith('video/'))
      
      if (validFiles.length === 0) {
        alert('Aucun fichier vidéo valide sélectionné')
        return
      }

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i]
        const fileKey = `${file.name}-${i}`
        
        setUploadProgress(prev => ({ ...prev, [fileKey]: 0 }))
        
        try {
          const videoData = await uploadVideo(file)
          const newVideo = {
            src: videoData.url,
            title: `Vidéo ${videos.length + i + 1}`,
            description: `Description de la vidéo ${videos.length + i + 1}`,
            poster: '/images/activities/default-poster.jpg',
            width: videoData.dimensions.width,
            height: videoData.dimensions.height
          }
          
          const updatedVideos = [...videos, newVideo]
          onVideosChange(updatedVideos)
          
          setUploadProgress(prev => ({ ...prev, [fileKey]: 100 }))
        } catch (error) {
          console.error(`Erreur lors de l'upload de ${file.name}:`, error)
          setUploadProgress(prev => ({ ...prev, [fileKey]: -1 }))
        }
      }
    } catch (error) {
      console.error('Erreur générale lors de l\'upload:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de l\'upload de la vidéo'
      alert(`Erreur d'upload: ${errorMessage}`)
    } finally {
      setIsUploading(false)
      setUploadProgress({})
    }
  }

  const removeVideo = (index: number) => {
    const updatedVideos = videos.filter((_, i) => i !== index)
    onVideosChange(updatedVideos)
  }

  const updateVideo = (index: number, field: 'title' | 'description', value: string) => {
    const updatedVideos = [...videos]
    updatedVideos[index] = { ...updatedVideos[index], [field]: value }
    onVideosChange(updatedVideos)
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Zone d'upload */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
            <span className="text-gray-600">
              {Object.keys(uploadProgress).length > 0 
                ? `Upload en cours... (${Object.keys(uploadProgress).length} fichier(s))`
                : 'Upload en cours...'
              }
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-600">
              Cliquez pour ajouter des vidéos (.mp4, .avi, etc.)
            </span>
            <span className="text-xs text-gray-500">
              Taille max : 100MB
            </span>
          </div>
        )}
      </div>

      {/* Vidéos existantes */}
      {videos.length > 0 ? (
        <div className="space-y-3">
          {videos.map((video, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Video className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Vidéo {index + 1}
                  </span>
                </div>
                <button
                  onClick={() => removeVideo(index)}
                  className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              
              <div className="space-y-2">
                <input
                  type="text"
                  value={video.title}
                  onChange={(e) => updateVideo(index, 'title', e.target.value)}
                  placeholder="Titre de la vidéo"
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <input
                  type="text"
                  value={video.description}
                  onChange={(e) => updateVideo(index, 'description', e.target.value)}
                  placeholder="Description de la vidéo"
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
                
                                 {/* Aperçu de la vidéo */}
                 <div className="relative bg-gray-100 rounded-lg p-2">
                   <div className="relative">
                     <video
                       src={video.src}
                       className="w-full rounded"
                       style={{
                         height: video.height && video.width ? 
                           `${Math.min(120, (120 * video.height) / video.width)}px` : 
                           '120px',
                         maxHeight: '120px'
                       }}
                       controls
                       preload="metadata"
                       poster={video.poster}
                       onError={(e) => {
                         console.error('Erreur de chargement vidéo:', e)
                         e.currentTarget.style.display = 'none'
                       }}
                       onLoadedMetadata={(e) => {
                         // Mettre à jour les dimensions si elles ne sont pas définies
                         if (!video.width || !video.height) {
                           const videoElement = e.currentTarget
                           const updatedVideos = videos.map((v, idx) => 
                             idx === index ? { ...v, width: videoElement.videoWidth, height: videoElement.videoHeight } : v
                           )
                           onVideosChange(updatedVideos)
                         }
                       }}
                     />
                     <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded pointer-events-none">
                       <Play className="w-6 h-6 text-white" />
                     </div>
                   </div>
                   
                   {/* Informations de la vidéo */}
                   <div className="mt-2 text-xs text-gray-600">
                     <div className="flex items-center space-x-2">
                       <span>📁 {video.src.split('/').pop()}</span>
                       <span>🎬 {video.title}</span>
                       {video.width && video.height && (
                         <span>📐 {video.width}×{video.height}</span>
                       )}
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 text-sm">
          <Video className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          <p>Aucune vidéo ajoutée</p>
          <p className="text-xs">Cliquez ci-dessus pour ajouter votre première vidéo</p>
        </div>
      )}
    </div>
  )
}
