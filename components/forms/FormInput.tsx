'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormId } from '@/types/forms'
import AadhaarAddressUpdateForm from './form-types/AadhaarAddressUpdateForm'
import PANCorrectionForm from './form-types/PANCorrectionForm'
import IncomeCertificateForm from './form-types/IncomeCertificateForm'
import CasteCertificateForm from './form-types/CasteCertificateForm'
import BirthCertificateForm from './form-types/BirthCertificateForm'
import BankKYCForm from './form-types/BankKYCForm'
import SelfDeclarationForm from './form-types/SelfDeclarationForm'
import NOCLetterForm from './form-types/NOCLetterForm'
import RationCardCorrectionForm from './form-types/RationCardCorrectionForm'
import { Loader2 } from 'lucide-react'

interface FormInputProps {
  formId: FormId
}

export default function FormInput({ formId }: FormInputProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      // Call API to generate PDF
      const response = await fetch('/api/forms/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId,
          formData: data,
          isPremium: false,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      const result = await response.json()
      setPreviewUrl(result.downloadLink)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderForm = () => {
    switch (formId) {
      case 'aadhaar-address-update':
        return <AadhaarAddressUpdateForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      case 'pan-correction':
        return <PANCorrectionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      case 'income-certificate':
        return <IncomeCertificateForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      case 'caste-certificate':
        return <CasteCertificateForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      case 'birth-certificate':
        return <BirthCertificateForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      case 'bank-kyc':
        return <BankKYCForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      case 'self-declaration':
        return <SelfDeclarationForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      case 'noc-letter':
        return <NOCLetterForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      case 'ration-card-correction':
        return <RationCardCorrectionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-600">Form component coming soon</p>
          </div>
        )
    }
  }

  return (
    <div>
      {previewUrl ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-900 mb-2">PDF Generated Successfully!</h3>
            <p className="text-green-700 mb-4">Your form has been filled and is ready to download.</p>
            <div className="flex space-x-4">
              <a
                href={previewUrl}
                download
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center"
              >
                Download Free (Watermarked)
              </a>
              <a
                href={`/forms/${formId}/premium`}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
              >
                Upgrade to Premium (₹10)
              </a>
            </div>
          </div>
          <iframe
            src={previewUrl}
            className="w-full h-screen border border-gray-300 rounded-lg"
            title="PDF Preview"
          />
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fill Form Details</h2>
          {renderForm()}
        </div>
      )}
    </div>
  )
}

