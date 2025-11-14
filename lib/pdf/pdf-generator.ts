import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { FormData, FormId } from '@/types/forms'

export async function generatePDF(formId: FormId, formData: FormData, isPremium: boolean = false): Promise<Uint8Array> {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create()

  // Add a page
  const page = pdfDoc.addPage([612, 792]) // US Letter size
  const { width, height } = page.getSize()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontSize = 12

  let yPosition = height - 50
  let currentFormData: any = formData

  // Add title
  page.drawText(`${getFormTitle(formId)}`, {
    x: 50,
    y: yPosition,
    size: 18,
    font,
    color: rgb(0, 0, 0),
  })

  yPosition -= 40

  // Add form data
  const formFields = getFormFields(formId, currentFormData)

  for (const field of formFields) {
    if (yPosition < 50) {
      // Add new page if needed
      const newPage = pdfDoc.addPage([612, 792])
      yPosition = newPage.getSize().height - 50
      continue
    }

    page.drawText(`${field.label}:`, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    })

    page.drawText(`${field.value}`, {
      x: 200,
      y: yPosition,
      size: fontSize,
      font,
      color: rgb(0.2, 0.2, 0.2),
    })

    yPosition -= 25
  }

  // Add watermark if not premium
  if (!isPremium) {
    const watermarkFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const watermarkText = 'FREE VERSION - FormEase.in'
    const watermarkSize = 30
    const textWidth = watermarkFont.widthOfTextAtSize(watermarkText, watermarkSize)
    const textHeight = watermarkFont.heightAtSize(watermarkSize)

    // Rotate and position watermark
    const pages = pdfDoc.getPages()
    for (const page of pages) {
      page.drawText(watermarkText, {
        x: (page.getWidth() - textWidth) / 2,
        y: (page.getHeight() - textHeight) / 2,
        size: watermarkSize,
        font: watermarkFont,
        color: rgb(0.9, 0.9, 0.9),
        rotate: { angleInRadians: Math.PI / 4 } as any,
        opacity: 0.3,
      })
    }
  }

  // Serialize PDF
  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}

function getFormTitle(formId: FormId): string {
  const titles: Record<FormId, string> = {
    'aadhaar-address-update': 'Aadhaar Address Update Form',
    'pan-correction': 'PAN Correction Form',
    'income-certificate': 'Income Certificate Application',
    'caste-certificate': 'Caste Certificate Application',
    'birth-certificate': 'Birth Certificate Application',
    'bank-kyc': 'Bank KYC Form',
    'self-declaration': 'Self Declaration Form',
    'noc-letter': 'NOC Letter',
    'passport-photo-resize': 'Passport Size Photo',
    'ration-card-correction': 'Ration Card Correction Form',
  }
  return titles[formId] || 'Government Form'
}

function getFormFields(formId: FormId, formData: any): Array<{ label: string; value: string }> {
  const fields: Array<{ label: string; value: string }> = []

  switch (formId) {
    case 'aadhaar-address-update':
      fields.push(
        { label: 'Applicant Name', value: formData.applicantName || '' },
        { label: 'Aadhaar Number', value: formData.aadhaarNumber || '' },
        { label: 'Mobile Number', value: formData.mobileNumber || '' },
        { label: 'Email', value: formData.email || 'N/A' },
        { label: 'Current Address', value: formData.currentAddress || '' },
        { label: 'Current PIN Code', value: formData.currentPinCode || '' },
        { label: 'Current State', value: formData.currentState || '' },
        { label: 'Current District', value: formData.currentDistrict || '' },
        { label: 'New Address', value: formData.newAddress || '' },
        { label: 'New PIN Code', value: formData.newPinCode || '' },
        { label: 'New State', value: formData.newState || '' },
        { label: 'New District', value: formData.newDistrict || '' }
      )
      break

    case 'pan-correction':
      fields.push(
        { label: 'PAN Number', value: formData.panNumber || '' },
        { label: 'Full Name', value: formData.fullName || '' },
        { label: 'Date of Birth', value: formData.dateOfBirth || '' },
        { label: "Father's Name", value: formData.fatherName || '' },
        { label: 'Correction Type', value: formData.correctionType || '' },
        { label: 'Address', value: formData.address || '' },
        { label: 'PIN Code', value: formData.pinCode || '' },
        { label: 'State', value: formData.state || '' },
        { label: 'District', value: formData.district || '' },
        { label: 'Mobile Number', value: formData.mobileNumber || '' }
      )
      break

    default:
      // Generic handling for other forms
      Object.keys(formData).forEach((key) => {
        if (typeof formData[key] === 'object' && formData[key] !== null) {
          fields.push({ label: formatLabel(key), value: JSON.stringify(formData[key]) })
        } else {
          fields.push({ label: formatLabel(key), value: String(formData[key] || '') })
        }
      })
  }

  return fields
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}

