'use client'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const renderMarkdown = (text: string) => {
    // Convertir les retours à la ligne en <br>
    let html = text.replace(/\n/g, '<br>')
    
    // Titres
    html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-4 mt-6">$1</h1>')
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mb-3 mt-5">$1</h2>')
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-gray-900 mb-2 mt-4">$1</h3>')
    
    // Gras
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
    
    // Italique
    html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    
    // Listes à puces
    html = html.replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">$1</li>')
    html = html.replace(/(<li class="ml-4 mb-1">.*<\/li>)/g, '<ul class="list-disc list-inside mb-4">$1</ul>')
    
    // Listes numérotées
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 mb-1">$1</li>')
    html = html.replace(/(<li class="ml-4 mb-1">.*<\/li>)/g, '<ol class="list-decimal list-inside mb-4">$1</ol>')
    
    // Citations
    html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4">$1</blockquote>')
    
    // Liens
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:text-primary-700 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Paragraphes
    html = html.replace(/<br><br>/g, '</p><p class="mb-4">')
    html = '<p class="mb-4">' + html + '</p>'
    
    return html
  }

  return (
    <div 
      className={`prose prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  )
}
