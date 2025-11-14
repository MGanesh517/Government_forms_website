import { notFound } from 'next/navigation'
import { getFormMetadata, FormId } from '@/lib/forms/form-metadata'
import Link from 'next/link'
import { ArrowLeft, FileText, CheckCircle, Clock, DollarSign, MapPin } from 'lucide-react'

interface GuidePageProps {
  params: {
    formId: string
  }
}

export async function generateMetadata({ params }: GuidePageProps) {
  const formId = params.formId as FormId
  const form = getFormMetadata(formId)

  if (!form) {
    return {
      title: 'Guide Not Found',
    }
  }

  return {
    title: `How to Fill ${form.name} - Complete Guide | FormEase`,
    description: `Complete guide to fill ${form.name}. Learn about required documents, eligibility, where to submit, fees, and step-by-step process.`,
  }
}

export default function GuidePage({ params }: GuidePageProps) {
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
          href="/guides"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Guides
        </Link>

        {/* Guide Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-primary-100 p-4 rounded-lg">
              <FileText className="h-10 w-10 text-primary-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Complete Guide: {form.name}
              </h1>
              <p className="text-gray-600 mb-6">{form.description}</p>
              <Link
                href={`/forms/${formId}`}
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Fill Form Now →
              </Link>
            </div>
          </div>
        </div>

        {/* Guide Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              This guide will walk you through everything you need to know about filling and
              submitting the {form.name}. We'll cover required documents, eligibility criteria,
              where to submit, processing time, fees, and provide a step-by-step process.
            </p>
          </section>

          {/* Required Documents */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
              Required Documents
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Identity proof (Aadhaar, PAN, or Voter ID)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Address proof (Aadhaar, Utility Bill, or Bank Statement)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Passport size photographs (2-4 copies)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Birth certificate (if applicable)</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              <strong>Note:</strong> Document requirements may vary by state. Check your state
              government website for specific requirements.
            </p>
          </section>

          {/* Eligibility Criteria */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Must be an Indian citizen</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Age: 18 years and above (for most forms)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Resident of the state where applying</span>
              </li>
            </ul>
          </section>

          {/* Where to Submit */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-primary-600" />
              Where to Submit
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Online Submission</h3>
                <p className="text-gray-700">
                  Most forms can be submitted online through your state government portal or
                  the relevant department website. Check the official government website for
                  the online submission link.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Offline Submission</h3>
                <p className="text-gray-700">
                  You can also submit forms at the nearest Tehsil office, District Collector
                  office, or Common Service Centre (CSC). Locate your nearest office using
                  the state government website.
                </p>
              </div>
            </div>
          </section>

          {/* Processing Time */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="h-6 w-6 mr-2 text-primary-600" />
              Processing Time
            </h2>
            <p className="text-gray-700">
              Typically, the processing time for {form.name} ranges from{' '}
              <strong>7 to 30 days</strong> depending on your state and the type of certificate.
              You can track the status of your application online through the government portal
              using your application reference number.
            </p>
          </section>

          {/* Fees */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <DollarSign className="h-6 w-6 mr-2 text-primary-600" />
              Fees
            </h2>
            <p className="text-gray-700 mb-4">
              Application fees vary by state, typically ranging from <strong>₹0 to ₹500</strong>.
              Some certificates are free for BPL (Below Poverty Line) families. Check your state
              government website for the exact fee structure.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Payment methods:</strong> Online payment (UPI, Debit/Credit Card, Net Banking),
              or cash at the office counter.
            </p>
          </section>

          {/* Step-by-Step Process */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Process</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Gather Required Documents</h3>
                  <p className="text-gray-700">
                    Collect all necessary documents mentioned above. Ensure they are self-attested
                    and recent (not older than 3 months).
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Fill the Form</h3>
                  <p className="text-gray-700">
                    Use our auto-fill tool to fill the form online, or download the PDF and fill
                    it manually. Double-check all information before submitting.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Attach Documents</h3>
                  <p className="text-gray-700">
                    Attach all required documents with the form. Make sure documents are clear
                    and readable.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Submit the Form</h3>
                  <p className="text-gray-700">
                    Submit online through the government portal or visit the nearest office.
                    Keep a copy of the application and receipt for future reference.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Track Status</h3>
                  <p className="text-gray-700">
                    Use your application reference number to track the status online. You'll
                    receive SMS/email updates on your registered mobile number.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How long does it take to process the application?
                </h3>
                <p className="text-gray-700">
                  Processing time typically ranges from 7 to 30 days depending on your state
                  and the type of certificate. You can track the status online.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I apply online?
                </h3>
                <p className="text-gray-700">
                  Yes, most states allow online submission through their government portals.
                  Check your state government website for online application options.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  What if my application is rejected?
                </h3>
                <p className="text-gray-700">
                  If your application is rejected, you'll receive a reason for rejection.
                  You can reapply with corrected documents or missing information.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is the certificate valid across all states?
                </h3>
                <p className="text-gray-700">
                  Certificates issued by one state are generally accepted across India, but
                  some states may require attestation. Check with the receiving authority.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary-600 text-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Fill Your Form?</h2>
            <p className="text-xl mb-6 text-primary-100">
              Use our auto-fill tool to generate your form in minutes
            </p>
            <Link
              href={`/forms/${formId}`}
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Fill Form Now →
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}

