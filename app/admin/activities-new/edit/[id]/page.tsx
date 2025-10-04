'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function RedirectToLocalizedEditPage() {
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    // Rediriger automatiquement vers la version localisée
    router.replace(`/fr/admin/activities-new/edit/${params.id}`)
  }, [router, params.id])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirection vers la page d'édition localisée...</p>
      </div>
    </div>
  )
}


