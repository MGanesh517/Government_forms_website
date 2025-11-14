'use client'

import { useForm } from 'react-hook-form'
import { CasteCertificate } from '@/types/forms'
import { Loader2 } from 'lucide-react'

interface Props {
  onSubmit: (data: CasteCertificate) => void
  isSubmitting: boolean
}

export default function CasteCertificateForm({ onSubmit, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CasteCertificate>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Details */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
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
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              {...register('dateOfBirth', { required: 'Date of birth is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="age"
              {...register('age', { required: 'Age is required', min: 0, max: 120, valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-1">
              Father's Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fatherName"
              {...register('fatherName', { required: "Father's name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.fatherName && (
              <p className="mt-1 text-sm text-red-600">{errors.fatherName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="motherName" className="block text-sm font-medium text-gray-700 mb-1">
              Mother's Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="motherName"
              {...register('motherName', { required: "Mother's name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.motherName && (
              <p className="mt-1 text-sm text-red-600">{errors.motherName.message}</p>
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

      {/* Caste Details */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Caste Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="caste" className="block text-sm font-medium text-gray-700 mb-1">
              Caste <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="caste"
              {...register('caste', { required: 'Caste is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.caste && (
              <p className="mt-1 text-sm text-red-600">{errors.caste.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="religion" className="block text-sm font-medium text-gray-700 mb-1">
              Religion <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="religion"
              {...register('religion', { required: 'Religion is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.religion && (
              <p className="mt-1 text-sm text-red-600">{errors.religion.message}</p>
            )}
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="state"
                {...register('state', { required: 'State is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="district"
                {...register('district', { required: 'District is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.district && (
                <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tehsil" className="block text-sm font-medium text-gray-700 mb-1">
                Tehsil/Taluk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="tehsil"
                {...register('tehsil', { required: 'Tehsil is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.tehsil && (
                <p className="mt-1 text-sm text-red-600">{errors.tehsil.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-1">
                Village <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="village"
                {...register('village', { required: 'Village is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.village && (
                <p className="mt-1 text-sm text-red-600">{errors.village.message}</p>
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

