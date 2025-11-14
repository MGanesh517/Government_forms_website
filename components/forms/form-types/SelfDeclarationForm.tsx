'use client'

import { useForm } from 'react-hook-form'
import { SelfDeclaration } from '@/types/forms'
import { Loader2 } from 'lucide-react'

interface Props {
  onSubmit: (data: SelfDeclaration) => void
  isSubmitting: boolean
}

export default function SelfDeclarationForm({ onSubmit, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SelfDeclaration>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Details */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              {...register('date', { required: 'Date is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              rows={3}
              {...register('address', { required: 'Address is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="pinCode"
              {...register('pinCode', {
                required: 'PIN code is required',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'PIN code must be 6 digits',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.pinCode && (
              <p className="mt-1 text-sm text-red-600">{errors.pinCode.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Declaration Details */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Declaration Details</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="declarationType" className="block text-sm font-medium text-gray-700 mb-1">
              Declaration Type <span className="text-red-500">*</span>
            </label>
            <select
              id="declarationType"
              {...register('declarationType', { required: 'Declaration type is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select declaration type</option>
              <option value="employment">Employment</option>
              <option value="education">Education</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>
            {errors.declarationType && (
              <p className="mt-1 text-sm text-red-600">{errors.declarationType.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="declarationStatement" className="block text-sm font-medium text-gray-700 mb-1">
              Declaration Statement <span className="text-red-500">*</span>
            </label>
            <textarea
              id="declarationStatement"
              rows={6}
              {...register('declarationStatement', {
                required: 'Declaration statement is required',
                minLength: {
                  value: 50,
                  message: 'Declaration statement must be at least 50 characters',
                },
              })}
              placeholder="I hereby declare that..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.declarationStatement && (
              <p className="mt-1 text-sm text-red-600">{errors.declarationStatement.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Signature</h3>
        <div>
          <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-1">
            Digital Signature (Optional)
          </label>
          <input
            type="text"
            id="signature"
            {...register('signature')}
            placeholder="Your name for digital signature"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <p className="mt-1 text-sm text-gray-500">
            You can sign the document manually after printing
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Generating PDF...
            </>
          ) : (
            'Generate PDF'
          )}
        </button>
      </div>
    </form>
  )
}

