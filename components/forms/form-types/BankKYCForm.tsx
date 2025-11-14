'use client'

import { useForm } from 'react-hook-form'
import { BankKYC } from '@/types/forms'
import { Loader2 } from 'lucide-react'

interface Props {
  onSubmit: (data: BankKYC) => void
  isSubmitting: boolean
}

export default function BankKYCForm({ onSubmit, isSubmitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BankKYC>()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Details */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              {...register('fullName', { required: 'Full name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
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
            <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1">
              PAN Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="panNumber"
              {...register('panNumber', {
                required: 'PAN number is required',
                pattern: {
                  value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                  message: 'Invalid PAN format (e.g., ABCDE1234F)',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent uppercase"
            />
            {errors.panNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.panNumber.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Aadhaar Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="aadhaarNumber"
              {...register('aadhaarNumber', {
                required: 'Aadhaar number is required',
                pattern: {
                  value: /^\d{12}$/,
                  message: 'Aadhaar number must be 12 digits',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.aadhaarNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.aadhaarNumber.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
              Occupation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="occupation"
              {...register('occupation', { required: 'Occupation is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.occupation && (
              <p className="mt-1 text-sm text-red-600">{errors.occupation.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-1">
              Annual Income (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="annualIncome"
              {...register('annualIncome', { required: 'Annual income is required', min: 0, valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.annualIncome && (
              <p className="mt-1 text-sm text-red-600">{errors.annualIncome.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Address</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="currentAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="currentAddress"
              rows={3}
              {...register('currentAddress', { required: 'Current address is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.currentAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.currentAddress.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="currentPinCode" className="block text-sm font-medium text-gray-700 mb-1">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="currentPinCode"
              {...register('currentPinCode', {
                required: 'PIN code is required',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'PIN code must be 6 digits',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.currentPinCode && (
              <p className="mt-1 text-sm text-red-600">{errors.currentPinCode.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Permanent Address */}
      <div className="border-b border-gray-200 pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Permanent Address</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="permanentAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="permanentAddress"
              rows={3}
              {...register('permanentAddress', { required: 'Permanent address is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.permanentAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.permanentAddress.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="permanentPinCode" className="block text-sm font-medium text-gray-700 mb-1">
              PIN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="permanentPinCode"
              {...register('permanentPinCode', {
                required: 'PIN code is required',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'PIN code must be 6 digits',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.permanentPinCode && (
              <p className="mt-1 text-sm text-red-600">{errors.permanentPinCode.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact & Nominee */}
      <div className="pb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact & Nominee Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="nomineeName" className="block text-sm font-medium text-gray-700 mb-1">
              Nominee Name
            </label>
            <input
              type="text"
              id="nomineeName"
              {...register('nomineeName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="nomineeRelationship" className="block text-sm font-medium text-gray-700 mb-1">
              Nominee Relationship
            </label>
            <input
              type="text"
              id="nomineeRelationship"
              {...register('nomineeRelationship')}
              placeholder="e.g., Spouse, Father, Mother"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
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

