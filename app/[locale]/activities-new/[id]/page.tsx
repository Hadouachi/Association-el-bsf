'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useActivitiesStore } from '@/lib/activitiesStore'
import { Calendar, Clock, MapPin, Users, Video, Image as ImageIcon, ArrowLeft, X } from 'lucide-react'
import { Activity, ContentBlock } from '@/lib/activitiesStore'
import UploadedImage from '@/components/ui/UploadedImage'

// Composant de galerie interactive
const InteractiveGallery = ({ images, title }: { images: string[], title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const openFullscreen = () => {
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
        <p>Aucune image dans cette galerie</p>
      </div>
    )
  }

  return (
    <>
      {/* Galerie principale */}
      <div className="relative">
        <div className="relative overflow-hidden rounded-lg bg-gray-100">
          {/* Image principale */}
          <div className="relative aspect-video md:aspect-[16/9]">
            <UploadedImage
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="w-full h-full object-cover cursor-pointer select-none"
              onClick={openFullscreen}
              draggable={false}
            />
            
            {/* Navigation gauche/droite */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
                  aria-label="Image précédente"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
                  aria-label="Image suivante"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Indicateur de position */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
        
        {/* Miniatures en dessous */}
        {images.length > 1 && (
          <div className="mt-3 flex space-x-2 overflow-x-auto pb-2">
            {images.map((image: string, imgIndex: number) => (
              <div
                key={imgIndex}
                className={`flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  imgIndex === currentIndex ? 'border-primary-500' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => goToImage(imgIndex)}
              >
                <UploadedImage
                  src={image}
                  alt={`Miniature ${imgIndex + 1}`}
                  width={80}
                  height={60}
                  className="w-16 h-12 md:w-20 md:h-15 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mode plein écran */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Bouton fermer */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image plein écran */}
          <div className="relative w-full h-full flex items-center justify-center">
            <UploadedImage
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="max-w-full max-h-full object-contain select-none"
            />
            
            {/* Navigation plein écran */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300"
                  aria-label="Image précédente"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300"
                  aria-label="Image suivante"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Indicateur de position plein écran */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-2 rounded-full text-sm backdrop-blur-sm">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default function ActivityDetailPageNew() {
  const params = useParams()
  const router = useRouter()
  const { getActivity, fetchActivities } = useActivitiesStore()
  const [activity, setActivity] = useState<Activity | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadActivity = async () => {
      console.log('🔄 Chargement de l\'activité:', params.id)
      await fetchActivities()
      const foundActivity = getActivity(params.id as string)
      console.log('📋 Activité trouvée:', foundActivity)
      if (foundActivity) {
        setActivity(foundActivity)
      }
      setIsLoading(false)
    }
    
    loadActivity()
  }, [params.id, getActivity, fetchActivities])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement de l'activité...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">⚠️ Activité non trouvée</div>
            <p className="text-gray-600">
              L'activité que vous recherchez n'existe pas ou a été supprimée.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'ongoing':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'À venir'
      case 'ongoing':
        return 'En cours'
      case 'completed':
        return 'Terminé'
      default:
        return 'Inconnu'
    }
  }

  // Fonction pour rendre les content blocks
  const renderContentBlock = (block: ContentBlock, index: number) => {
    console.log('🎨 Rendu du bloc:', block.type, block)
    
    switch (block.type) {
      case 'title':
        return (
          <div key={index} className="mb-4 md:mb-6">
            <h2 
              className={`text-xl md:text-2xl font-bold text-gray-900 ${block.style || ''}`}
            >
              {block.content}
            </h2>
          </div>
        )
      
      case 'paragraph':
        return (
          <div key={index} className="mb-4 md:mb-6">
            <p 
              className={`text-gray-700 leading-relaxed text-justify text-sm md:text-base ${block.style || ''}`}
            >
              {block.content}
            </p>
          </div>
        )
      
      case 'image-gallery':
        return (
          <div key={index} className="mb-6 md:mb-8">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
              <ImageIcon className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              {block.content}
            </h3>
            {block.images && block.images.length > 0 ? (
              <InteractiveGallery images={block.images} title={block.content} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>Aucune image dans cette galerie</p>
              </div>
            )}
          </div>
        )
      
      case 'video':
        return (
          <div key={index} className="mb-6 md:mb-8">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
              <Video className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              {block.content}
            </h3>
            {block.videos && block.videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {block.videos.map((video: any, videoIndex: number) => (
                  <div key={videoIndex} className="space-y-2">
                    <video
                      src={video.src}
                      poster={video.poster}
                      controls
                      className="w-full rounded-lg"
                    >
                      Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                    {video.title && (
                      <h4 className="font-medium text-gray-900 text-sm md:text-base">{video.title}</h4>
                    )}
                    {video.description && (
                      <p className="text-xs md:text-sm text-gray-600">{video.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Video className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>Aucune vidéo dans cette galerie</p>
              </div>
            )}
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section avec Image de Couverture */}
      <div className="relative h-screen bg-gray-50">
        {/* Bouton de retour */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-3 py-2 md:px-4 md:py-2 rounded-full hover:bg-white/30 active:bg-white/40 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
            aria-label="Retour à la page précédente"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Retour</span>
          </button>
        </div>

        {/* Image de couverture */}
        {activity.coverImage ? (
          <div className="absolute inset-0 overflow-hidden">
            <UploadedImage
              src={activity.coverImage}
              alt={activity.title}
              fill
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <div className="text-primary-600 text-4xl md:text-6xl">📷</div>
          </div>
        )}
        
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        {/* Contenu du hero centré */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 drop-shadow-2xl leading-tight px-2">
              {activity.title}
            </h1>
            
            {/* Informations de date, heure et lieu */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-8 text-base md:text-xl mb-6 md:mb-8 px-2">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2 rounded-full w-full sm:w-auto justify-center min-w-0">
                <Calendar className="w-4 h-4 md:w-6 md:h-6 mr-2 md:mr-3 flex-shrink-0" />
                <span className="text-sm md:text-base truncate">
                  {new Date(activity.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              {activity.time && (
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2 rounded-full w-full sm:w-auto justify-center min-w-0">
                  <Clock className="w-4 h-4 md:w-6 md:h-6 mr-2 md:mr-3 flex-shrink-0" />
                  <span className="text-sm md:text-base">{activity.time}</span>
                </div>
              )}
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2 rounded-full w-full sm:w-auto justify-center min-w-0">
                <MapPin className="w-4 h-4 md:w-6 md:h-6 mr-2 md:mr-3 flex-shrink-0" />
                <span className="text-sm md:text-base truncate max-w-[120px] sm:max-w-none">{activity.location}</span>
              </div>
            </div>
            
            {/* Statut de l'activité */}
            <div className="flex justify-center px-2">
              <span className={`inline-flex items-center px-4 py-2 md:px-6 md:py-3 rounded-full text-base md:text-xl font-semibold ${getStatusColor(activity.status)} bg-white bg-opacity-95 shadow-2xl backdrop-blur-sm`}>
                {getStatusText(activity.status)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="relative bg-gray-50">
        {/* Section de transition */}
        <div className="relative -mt-16 md:-mt-20 h-16 md:h-20 bg-gray-50">
          <svg
            className="absolute bottom-0 w-full h-16 md:h-20"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 bg-white">
          {/* Séparateur décoratif */}
          <div className="relative mb-8 md:mb-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Détails de l'activité</span>
            </div>
          </div>

          {/* Description longue */}
          {activity.longDescription && (
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center">
                <div className="w-2 h-6 md:h-8 bg-primary-500 rounded-full mr-3 md:mr-4"></div>
                À propos de cette activité
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base md:text-lg">
                  {activity.longDescription}
                </p>
              </div>
            </div>
          )}

          {/* Content Blocks personnalisables */}
          {activity.contentBlocks && activity.contentBlocks.length > 0 && (
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center">
                <div className="w-2 h-6 md:h-8 bg-primary-500 rounded-full mr-3 md:mr-4"></div>
                Contenu détaillé
              </h2>
              <div className="space-y-8 md:space-y-10">
                {activity.contentBlocks
                  .sort((a, b) => a.order - b.order)
                  .map((block, index) => renderContentBlock(block, index))}
              </div>
            </div>
          )}

          {/* Galerie d'images principales */}
          {activity.images && activity.images.length > 0 && (
            <div className="mb-12 md:mb-16">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center">
                <ImageIcon className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-primary-600" />
                Galerie d'images
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {activity.images.map((image: string, index: number) => (
                  <div key={index} className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2">
                    <div className="relative aspect-square md:aspect-auto">
                      <UploadedImage
                        src={image}
                        alt={`Image ${index + 1}`}
                        fill
                        className="w-full h-full object-cover group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                        onClick={() => {
                          window.open(image, '_blank')
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          👁️
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Galerie Vidéo */}
          {activity.videos && activity.videos.length > 0 && (
            <div className="mb-12 md:mb-16">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center">
                <Video className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-primary-600" />
                Galerie Vidéo
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {activity.videos.map((video: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <video
                      src={video.src}
                      poster={video.poster}
                      controls
                      className="w-full rounded-lg"
                    >
                      Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                    {video.title && (
                      <h4 className="font-medium text-gray-900 text-sm md:text-base">{video.title}</h4>
                    )}
                    {video.description && (
                      <p className="text-xs md:text-sm text-gray-600">{video.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
