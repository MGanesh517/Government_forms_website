import Link from 'next/link'
import { FileText, Search } from 'lucide-react'
import { getAllForms, getFormsByCategory } from '@/lib/forms/form-metadata'

export default function FormsPage() {
  const allForms = getAllForms()
  const certificateForms = getFormsByCategory('certificate')
  const correctionForms = getFormsByCategory('correction')
  const applicationForms = getFormsByCategory('application')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Government Forms</h1>
          <p className="text-xl text-gray-600">
            Select a form to get started. Fill it online and download instantly.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search forms..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Certificate Forms */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Certificate Forms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificateForms.map((form) => (
              <Link
                key={form.id}
                href={`/forms/${form.id}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-primary-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <FileText className="h-8 w-8 text-primary-600 flex-shrink-0 mr-4" />
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                    Certificate
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{form.name}</h3>
                <p className="text-gray-600 text-sm">{form.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Correction Forms */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Correction Forms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {correctionForms.map((form) => (
              <Link
                key={form.id}
                href={`/forms/${form.id}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-primary-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <FileText className="h-8 w-8 text-primary-600 flex-shrink-0 mr-4" />
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                    Correction
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{form.name}</h3>
                <p className="text-gray-600 text-sm">{form.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Application Forms */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Forms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicationForms.map((form) => (
              <Link
                key={form.id}
                href={`/forms/${form.id}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-primary-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <FileText className="h-8 w-8 text-primary-600 flex-shrink-0 mr-4" />
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    Application
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{form.name}</h3>
                <p className="text-gray-600 text-sm">{form.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

