'use client'

import { useEffect } from 'react'
import { useAboutStore } from '@/lib/aboutStore'
import AdminNav from '@/components/admin/AdminNav'
import { Edit, Eye, Trash2, Plus } from 'lucide-react'
import Link from 'next/link'

interface AdminAboutPageProps {
  params: { locale: string }
}

export default function AdminAboutPage({ params: { locale } }: AdminAboutPageProps) {
  const { aboutContent, isLoading, error, fetchAboutContent, deleteAboutContent } = useAboutStore()

  useEffect(() => {
    fetchAboutContent()
  }, [fetchAboutContent])

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contenu À propos ?')) {
      await deleteAboutContent(id)
      fetchAboutContent() // Recharger la liste
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNav locale={locale} />
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNav locale={locale} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Erreur: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav locale={locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion de la page À propos</h1>
              <p className="text-gray-600 mt-2">Gérez le contenu de la page À propos</p>
            </div>
            <Link
              href={`/${locale}/admin/about/add`}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nouveau contenu
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Contenu publié</p>
                <p className="text-2xl font-bold text-gray-900">
                  {aboutContent?.status === 'published' ? '1' : '0'}
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
                  {aboutContent?.status === 'draft' ? '1' : '0'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Plus className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {aboutContent ? '1' : '0'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Contenu À propos</h3>
          </div>
          
          {aboutContent ? (
            <div className="divide-y divide-gray-200">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-medium text-gray-900">
                        {aboutContent.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        aboutContent.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {aboutContent.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </div>
                    {aboutContent.subtitle && (
                      <p className="text-gray-600 mt-1">{aboutContent.subtitle}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      Mis à jour le {new Date(aboutContent.updatedAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/${locale}/about`}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Voir"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/${locale}/admin/about/edit/${aboutContent.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Modifier"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(aboutContent.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 text-lg">Aucun contenu À propos trouvé</p>
              <Link
                href={`/${locale}/admin/about/add`}
                className="btn-primary mt-4 inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Créer le premier contenu
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}