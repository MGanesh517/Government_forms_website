import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { FormData, FormId } from '@/types/forms'

/**
 * Enhanced PDF generator that fills actual PDF form templates
 * This replaces the basic PDF generator when templates are available
 */
export async function fillPDFTemplate(
  templateBuffer: ArrayBuffer,
  formId: FormId,
  formData: FormData,
  isPremium: boolean = false
): Promise<Uint8Array> {
  // Load the PDF template
  const pdfDoc = await PDFDocument.load(templateBuffer)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()

  // Get form fields mapping
  const fieldMapping = getFieldMapping(formId, formData)

  // Try to get form fields from the PDF
  const form = pdfDoc.getForm()
  const formFields = form.getFields()

  // Fill form fields if they exist
  for (const field of formFields) {
    const fieldName = field.getName()
    const mappedValue = fieldMapping[fieldName]

    if (mappedValue !== undefined) {
      try {
        if (field.constructor.name === 'PDFTextField') {
          form.getTextField(fieldName).setText(String(mappedValue))
        } else if (field.constructor.name === 'PDFCheckBox') {
          if (mappedValue) {
            form.getCheckBox(fieldName).check()
          }
        } else if (field.constructor.name === 'PDFDropdown') {
          form.getDropdown(fieldName).select(String(mappedValue))
        }
      } catch (error) {
        // If field doesn't exist or type mismatch, continue
        console.warn(`Could not fill field ${fieldName}:`, error)
      }
    }
  }

  // Flatten form to prevent further editing
  form.flatten()

  // Add watermark if not premium
  if (!isPremium) {
    const watermarkFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const watermarkText = 'FREE VERSION - FormEase.in'
    const watermarkSize = 24

    for (const page of pages) {
      const textWidth = watermarkFont.widthOfTextAtSize(watermarkText, watermarkSize)
      const textHeight = watermarkFont.heightAtSize(watermarkSize)

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

/**
 * Maps form data to PDF field names
 * Update this based on your actual PDF form field names
 */
function getFieldMapping(formId: FormId, formData: any): Record<string, string> {
  const mapping: Record<string, string> = {}

  switch (formId) {
    case 'aadhaar-address-update':
      mapping['applicantName'] = formData.applicantName || ''
      mapping['aadhaarNumber'] = formData.aadhaarNumber || ''
      mapping['mobileNumber'] = formData.mobileNumber || ''
      mapping['currentAddress'] = formData.currentAddress || ''
      mapping['currentPinCode'] = formData.currentPinCode || ''
      mapping['currentState'] = formData.currentState || ''
      mapping['currentDistrict'] = formData.currentDistrict || ''
      mapping['newAddress'] = formData.newAddress || ''
      mapping['newPinCode'] = formData.newPinCode || ''
      mapping['newState'] = formData.newState || ''
      mapping['newDistrict'] = formData.newDistrict || ''
      break

    case 'pan-correction':
      mapping['panNumber'] = formData.panNumber || ''
      mapping['fullName'] = formData.fullName || ''
      mapping['dateOfBirth'] = formData.dateOfBirth || ''
      mapping['fatherName'] = formData.fatherName || ''
      mapping['address'] = formData.address || ''
      mapping['pinCode'] = formData.pinCode || ''
      mapping['state'] = formData.state || ''
      mapping['district'] = formData.district || ''
      mapping['mobileNumber'] = formData.mobileNumber || ''
      mapping['correctionType'] = formData.correctionType || ''
      break

    // Add mappings for other forms as needed
    default:
      // Generic mapping - flatten object
      Object.keys(formData).forEach((key) => {
        if (typeof formData[key] === 'object' && formData[key] !== null) {
          mapping[key] = JSON.stringify(formData[key])
        } else {
          mapping[key] = String(formData[key] || '')
        }
      })
  }

  return mapping
}

