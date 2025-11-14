import { ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/lib/firebase/config'

/**
 * Utility to upload PDF templates to Firebase Storage
 * Use this script to upload blank PDF templates for each form
 */
export async function uploadTemplate(
  formId: string,
  templateFile: File | Blob
): Promise<string> {
  if (!storage) {
    throw new Error('Firebase Storage is not initialized')
  }

  const fileName = `${formId}.pdf`
  const storageRef = ref(storage, `templates/${fileName}`)

  try {
    await uploadBytes(storageRef, templateFile)
    return `templates/${fileName}`
  } catch (error) {
    console.error('Error uploading template:', error)
    throw error
  }
}

/**
 * Helper function to download template from URL and upload to Firebase
 */
export async function uploadTemplateFromURL(
  formId: string,
  templateURL: string
): Promise<string> {
  try {
    const response = await fetch(templateURL)
    const blob = await response.blob()
    return await uploadTemplate(formId, blob)
  } catch (error) {
    console.error('Error uploading template from URL:', error)
    throw error
  }
}

