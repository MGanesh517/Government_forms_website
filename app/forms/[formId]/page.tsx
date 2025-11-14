import { notFound } from 'next/navigation'
import { getFormMetadata, FormId } from '@/lib/forms/form-metadata'
import FormInput from '@/components/forms/FormInput'
import Link from 'next/link'
import { ArrowLeft, FileText, Info } from 'lucide-react'

interface FormPageProps {
  params: {
    formId: string
  }
}

export async function generateMetadata({ params }: FormPageProps) {
  const formId = params.formId as FormId
  const form = getFormMetadata(formId)

  if (!form) {
    return {
      title: 'Form Not Found',
    }
  }

  return {
    title: `${form.name} - FormEase`,
    description: form.description,
  }
}

export default function FormPage({ params }: FormPageProps) {
  const formId = params.formId as FormId
  const form = getFormMetadata(formId)

  if (!form) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          href="/forms"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Forms
        </Link>

        {/* Form Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-primary-100 p-3 rounded-lg">
              <FileText className="h-8 w-8 text-primary-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{form.name}</h1>
              <p className="text-gray-600 mb-4">{form.description}</p>
              <div className="flex items-center space-x-4">
                <Link
                  href={`/guides/${formId}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  <Info className="h-4 w-4 mr-2" />
                  View Complete Guide
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Form Input Component */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <FormInput formId={formId} />
        </div>
      </div>
    </div>
  )
}

