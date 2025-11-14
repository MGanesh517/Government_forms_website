import Link from 'next/link'
import { FileText, CheckCircle, Zap, Shield, Download } from 'lucide-react'
import { getAllForms, getFormsByCategory } from '@/lib/forms/form-metadata'

export default function HomePage() {
  const popularForms = getAllForms().slice(0, 6)
  const certificateForms = getFormsByCategory('certificate').slice(0, 3)
  const correctionForms = getFormsByCategory('correction').slice(0, 3)
  const tools = getFormsByCategory('tool').slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Fill Government Forms in Minutes
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Auto-fill, download, and submit. No more manual form filling hassles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/forms"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
              >
                Get Started
                <Zap className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/guides"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center"
              >
                View Guides
                <FileText className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FormEase?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Zap className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Fill forms in 2 minutes instead of hours</p>
            </div>
            <div className="text-center p-6">
              <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your data is safe and never stored permanently</p>
            </div>
            <div className="text-center p-6">
              <Download className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
              <p className="text-gray-600">Get ready-to-submit PDFs instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Forms Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Forms</h2>
            <Link href="/forms" className="text-primary-600 hover:text-primary-700 font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularForms.map((form) => (
              <Link
                key={form.id}
                href={`/forms/${form.id}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{form.name}</h3>
                  <FileText className="h-6 w-6 text-primary-600 flex-shrink-0 ml-2" />
                </div>
                <p className="text-gray-600 mb-4">{form.description}</p>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {form.category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Certificate Forms */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Certificates</h3>
              <ul className="space-y-2">
                {certificateForms.map((form) => (
                  <li key={form.id}>
                    <Link
                      href={`/forms/${form.id}`}
                      className="text-gray-600 hover:text-primary-600 transition-colors flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-2 text-primary-600" />
                      {form.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Correction Forms */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Corrections</h3>
              <ul className="space-y-2">
                {correctionForms.map((form) => (
                  <li key={form.id}>
                    <Link
                      href={`/forms/${form.id}`}
                      className="text-gray-600 hover:text-primary-600 transition-colors flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-2 text-primary-600" />
                      {form.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Tools</h3>
              <ul className="space-y-2">
                {tools.map((form) => (
                  <li key={form.id}>
                    <Link
                      href={`/tools/${form.id}`}
                      className="text-gray-600 hover:text-primary-600 transition-colors flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-2 text-primary-600" />
                      {form.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Fill your first form in under 2 minutes
          </p>
          <Link
            href="/forms"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center"
          >
            Browse All Forms
            <FileText className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

