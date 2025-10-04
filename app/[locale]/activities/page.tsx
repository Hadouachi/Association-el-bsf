'use client'

import { useEffect } from 'react'
import { useActivitiesStore } from '@/lib/activitiesStore'
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function ActivitiesPage() {
  const locale = useLocale()
  const { activities, isLoading, error, fetchActivities } = useActivitiesStore()

  useEffect(() => {
    fetchActivities()
  }, [fetchActivities])

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des activités...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">⚠️ Erreur de chargement</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => fetchActivities()}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section avec Image de Couverture */}
      <div className="relative h-96">
        {/* Image de couverture sur toute la largeur */}
        <img
          src="/images/activities-hero.png"
          alt="Nos Activités"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Contenu du hero */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Activités</h1>
            <p className="text-xl text-primary-100">
              Découvrez nos activités éducatives et spirituelles
            </p>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune activité pour le moment
            </h3>
            <p className="text-gray-600">
              Les activités seront bientôt disponibles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Cover Image */}
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  {activity.coverImage ? (
                    <img
                      src={activity.coverImage}
                      alt={activity.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <div className="text-primary-600 text-4xl">📷</div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {activity.title}
                  </h3>
                  
                  {/* Status badge */}
                  <div className="mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {getStatusText(activity.status)}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(activity.date).toLocaleDateString('fr-FR')}
                  </div>

                  {activity.time && (
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Clock className="w-4 h-4 mr-2" />
                      {activity.time}
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    {activity.location}
                  </div>

                  {activity.participants && (
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Users className="w-4 h-4 mr-1" />
                      {activity.participants} participants
                    </div>
                  )}

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {activity.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <Link
                      href={`/${locale}/activities/${activity.id}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Plus de détails
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 