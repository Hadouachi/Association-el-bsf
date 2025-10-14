'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useNewsStore } from '@/lib/newsStore'
import { Plus, Edit, Eye, Trash2, Calendar, User, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { News } from '@/lib/newsStore'
import AdminNav from '@/components/admin/AdminNav'
import UploadedImage from '@/components/ui/UploadedImage'

export default function NewsListPage() {
  const router = useRouter()
  const { news, fetchNews, deleteNews } = useNewsStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      try {
        await fetchNews()
      } catch (error) {
        console.error('Erreur lors du chargement des actualités:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadNews()
  }, [fetchNews])

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      try {
        await deleteNews(id)
        console.log('Actualité supprimée avec succès')
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        alert('Erreur lors de la suppression de l\'actualité')
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Publié'
      case 'draft': return 'Brouillon'
      case 'archived': return 'Archivé'
      default: return status
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Programme': 'bg-blue-100 text-blue-800',
      'Événement': 'bg-green-100 text-green-800',
      'Formation': 'bg-purple-100 text-purple-800',
      'Partenariat': 'bg-orange-100 text-orange-800',
      'Général': 'bg-gray-100 text-gray-800'
    }
    return colors[category] || colors['Général']
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des actualités...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <AdminNav locale="fr" currentPage="news" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des actualités</h1>
              <p className="text-gray-600 mt-2">Créez et gérez les articles d'actualité</p>
            </div>
            <Link
              href="/fr/admin/news/add"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvel article
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ImageIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{news.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Publiés</p>
                <p className="text-2xl font-bold text-gray-900">
                  {news.filter(n => n.status === 'published').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Edit className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Brouillons</p>
                <p className="text-2xl font-bold text-gray-900">
                  {news.filter(n => n.status === 'draft').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Archivés</p>
                <p className="text-2xl font-bold text-gray-900">
                  {news.filter(n => n.status === 'archived').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* News List */}
        <div className="bg-white shadow rounded-lg">
          {news.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune actualité</h3>
              <p className="text-gray-500 mb-6">Commencez par créer votre premier article.</p>
              <Link
                href="/fr/admin/news/add"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Créer un article
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Article
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Auteur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Catégorie
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {news.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {article.image && (
                            <div className="flex-shrink-0 h-12 w-12">
                              <UploadedImage
                                src={article.image}
                                alt={article.title}
                                width={48}
                                height={48}
                                className="h-12 w-12 rounded-lg object-cover"
                              />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                              {article.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {article.excerpt || 'Aucun résumé'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{article.author}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(article.status)}`}>
                          {getStatusText(article.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('fr-FR') : 'Non publié'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            href={`/fr/news/${article.id}`}
                            className="flex items-center px-2 py-1 text-xs text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Voir
                          </Link>
                          <Link
                            href={`/fr/admin/news/edit/${article.id}`}
                            className="flex items-center px-2 py-1 text-xs text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Modifier
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="flex items-center px-2 py-1 text-xs text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
