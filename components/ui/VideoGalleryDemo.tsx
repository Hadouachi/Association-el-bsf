'use client'

import VideoGallery from './VideoGallery'

// Données de démonstration avec les vraies vidéos du projet
const demoVideos = [
  {
    id: 'video-1',
    src: '/videos/activities/video1.mp4',
    poster: '/videos/activities/poster1.png',
    title: 'Vidéo de présentation',
    description: 'Découvrez notre activité en action - première partie'
  },
  {
    id: 'video-2',
    src: '/videos/activities/video2.mp4',
    poster: '/videos/activities/poster2.png',
    title: 'Témoignages et retours',
    description: 'Ce que disent nos participants et leurs expériences'
  },
  {
    id: 'video-3',
    src: '/videos/activities/video3.mp4',
    poster: '/videos/activities/poster3.png',
    title: 'Bilan et résultats',
    description: 'Résultats obtenus et perspectives d\'avenir'
  },
  {
    id: 'video-4',
    src: '/videos/activities/video4.mp4',
    poster: '/videos/activities/poster4.png',
    title: 'Conclusion et remerciements',
    description: 'Fin de l\'activité et remerciements à tous'
  }
]

export default function VideoGalleryDemo() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          🎥 Galerie Vidéo Interactive - Test de Pause
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Test de la pause et du son :</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• <strong>Cliquez sur la vidéo</strong> pour la mettre en pause</li>
              <li>• <strong>Cliquez à nouveau</strong> pour reprendre la lecture</li>
              <li>• <strong>Vérifiez que le son est actif</strong> par défaut</li>
              <li>• <strong>Utilisez le bouton volume</strong> pour couper/remettre le son</li>
            </ul>
          </div>
          
          <VideoGallery videos={demoVideos} />
        </div>
      </div>
    </div>
  )
}
