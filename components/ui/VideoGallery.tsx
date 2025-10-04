'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, X, ChevronLeft, ChevronRight } from 'lucide-react'
import UploadedVideo from './UploadedVideo'

interface Video {
  id: string
  src: string
  poster?: string
  title?: string
  description?: string
}

interface VideoGalleryProps {
  videos: Video[]
  className?: string
}

export default function VideoGallery({ videos, className = '' }: VideoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [pausedVideos, setPausedVideos] = useState<Set<string>>(new Set())
  
  const containerRef = useRef<HTMLDivElement>(null)

  // Navigation
  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  const goToVideo = (index: number) => {
    setCurrentIndex(index)
  }

  // Gestion du plein écran
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Gestion de la pause au clic
  const toggleVideoPause = (videoId: string) => {
    setPausedVideos(prev => {
      const newSet = new Set(prev)
      if (newSet.has(videoId)) {
        newSet.delete(videoId)
      } else {
        newSet.add(videoId)
      }
      return newSet
    })
  }

  // Navigation clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          prevVideo()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextVideo()
          break
        case 'Escape':
          e.preventDefault()
          if (document.fullscreenElement) {
            document.exitFullscreen()
            setIsFullscreen(false)
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  // Gestion du changement de vidéo
  useEffect(() => {
    // Pause automatique de toutes les vidéos lors du changement
    setPausedVideos(new Set())
  }, [currentIndex])

  if (!videos || videos.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`}>
        <div className="text-gray-500">
          <div className="text-4xl mb-2">🎥</div>
          <div className="text-lg">Aucune vidéo disponible</div>
        </div>
      </div>
    )
  }

  const currentVideo = videos[currentIndex]

  return (
    <div className={`relative ${className}`}>
      {/* Galerie principale */}
      <div className="space-y-4">
        {/* Vidéo principale */}
        <div className="relative group">
          <div 
            ref={containerRef}
            className="relative rounded-lg overflow-hidden bg-black cursor-pointer"
            onClick={() => toggleVideoPause(currentVideo.id)}
          >
            <UploadedVideo
              src={currentVideo.src}
              poster={currentVideo.poster}
              title={currentVideo.title}
              className="w-full aspect-video"
              controls={false}
              isPaused={pausedVideos.has(currentVideo.id)}
            />
            
            {/* Overlay de pause au clic */}
            {pausedVideos.has(currentVideo.id) && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="bg-white/20 rounded-full p-6 mb-3 backdrop-blur-sm">
                    <Pause className="w-12 h-12" />
                  </div>
                  <div className="text-lg font-medium">Vidéo en pause</div>
                  <div className="text-sm text-gray-300 mt-1">Cliquez pour reprendre</div>
                </div>
              </div>
            )}

            {/* Indicateur de galerie */}
            <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
              {currentIndex + 1} / {videos.length}
            </div>

            {/* Bouton plein écran */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFullscreen()
              }}
              className="absolute top-2 left-2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors backdrop-blur-sm"
              aria-label="Plein écran"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>

          {/* Informations de la vidéo */}
          {currentVideo.title && (
            <div className="mt-3">
              <h3 className="text-lg font-semibold text-gray-900">{currentVideo.title}</h3>
              {currentVideo.description && (
                <p className="text-gray-600 mt-1">{currentVideo.description}</p>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        {videos.length > 1 && (
          <div className="flex items-center justify-between">
            <button
              onClick={prevVideo}
              disabled={currentIndex === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Précédente</span>
            </button>

            <div className="flex space-x-2">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToVideo(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Aller à la vidéo ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextVideo}
              disabled={currentIndex === videos.length - 1}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <span className="hidden sm:inline">Suivante</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Mode plein écran */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="relative h-full flex items-center justify-center">
            {/* Vidéo en plein écran */}
            <div className="relative w-full h-full flex items-center justify-center">
              <UploadedVideo
                src={currentVideo.src}
                poster={currentVideo.poster}
                title={currentVideo.title}
                className="w-full h-full max-w-7xl"
                controls={false}
                isPaused={pausedVideos.has(currentVideo.id)}
              />
              
              {/* Overlay de pause */}
              {pausedVideos.has(currentVideo.id) && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="bg-white/20 rounded-full p-8 mb-4 backdrop-blur-sm">
                      <Pause className="w-16 h-16" />
                    </div>
                    <div className="text-2xl font-medium">Vidéo en pause</div>
                    <div className="text-lg text-gray-300 mt-2">Cliquez pour reprendre</div>
                  </div>
                </div>
              )}

              {/* Contrôles de navigation plein écran */}
              <div className="absolute inset-0 flex items-center justify-between p-8 pointer-events-none">
                <button
                  onClick={prevVideo}
                  disabled={currentIndex === 0}
                  className="bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition-colors pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                  onClick={nextVideo}
                  disabled={currentIndex === videos.length - 1}
                  className="bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition-colors pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

              {/* Bouton fermer plein écran */}
              <button
                onClick={toggleFullscreen}
                className="absolute top-8 right-8 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-colors"
                aria-label="Fermer le plein écran"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Indicateur de position */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                {currentIndex + 1} / {videos.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Miniatures des vidéos */}
      {videos.length > 1 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Toutes les vidéos</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`relative group cursor-pointer rounded-lg overflow-hidden ${
                  index === currentIndex ? 'ring-2 ring-primary-600' : ''
                }`}
                onClick={() => goToVideo(index)}
              >
                <div className="aspect-video bg-gray-200 relative">
                  {video.poster ? (
                    <img
                      src={video.poster}
                      alt={video.title || `Vidéo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                      <div className="text-gray-500 text-2xl">🎥</div>
                    </div>
                  )}
                  
                  {/* Indicateur de lecture */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/80 text-black p-2 rounded-full">
                      <Play className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Numéro de la vidéo */}
                  <div className="absolute top-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                    {index + 1}
                  </div>

                  {/* Indicateur de pause */}
                  {pausedVideos.has(video.id) && (
                    <div className="absolute top-1 right-1 bg-yellow-600 text-white text-xs px-1.5 py-0.5 rounded">
                      ⏸️
                    </div>
                  )}
                </div>

                {video.title && (
                  <div className="p-2 bg-white">
                    <p className="text-xs text-gray-700 truncate">{video.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
