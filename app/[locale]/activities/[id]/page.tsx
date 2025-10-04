'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useActivitiesStore } from '@/lib/activitiesStore'
import { Calendar, Clock, MapPin, Users, Video, Image as ImageIcon, ArrowLeft, X } from 'lucide-react'
import { Activity, ContentBlock } from '@/lib/activitiesStore'

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

  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isFullscreen) return
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          prevImage()
          break
        case 'ArrowRight':
          event.preventDefault()
          nextImage()
          break
        case 'Escape':
          event.preventDefault()
          closeFullscreen()
          break
      }
    }

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFullscreen])

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
            <img
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={openFullscreen}
            />
            
            {/* Overlay avec contrôles - ne bloque pas les clics */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center pointer-events-none">
              <button
                onClick={openFullscreen}
                className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 pointer-events-auto"
              >
                <ImageIcon className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            {/* Boutons de navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-800 rotate-180" />
                </button>
              </>
            )}

            {/* Indicateur d'image */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>

        {/* Miniatures */}
        {images.length > 1 && (
          <div className="mt-4 flex justify-center space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentIndex 
                    ? 'border-primary-500 ring-2 ring-primary-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`Miniature ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mode plein écran */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-full p-4">
            {/* Bouton fermer */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-200"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image plein écran */}
            <div className="relative">
              <img
                src={images[currentIndex]}
                alt={`${title} - Image ${currentIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />

              {/* Contrôles plein écran */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-200"
                  >
                    <ArrowLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-200"
                  >
                    <ArrowLeft className="w-6 h-6 text-white rotate-180" />
                  </button>
                </>
              )}

              {/* Indicateur plein écran */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </div>

            {/* Miniatures en mode plein écran */}
            {images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentIndex 
                        ? 'border-white ring-2 ring-white' 
                        : 'border-gray-400 hover:border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Miniature ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

// Composant pour afficher les blocs de contenu
const ContentBlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case 'title':
      return (
        <h3 
          className="text-2xl font-bold text-gray-900 mb-3"
          style={block.style ? { ...JSON.parse(`{"${block.style.split(':')[0]}": "${block.style.split(':')[1]}"}`) } : {}}
        >
          {block.content}
        </h3>
      )
    
    case 'paragraph':
      return (
        <p 
          className="text-gray-700 mb-3 leading-relaxed text-justify"
          style={block.style ? { ...JSON.parse(`{"${block.style.split(':')[0]}": "${block.style.split(':')[1]}"}`) } : {}}
        >
          {block.content}
        </p>
      )
    
    case 'image-gallery':
      return (
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">{block.content}</h4>
          <InteractiveGallery images={block.images || []} title={block.content} />
        </div>
      )
    
    case 'video':
      return (
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">{block.content}</h4>
          <div className="grid grid-cols-1 gap-8">
            {block.videos?.map((video, index) => (
              <div key={index} className="rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-video">
                  <video
                    controls
                    className="w-full h-full object-cover"
                    preload="metadata"
                  >
                    <source src={video.src} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    
    default:
      return null
  }
}

export default function ActivityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getActivity, fetchActivities } = useActivitiesStore()
  const [activity, setActivity] = useState<Activity | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const loadActivity = async () => {
      try {
        setIsLoading(true)
        const activityId = params.id as string
        
        // Charger toutes les activités d'abord
        await fetchActivities()
        
        // Récupérer l'activité spécifique
        const activityData = getActivity(activityId)
        
        if (activityData) {
          setActivity(activityData)
        } else {
          console.error('Activité non trouvée:', activityId)
          router.push('/activities')
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'activité:', error)
        router.push('/activities')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadActivity()
  }, [params.id, getActivity, fetchActivities, router])

  // Gestion du scroll pour l'effet parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l'activité...</p>
        </div>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Activité non trouvée</h1>
          <p className="text-gray-600 mb-6">L'activité que vous recherchez n'existe pas.</p>
          <button
            onClick={() => router.push('/activities')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Retour aux activités
          </button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'ongoing': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'À venir'
      case 'ongoing': return 'En cours'
      case 'completed': return 'Terminé'
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec image de couverture et effet parallax */}
      <div className="relative h-96 overflow-hidden">
        {activity.coverImage ? (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${activity.coverImage})`,
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500" />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        {/* Contenu du header */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              {/* Bouton retour */}
              <button
                onClick={() => router.back()}
                className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </button>
              
              {/* Titre et statut */}
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {activity.title}
                </h1>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full whitespace-nowrap ${getStatusColor(activity.status)}`}>
                  {getStatusText(activity.status)}
                </span>
              </div>
              
              {/* Description courte */}
              {activity.description && (
                <p className="text-xl text-gray-200 mb-6">
                  {activity.description}
                </p>
              )}
              
              {/* Informations de base */}
              <div className="flex flex-wrap gap-6 text-white">
                {activity.date && (
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{new Date(activity.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                )}
                {activity.time && (
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{activity.time}</span>
                  </div>
                )}
                {activity.location && (
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{activity.location}</span>
                  </div>
                )}
                {activity.participants && (
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{activity.participants}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* Description longue */}
            {activity.longDescription && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">À propos de cette activité</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {activity.longDescription}
                  </p>
                </div>
              </div>
            )}

            {/* Blocs de contenu personnalisés */}
            {activity.contentBlocks && activity.contentBlocks.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Contenu détaillé</h2>
                <div className="space-y-0">
                  {activity.contentBlocks
                    .sort((a, b) => a.order - b.order)
                    .map((block) => (
                      <div key={block.id} className="rounded-lg shadow-sm p-6">
                        <ContentBlockRenderer block={block} />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Galerie d'images de l'activité */}
            {activity.images && activity.images.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Galerie photos</h2>
                <InteractiveGallery images={activity.images} title={activity.title} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Informations de l'activité */}
              <div className="rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Informations</h3>
                <div className="space-y-4">
                  {activity.date && (
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-5 h-5 mr-3 text-primary-600" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-sm">{new Date(activity.date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</p>
                      </div>
                    </div>
                  )}
                  
                  {activity.time && (
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-3 text-primary-600" />
                      <div>
                        <p className="font-medium">Heure</p>
                        <p className="text-sm">{activity.time}</p>
                      </div>
                    </div>
                  )}
                  
                  {activity.location && (
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-5 h-5 mr-3 text-primary-600" />
                      <div>
                        <p className="font-medium">Lieu</p>
                        <p className="text-sm">{activity.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {activity.participants && (
                    <div className="flex items-center text-gray-700">
                      <Users className="w-5 h-5 mr-3 text-primary-600" />
                      <div>
                        <p className="font-medium">Participants</p>
                        <p className="text-sm">{activity.participants}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => window.print()}
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Imprimer cette page
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: activity.title,
                          text: activity.description,
                          url: window.location.href
                        })
                      } else {
                        navigator.clipboard.writeText(window.location.href)
                        alert('Lien copié dans le presse-papiers !')
                      }
                    }}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Partager
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


