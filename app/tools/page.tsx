import Link from 'next/link'
import { Image, FileText, Scissors, Compress } from 'lucide-react'

export default function ToolsPage() {
  const tools = [
    {
      id: 'photo-resizer',
      name: 'Passport Photo Resizer',
      description: 'Resize photos for passport, visa, PAN, and government jobs',
      icon: Image,
      href: '/tools/photo-resizer',
      color: 'primary',
    },
    {
      id: 'pdf-merge',
      name: 'PDF Merge',
      description: 'Merge multiple PDF files into one document',
      icon: FileText,
      href: '/tools/pdf-merge',
      color: 'green',
    },
    {
      id: 'pdf-split',
      name: 'PDF Split',
      description: 'Extract pages from PDF documents',
      icon: Scissors,
      href: '/tools/pdf-split',
      color: 'blue',
    },
    {
      id: 'pdf-compress',
      name: 'PDF Compress',
      description: 'Reduce PDF file size without losing quality',
      icon: Compress,
      href: '/tools/pdf-compress',
      color: 'purple',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Document Tools</h1>
          <p className="text-xl text-gray-600">
            Free online tools to help you with photos and PDFs
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon
            const colorClasses = {
              primary: 'bg-primary-100 text-primary-600',
              green: 'bg-green-100 text-green-600',
              blue: 'bg-blue-100 text-blue-600',
              purple: 'bg-purple-100 text-purple-600',
            }

            return (
              <Link
                key={tool.id}
                href={tool.href}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-primary-300"
              >
                <div className={`inline-block p-4 rounded-lg mb-4 ${colorClasses[tool.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </Link>
            )
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Tools Are Free</h2>
          <p className="text-gray-700">
            Use our document tools completely free. No registration required, no watermarks,
            no file size limits. Process your files instantly and download immediately.
          </p>
        </div>
      </div>
    </div>
  )
}

