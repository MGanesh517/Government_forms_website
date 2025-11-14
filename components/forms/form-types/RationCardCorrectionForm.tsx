'use client'

import { useForm } from 'react-hook-form'
import { RationCardCorrection } from '@/types/forms'
import { Loader2 } from 'lucide-react'

interface Props {
  onSubmit: (data: RationCardCorrection) => void
  isSubmitting: boolean
}

export default function RationCardCorrectionForm({ onSubmit, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RationCardCorrection>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Ration Card Details */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ration Card Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="rationCardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Ration Card Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="rationCardNumber"
              {...register('rationCardNumber', { required: 'Ration card number is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.rationCardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.rationCardNumber.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="headOfFamilyName" className="block text-sm font-medium text-gray-700 mb-1">
              Head of Family Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="headOfFamilyName"
              {...register('headOfFamilyName', { required: 'Head of family name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.headOfFamilyName && (
              <p className="mt-1 text-sm text-red-600">{errors.headOfFamilyName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="correctionType" className="block text-sm font-medium text-gray-700 mb-1">
              Correction Type <span className="text-red-500">*</span>
            </label>
            <select
              id="correctionType"
              {...register('correctionType', { required: 'Correction type is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select correction type</option>
              <option value="name">Name</option>
              <option value="address">Address</option>
              <option value="members">Family Members</option>
            </select>
            {errors.correctionType && (
              <p className="mt-1 text-sm text-red-600">{errors.correctionType.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Current Details */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Details</h3>
        <div>
          <label htmlFor="currentDetails" className="block text-sm font-medium text-gray-700 mb-1">
            Current Details <span className="text-red-500">*</span>
          </label>
          <textarea
            id="currentDetails"
            rows={3}
            {...register('currentDetails', { required: 'Current details are required' })}
            placeholder="Enter current information that needs correction"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.currentDetails && (
            <p className="mt-1 text-sm text-red-600">{errors.currentDetails.message}</p>
          )}
        </div>
      </div>

      {/* Corrected Details */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Corrected Details</h3>
        <div>
          <label htmlFor="correctedDetails" className="block text-sm font-medium text-gray-700 mb-1">
            Corrected Details <span className="text-red-500">*</span>
          </label>
          <textarea
            id="correctedDetails"
            rows={3}
            {...register('correctedDetails', { required: 'Corrected details are required' })}
            placeholder="Enter the correct information"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.correctedDetails && (
            <p className="mt-1 text-sm text-red-600">{errors.correctedDetails.message}</p>
          )}
        </div>
      </div>

      {/* Address Details */}
      <div className="pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Details</h3>
        <div className="space-y-4">
          <div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="mobileNumber"
                {...register('mobileNumber', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Mobile number must be 10 digits',
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.mobileNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>
              )}
            </div>
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

