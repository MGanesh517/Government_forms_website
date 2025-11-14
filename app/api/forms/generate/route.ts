import { NextRequest, NextResponse } from 'next/server'
import { generatePDF } from '@/lib/pdf/pdf-generator'
import { fillPDFTemplate } from '@/lib/pdf/pdf-template-filler'
import { FormId } from '@/types/forms'
import { ref, uploadBytes, getDownloadURL, getBlob } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db, storage } from '@/lib/firebase/config'
import { sendDownloadLinkEmail } from '@/lib/email/email-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formId, formData, isPremium, email } = body

    if (!formId || !formData) {
      return NextResponse.json(
        { error: 'Form ID and form data are required' },
        { status: 400 }
      )
    }

    let pdfBytes: Uint8Array

    // Try to load template from Firebase Storage
    if (storage) {
      try {
        const templateRef = ref(storage, `templates/${formId}.pdf`)
        const templateBlob = await getBlob(templateRef)
        const templateBuffer = await templateBlob.arrayBuffer()
        
        // Fill the actual PDF template
        pdfBytes = await fillPDFTemplate(
          templateBuffer,
          formId as FormId,
          formData,
          isPremium || false
        )
      } catch (templateError) {
        // Template not found, use basic PDF generator
        console.log(`Template not found for ${formId}, using basic generator`)
        pdfBytes = await generatePDF(formId as FormId, formData, isPremium || false)
      }
    } else {
      // No storage, use basic generator
      pdfBytes = await generatePDF(formId as FormId, formData, isPremium || false)
    }

    // Upload to Firebase Storage
    if (!storage) {
      return NextResponse.json(
        { error: 'Storage not initialized' },
        { status: 500 }
      )
    }

    const fileName = `${formId}-${Date.now()}.pdf`
    const storageRef = ref(storage, `generated/${fileName}`)
    
    await uploadBytes(storageRef, pdfBytes)
    const downloadURL = await getDownloadURL(storageRef)

    // Save submission to Firestore
    if (db) {
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 7) // 7 days expiry

      await addDoc(collection(db, 'form_submissions'), {
        formId,
        formData,
        isPremium: isPremium || false,
        downloadLink: downloadURL,
        createdAt: serverTimestamp(),
        expiresAt: expiresAt.toISOString(),
        email: email || null,
      })
    }

    // Send email notification if email provided
    if (email) {
      try {
        const formName = formId.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
        
        await sendDownloadLinkEmail(
          email,
          formName,
          downloadURL,
          isPremium || false
        )
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      downloadLink: downloadURL,
      fileName,
    })
  } catch (error: any) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error.message },
      { status: 500 }
    )
  }
}
