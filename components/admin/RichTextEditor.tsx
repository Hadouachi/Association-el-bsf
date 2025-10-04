'use client'

import { useState, useRef, useEffect } from 'react'
import { Bold, Italic, List, ListOrdered, Quote, Link, Image, Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export default function RichTextEditor({ value, onChange, placeholder = "Rédigez votre contenu...", rows = 12 }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    
    onChange(newText)
    
    // Restaurer la position du curseur
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const insertLine = (prefix: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const lines = value.substring(0, start).split('\n')
    const currentLine = lines.length - 1
    const lineStart = value.lastIndexOf('\n', start - 1) + 1
    const lineEnd = value.indexOf('\n', start)
    const currentLineText = value.substring(lineStart, lineEnd === -1 ? value.length : lineEnd)
    
    const newLine = prefix + currentLineText
    const newText = value.substring(0, lineStart) + newLine + value.substring(lineEnd === -1 ? value.length : lineEnd)
    
    onChange(newText)
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, start + prefix.length)
    }, 0)
  }

  const toolbarButtons = [
    {
      icon: Bold,
      title: 'Gras',
      action: () => insertText('**', '**')
    },
    {
      icon: Italic,
      title: 'Italique',
      action: () => insertText('*', '*')
    },
    {
      icon: Type,
      title: 'Titre',
      action: () => insertLine('# ')
    },
    {
      icon: List,
      title: 'Liste à puces',
      action: () => insertLine('- ')
    },
    {
      icon: ListOrdered,
      title: 'Liste numérotée',
      action: () => insertLine('1. ')
    },
    {
      icon: Quote,
      title: 'Citation',
      action: () => insertLine('> ')
    },
    {
      icon: Link,
      title: 'Lien',
      action: () => insertText('[Texte du lien](', ')')
    }
  ]

  return (
    <div className={`border rounded-lg transition-colors ${isFocused ? 'border-primary-500 ring-1 ring-primary-500' : 'border-gray-300'}`}>
      {/* Toolbar */}
      <div className="flex items-center space-x-1 p-2 border-b bg-gray-50 rounded-t-lg">
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={button.action}
            title={button.title}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
          >
            <button.icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 border-0 rounded-b-lg focus:outline-none resize-none"
        style={{ minHeight: `${rows * 1.5}rem` }}
      />

      {/* Help text */}
      <div className="px-3 py-2 text-xs text-gray-500 bg-gray-50 border-t">
        <div className="flex flex-wrap gap-4">
          <span><strong>**gras**</strong> pour le texte en gras</span>
          <span><em>*italique*</em> pour le texte en italique</span>
          <span><strong>#</strong> pour les titres</span>
          <span><strong>-</strong> pour les listes</span>
        </div>
      </div>
    </div>
  )
}
