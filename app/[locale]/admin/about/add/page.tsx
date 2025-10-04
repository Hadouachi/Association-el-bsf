'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAboutStore } from '@/lib/aboutStore'
import AdminNav from '@/components/admin/AdminNav'
import { ArrowLeft, Upload, X } from 'lucide-react'
import Link from 'next/link'

interface AddAboutPageProps {
  params: { locale: string }
}

export default function AddAboutPage({ params: { locale } }: AddAboutPageProps) {
  const router = useRouter()
  const { createAboutContent, isLoading } = useAboutStore()
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    coverImage: '',
    status: 'draft' as 'draft' | 'published'
  })
  
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload')
      }

      const data = await response.json()
      setFormData(prev => ({
        ...prev,
        coverImage: data.url
      }))
      setCoverImagePreview(data.url)
    } catch (error) {
      console.error('Erreur upload:', error)
      alert('Erreur lors de l\'upload de l\'image')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('Le titre est requis')
      return
    }

    try {
      await createAboutContent(formData)
      router.push(`/${locale}/admin/about`)
    } catch (error) {
      console.error('Erreur création:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav locale={locale} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={`/${locale}/admin/about`}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Nouveau contenu À propos</h1>
              <p className="text-gray-600 mt-2">Créez un nouveau contenu pour la page À propos</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Informations générales</h3>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Titre de la page À propos"
                  required
                />
              </div>

              {/* Subtitle */}
              <div>
                <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Sous-titre
                </label>
                <input
                  type="text"
                  id="subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Sous-titre (optionnel)"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Description de l'association..."
                />
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Image de couverture</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {/* Upload Button */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image de couverture
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Choisir une image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageUpload}
                        className="hidden"
                      />
                    </label>
                    {formData.coverImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, coverImage: '' }))
                          setCoverImagePreview(null)
                        }}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        Supprimer
                      </button>
                    )}
                  </div>
                </div>

                {/* Image Preview */}
                {coverImagePreview && (
                  <div className="mt-4">
                    <img
                      src={coverImagePreview}
                      alt="Aperçu"
                      className="w-full h-64 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link
              href={`/${locale}/admin/about`}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Création...' : 'Créer le contenu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
