'use client'

import { useTranslations } from 'next-intl'
import { Calendar, Users, FileText, Plus, Edit, Trash2, Settings, LogOut, Newspaper, BookOpen, Info } from 'lucide-react'
import Link from 'next/link'
import AdminProtected from '@/components/auth/AdminProtected'
import { useActivitiesStore } from '@/lib/activitiesStore'
import { useNewsStore } from '@/lib/newsStore'

interface AdminPageProps {
  params: { locale: string }
}

function AdminPageContent({ params: { locale } }: AdminPageProps) {
  // const t = useTranslations('admin') // Commenté car les traductions admin n'existent pas encore
  const { activities } = useActivitiesStore()
  const { news } = useNewsStore()

  const stats = [
    {
      title: 'Activités totales',
      value: activities.length.toString(),
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Actualités',
      value: news.length.toString(),
      icon: Newspaper,
      color: 'bg-purple-500'
    },
    {
      title: 'Participants',
      value: activities.reduce((total, activity) => total + parseInt(activity.participants || '0'), 0).toString(),
      icon: Users,
      color: 'bg-green-500'
    }
  ]

  const quickActions = [
    {
      title: 'Ajouter une activité',
      description: 'Créer une nouvelle activité avec médias',
      icon: Plus,
      href: `/${locale}/admin/activities/add`,
      color: 'bg-primary-600 hover:bg-primary-700'
    },
    {
      title: 'Gérer les activités',
      description: 'Modifier ou supprimer des activités',
      icon: Edit,
      href: `/${locale}/admin/activities`,
      color: 'bg-secondary-600 hover:bg-secondary-700'
    },
    {
      title: 'Nouvel article',
      description: 'Créer un nouvel article d\'actualité',
      icon: Plus,
      href: `/${locale}/admin/news/add`,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Gérer les actualités',
      description: 'Modifier ou supprimer des articles',
      icon: Newspaper,
      href: `/${locale}/admin/news`,
      color: 'bg-indigo-600 hover:bg-indigo-700'
    },
    {
      title: 'Gérer la page À propos',
      description: 'Modifier le contenu de la page À propos',
      icon: Info,
      href: `/${locale}/admin/about`,
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      title: 'Paramètres',
      description: 'Configurer le site',
      icon: Settings,
      href: `/${locale}/admin/settings`,
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
              <p className="text-gray-600 mt-1">Gérez votre site et vos activités</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Link
                  href={`/${locale}/admin/news`}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                  title="Gérer les actualités"
                >
                  <Newspaper className="w-4 h-4" />
                  <span>Actualités</span>
                </Link>
                <Link
                  href={`/${locale}/admin/activities`}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Gérer les activités"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Activités</span>
                </Link>
              </div>
              <span className="text-sm text-gray-500">Admin</span>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('adminAuthenticated')
                  window.location.href = `/${locale}/admin/login`
                }}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Se déconnecter"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${action.color} text-white`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activities and News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Activités récentes</h2>
            </div>
            <div className="p-6">
              {activities.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucune activité créée pour le moment.</p>
                  <Link
                    href={`/${locale}/admin/activities/add`}
                    className="inline-flex items-center mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une activité
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{activity.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(activity.date).toLocaleDateString('fr-FR')} • {activity.participants} participants
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                          activity.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {activity.status === 'completed' ? 'Terminé' :
                           activity.status === 'ongoing' ? 'En cours' :
                           'À venir'}
                        </span>
                        <Link
                          href={`/${locale}/admin/activities/edit/${activity.id}`}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent News */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Actualités récentes</h2>
            </div>
            <div className="p-6">
              {news.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucun article créé pour le moment.</p>
                  <Link
                    href={`/${locale}/admin/news/add`}
                    className="inline-flex items-center mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Créer un article
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {news.slice(0, 3).map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 line-clamp-1">{article.title}</h3>
                        <p className="text-sm text-gray-600">
                          {article.author} • {article.category}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('fr-FR') : 'Brouillon'}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          article.status === 'published' ? 'bg-green-100 text-green-800' :
                          article.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.status === 'published' ? 'Publié' :
                           article.status === 'archived' ? 'Archivé' :
                           'Brouillon'}
                        </span>
                        <Link
                          href={`/${locale}/admin/news/edit/${article.id}`}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage(props: AdminPageProps) {
  return (
    <AdminProtected locale={props.params.locale}>
      <AdminPageContent {...props} />
    </AdminProtected>
  )
} 