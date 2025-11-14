'use client'

import { useForm } from 'react-hook-form'
import { NOCLetter } from '@/types/forms'
import { Loader2 } from 'lucide-react'

interface Props {
  onSubmit: (data: NOCLetter) => void
  isSubmitting: boolean
}

export default function NOCLetterForm({ onSubmit, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NOCLetter>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Applicant Details */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Applicant Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700 mb-1">
              Applicant Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="applicantName"
              {...register('applicantName', { required: 'Name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.applicantName && (
              <p className="mt-1 text-sm text-red-600">{errors.applicantName.message}</p>
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

      {/* NOC Details */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">NOC Details</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="nocPurpose" className="block text-sm font-medium text-gray-700 mb-1">
              NOC Purpose <span className="text-red-500">*</span>
            </label>
            <select
              id="nocPurpose"
              {...register('nocPurpose', { required: 'NOC purpose is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select purpose</option>
              <option value="travel">Travel</option>
              <option value="employment">Employment</option>
              <option value="business">Business</option>
              <option value="school">School</option>
              <option value="other">Other</option>
            </select>
            {errors.nocPurpose && (
              <p className="mt-1 text-sm text-red-600">{errors.nocPurpose.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="toRecipient" className="block text-sm font-medium text-gray-700 mb-1">
              To (Recipient) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="toRecipient"
              {...register('toRecipient', { required: 'Recipient is required' })}
              placeholder="e.g., The Principal, ABC School"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.toRecipient && (
              <p className="mt-1 text-sm text-red-600">{errors.toRecipient.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason for NOC <span className="text-red-500">*</span>
            </label>
            <textarea
              id="reason"
              rows={5}
              {...register('reason', {
                required: 'Reason is required',
                minLength: {
                  value: 30,
                  message: 'Reason must be at least 30 characters',
                },
              })}
              placeholder="Please provide detailed reason for requesting the NOC..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.reason && (
              <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
            )}
          </div>
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

