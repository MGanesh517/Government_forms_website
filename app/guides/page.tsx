import Link from 'next/link'
import { FileText, BookOpen } from 'lucide-react'
import { getAllForms } from '@/lib/forms/form-metadata'

export default function GuidesPage() {
  const allForms = getAllForms()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-primary-100 p-3 rounded-full mb-4">
            <BookOpen className="h-12 w-12 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Guides</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Step-by-step guides to help you fill and submit government forms correctly
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allForms.map((form) => (
            <Link
              key={form.id}
              href={`/guides/${form.id}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-primary-300"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{form.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{form.description}</p>
                  <span className="inline-block text-primary-600 text-sm font-medium">
                    Read Guide →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-primary-50 border border-primary-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-700 mb-6">
            Our guides cover everything you need to know: required documents, eligibility,
            where to submit, processing time, fees, and step-by-step instructions.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

