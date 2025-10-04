'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react'

interface UploadedVideoProps {
  src: string
  poster?: string
  title?: string
  className?: string
  controls?: boolean
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  isPaused?: boolean
}

export default function UploadedVideo({
  src,
  poster,
  title,
  className = '',
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  isPaused = false
}: UploadedVideoProps) {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false) // Toujours false par défaut pour avoir le son
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showCustomControls, setShowCustomControls] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Vérification de sécurité pour la source vidéo
  if (!src || typeof src !== 'string') {
    console.warn('UploadedVideo: Source vidéo invalide:', { src, type: typeof src, title })
    return (
      <div className={`bg-gray-200 flex items-center justify-center rounded-lg ${className}`}>
        <div className="text-gray-500 text-center p-4">
          <div className="text-2xl mb-2">⚠️</div>
          <div className="text-sm">Source vidéo invalide</div>
          <div className="text-xs text-gray-400 mt-1">Vérifiez les données de la vidéo</div>
        </div>
      </div>
    )
  }

  // Contrôler la pause/marche depuis l'extérieur
  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        // Essayer de reprendre seulement si l'utilisateur a interagi
        if (hasUserInteracted && !autoplayBlocked) {
          videoRef.current.play().catch(console.error)
        }
      }
    }
  }, [isPaused, hasUserInteracted, autoplayBlocked])

  // Vérifier si la source vidéo est valide
  const isValidVideoSource = (src: any) => {
    // Vérifier que src est une chaîne de caractères
    if (!src || typeof src !== 'string') return false
    
    const validExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi']
    const lowerSrc = src.toLowerCase()
    return validExtensions.some(ext => lowerSrc.includes(ext))
  }

  // Intersection Observer pour détecter quand la vidéo entre dans le viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInViewport(true)
            // Essayer l'autoplay seulement si l'utilisateur a déjà interagi et que la vidéo n'est pas en pause
            if (videoRef.current && !isPlaying && hasUserInteracted && !autoplayBlocked && !isPaused) {
              attemptAutoplay()
            }
          } else {
            setIsInViewport(false)
            // Mettre en pause quand elle sort du viewport
            if (videoRef.current && isPlaying) {
              videoRef.current.pause()
              setIsPlaying(false)
            }
          }
        })
      },
      {
        threshold: 0.3, // Déclencher quand 30% de la vidéo est visible
        rootMargin: '0px 0px -100px 0px' // Déclencher un peu avant
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [isPlaying, hasUserInteracted, autoplayBlocked, isPaused])

  // Fonction pour tenter l'autoplay
  const attemptAutoplay = async () => {
    if (!videoRef.current || isPaused) return
    
    try {
      // Essayer l'autoplay sans couper le son
      await videoRef.current.play()
      setIsPlaying(true)
      setAutoplayBlocked(false)
    } catch (error) {
      console.log('Autoplay bloqué par le navigateur:', error)
      setAutoplayBlocked(true)
    }
  }

  // Marquer que l'utilisateur a interagi
  const markUserInteraction = () => {
    setHasUserInteracted(true)
    setAutoplayBlocked(false)
  }

  // Gestion des erreurs
  const handleError = () => {
    console.error('Erreur de chargement vidéo:', src)
    setError(true)
    setIsLoading(false)
  }

  // Gestion du chargement
  const handleLoadStart = () => {
    setIsLoading(true)
    setError(false)
  }

  const handleLoadedData = () => {
    setIsLoading(false)
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  // Contrôles personnalisés
  const togglePlay = () => {
    markUserInteraction()
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(console.error)
      }
    }
  }

  const toggleMute = () => {
    markUserInteraction()
    if (videoRef.current) {
      const newMutedState = !isMuted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    markUserInteraction()
    if (videoRef.current) {
      const time = parseFloat(e.target.value)
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleFullscreen = () => {
    markUserInteraction()
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Gestion de la visibilité des contrôles
  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    const showControls = () => {
      setShowCustomControls(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setShowCustomControls(false), 3000)
    }

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', showControls)
      containerRef.current.addEventListener('touchstart', showControls)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', showControls)
        containerRef.current.removeEventListener('touchstart', showControls)
      }
      clearTimeout(timeout)
    }
  }, [])

  // Gestion de la fin de vidéo
  const handleVideoEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  // Vérifier la source vidéo
  if (!isValidVideoSource(src)) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center rounded-lg ${className}`}>
        <div className="text-gray-500 text-center p-4">
          <div className="text-2xl mb-2">🎥</div>
          <div className="text-sm">Format vidéo non supporté</div>
          <div className="text-xs text-gray-400 mt-1">Formats supportés: MP4, WebM, OGG</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center rounded-lg ${className}`}>
        <div className="text-gray-500 text-center p-4">
          <div className="text-2xl mb-2">❌</div>
          <div className="text-sm">Erreur de chargement vidéo</div>
          <div className="text-xs text-gray-400 mt-1">Vérifiez l'URL de la vidéo</div>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={`relative group rounded-lg overflow-hidden bg-black ${className}`}
    >
      {/* Vidéo */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-contain"
        onLoadStart={handleLoadStart}
        onLoadedData={handleLoadedData}
        onError={handleError}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleVideoEnded}
        onCanPlay={() => markUserInteraction()}
        playsInline
        preload="metadata"
        muted={false}
        loop={loop}
        controls={!controls}
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/webm" />
        <source src={src} type="video/ogg" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>

      {/* Indicateur de chargement */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-3"></div>
            <div className="text-sm">Chargement de la vidéo...</div>
          </div>
        </div>
      )}

      {/* Indicateur d'autoplay bloqué */}
      {!isLoading && !isPlaying && isInViewport && autoplayBlocked && !isPaused && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="bg-yellow-600 rounded-full p-4 mb-3">
              <Play className="w-8 h-8" />
            </div>
            <div className="text-sm font-medium">Cliquez pour lire</div>
            <div className="text-xs text-gray-300 mt-1">L'autoplay est bloqué par votre navigateur</div>
            <button
              onClick={togglePlay}
              className="mt-3 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Lire maintenant
            </button>
          </div>
        </div>
      )}

      {/* Indicateur d'autoplay en attente */}
      {!isLoading && !isPlaying && isInViewport && !autoplayBlocked && hasUserInteracted && !isPaused && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="bg-primary-600 rounded-full p-4 mb-3 animate-pulse">
              <Play className="w-8 h-8" />
            </div>
            <div className="text-sm font-medium">Lecture automatique</div>
            <div className="text-xs text-gray-300 mt-1">Faites défiler pour voir la vidéo</div>
          </div>
        </div>
      )}

      {/* Indicateur d'interaction requise */}
      {!isLoading && !isPlaying && isInViewport && !hasUserInteracted && !isPaused && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="bg-blue-600 rounded-full p-4 mb-3">
              <Play className="w-8 h-8" />
            </div>
            <div className="text-sm font-medium">Cliquez pour activer l'autoplay</div>
            <div className="text-xs text-gray-300 mt-1">Une interaction est requise pour la lecture automatique</div>
            <button
              onClick={togglePlay}
              className="mt-3 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Activer l'autoplay
            </button>
          </div>
        </div>
      )}

      {/* Contrôles personnalisés - seulement si showCustomControls est true */}
      {!isLoading && controls && (
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          showCustomControls ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Bouton play/pause central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm touch-manipulation"
              aria-label={isPlaying ? 'Pause' : 'Lecture'}
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </button>
          </div>

          {/* Barre de progression */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="space-y-2">
              {/* Barre de temps */}
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer touch-manipulation"
                  style={{
                    background: `linear-gradient(to right, white ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) ${(currentTime / (duration || 1)) * 100}%)`
                  }}
                />
                {/* Styles personnalisés pour la barre de progression */}
                <style jsx>{`
                  input[type="range"]::-webkit-slider-thumb {
                    appearance: none;
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                  }
                  input[type="range"]::-moz-range-thumb {
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                  }
                  input[type="range"]::-ms-thumb {
                    height: 16px;
                    width: 16px;
                    border-radius: 50%;
                    background: white;
                    cursor: pointer;
                  }
                `}</style>
              </div>
              
              {/* Contrôles inférieurs */}
              <div className="flex items-center justify-between text-white text-sm">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={togglePlay}
                    className="hover:bg-white/20 p-1 rounded transition-colors touch-manipulation"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={toggleMute}
                    className="hover:bg-white/20 p-1 rounded transition-colors touch-manipulation"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  
                  <span className="text-xs">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleFullscreen}
                    className="hover:bg-white/20 p-1 rounded transition-colors touch-manipulation"
                    aria-label="Plein écran"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Titre de la vidéo */}
      {title && (
        <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
          {title}
        </div>
      )}

      {/* Indicateur de lecture en cours */}
      {!isLoading && !error && (
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
          {isPlaying ? '▶️' : '⏸️'}
        </div>
      )}

      {/* Indicateur d'autoplay en bas */}
      {isInViewport && !isPlaying && hasUserInteracted && !autoplayBlocked && !isPaused && (
        <div className="absolute bottom-2 left-2 bg-primary-600 text-white px-2 py-1 rounded text-xs">
          🔄 Autoplay activé
        </div>
      )}

      {/* Indicateur d'interaction requise */}
      {isInViewport && !isPlaying && !hasUserInteracted && !isPaused && (
        <div className="absolute bottom-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs">
          ⚠️ Interaction requise
        </div>
      )}

      {/* Indicateur d'autoplay bloqué */}
      {isInViewport && !isPlaying && autoplayBlocked && !isPaused && (
        <div className="absolute bottom-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
          🚫 Autoplay bloqué
        </div>
      )}

      {/* Indicateur de pause forcée */}
      {isPaused && (
        <div className="absolute bottom-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs">
          ⏸️ En pause
        </div>
      )}
    </div>
  )
} 