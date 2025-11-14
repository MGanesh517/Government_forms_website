import { Mail, MessageSquare, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-primary-50 p-6 rounded-lg">
              <Mail className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700">contact@formease.in</p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <Clock className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Response Time</h3>
              <p className="text-gray-700">Within 24-48 hours</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <MessageSquare className="h-6 w-6 mr-2 text-primary-600" />
              Get in Touch
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Have questions, feedback, or need help? We'd love to hear from you. Send us an
              email and we'll get back to you as soon as possible.
            </p>
            <a
              href="mailto:contact@formease.in"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

