'use client'

import { useForm } from 'react-hook-form'
import { BirthCertificate } from '@/types/forms'
import { Loader2 } from 'lucide-react'

interface Props {
  onSubmit: (data: BirthCertificate) => void
  isSubmitting: boolean
}

export default function BirthCertificateForm({ onSubmit, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BirthCertificate>()

  const placeOfBirth = watch('placeOfBirth')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Child Details */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Child Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">
              Child's Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="childName"
              {...register('childName', { required: "Child's name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.childName && (
              <p className="mt-1 text-sm text-red-600">{errors.childName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              {...register('gender', { required: 'Gender is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
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
            <label htmlFor="placeOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
              Place of Birth <span className="text-red-500">*</span>
            </label>
            <select
              id="placeOfBirth"
              {...register('placeOfBirth', { required: 'Place of birth is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select place</option>
              <option value="hospital">Hospital</option>
              <option value="home">Home</option>
            </select>
            {errors.placeOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.placeOfBirth.message}</p>
            )}
          </div>

          {placeOfBirth === 'hospital' && (
            <div className="md:col-span-2">
              <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700 mb-1">
                Hospital Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="hospitalName"
                {...register('hospitalName', {
                  required: placeOfBirth === 'hospital' ? 'Hospital name is required' : false,
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.hospitalName && (
                <p className="mt-1 text-sm text-red-600">{errors.hospitalName.message}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Parent Details */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Parent Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label htmlFor="fatherAge" className="block text-sm font-medium text-gray-700 mb-1">
              Father's Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="fatherAge"
              {...register('fatherAge', {
                required: "Father's age is required",
                min: 18,
                max: 100,
                valueAsNumber: true,
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.fatherAge && (
              <p className="mt-1 text-sm text-red-600">{errors.fatherAge.message}</p>
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
            <label htmlFor="motherAge" className="block text-sm font-medium text-gray-700 mb-1">
              Mother's Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="motherAge"
              {...register('motherAge', {
                required: "Mother's age is required",
                min: 18,
                max: 100,
                valueAsNumber: true,
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.motherAge && (
              <p className="mt-1 text-sm text-red-600">{errors.motherAge.message}</p>
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

