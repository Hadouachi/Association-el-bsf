'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Video, File, Trash2 } from 'lucide-react'

interface FileUploadProps {
  onFilesChange: (files: File[]) => void
  acceptedTypes?: string
  multiple?: boolean
  maxFiles?: number
  label: string
  placeholder?: string
}

export default function FileUpload({
  onFilesChange,
  acceptedTypes = 'image/*,video/*',
  multiple = true,
  maxFiles = 10,
  label,
  placeholder = 'Glissez vos fichiers ici ou cliquez pour sélectionner'
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles = Array.from(selectedFiles).filter(file => {
      // Vérifier le type de fichier
      if (acceptedTypes.includes('image/*') && file.type.startsWith('image/')) return true
      if (acceptedTypes.includes('video/*') && file.type.startsWith('video/')) return true
      return false
    })

    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles
    const limitedFiles = updatedFiles.slice(0, maxFiles)
    
    setFiles(limitedFiles)
    onFilesChange(limitedFiles)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <ImageIcon className="w-6 h-6" />
    if (file.type.startsWith('video/')) return <Video className="w-6 h-6" />
    return <File className="w-6 h-6" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {/* Zone d'upload */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        
        <div className="space-y-2">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="text-sm text-gray-600">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Cliquez pour sélectionner
            </button>
            {' '}ou glissez-déposez
          </div>
          <p className="text-xs text-gray-500">{placeholder}</p>
          <p className="text-xs text-gray-500">
            Types acceptés: {acceptedTypes === 'image/*,video/*' ? 'Images et vidéos' : acceptedTypes}
            {maxFiles > 1 && ` • Max ${maxFiles} fichiers`}
          </p>
        </div>
      </div>

      {/* Liste des fichiers */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Fichiers sélectionnés ({files.length})</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-gray-500">
                    {getFileIcon(file)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 