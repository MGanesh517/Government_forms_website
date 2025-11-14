/**
 * Script to upload PDF templates to Firebase Storage
 * 
 * Usage:
 * 1. Place PDF templates in ./templates/ folder with names matching form IDs
 * 2. Run: npx tsx scripts/upload-templates.ts
 * 
 * Templates needed:
 * - aadhaar-address-update.pdf
 * - pan-correction.pdf
 * - income-certificate.pdf
 * - caste-certificate.pdf
 * - birth-certificate.pdf
 * - bank-kyc.pdf
 * - self-declaration.pdf
 * - noc-letter.pdf
 * - ration-card-correction.pdf
 */

import * as admin from 'firebase-admin'
import * as fs from 'fs'
import * as path from 'path'

// Initialize Firebase Admin (use service account)
if (!admin.apps.length) {
  const serviceAccount = require('../serviceAccountKey.json')
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  })
}

const bucket = admin.storage().bucket()
const templatesDir = path.join(process.cwd(), 'templates')

const formIds = [
  'aadhaar-address-update',
  'pan-correction',
  'income-certificate',
  'caste-certificate',
  'birth-certificate',
  'bank-kyc',
  'self-declaration',
  'noc-letter',
  'ration-card-correction',
]

async function uploadTemplate(formId: string) {
  const templatePath = path.join(templatesDir, `${formId}.pdf`)
  
  if (!fs.existsSync(templatePath)) {
    console.log(`⚠️  Template not found: ${formId}.pdf`)
    return
  }

  const fileName = `templates/${formId}.pdf`
  const file = bucket.file(fileName)

  try {
    await bucket.upload(templatePath, {
      destination: fileName,
      metadata: {
        contentType: 'application/pdf',
        cacheControl: 'public, max-age=31536000',
      },
    })

    // Make file publicly accessible
    await file.makePublic()

    console.log(`✅ Uploaded: ${formId}.pdf`)
  } catch (error) {
    console.error(`❌ Error uploading ${formId}.pdf:`, error)
  }
}

async function uploadAllTemplates() {
  console.log('Starting template upload...\n')

  for (const formId of formIds) {
    await uploadTemplate(formId)
  }

  console.log('\n✅ Template upload completed!')
  process.exit(0)
}

uploadAllTemplates().catch(console.error)

