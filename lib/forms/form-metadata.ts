import { FormMetadata, FormId } from '@/types/forms';

export const FORM_METADATA: Record<FormId, FormMetadata> = {
  'aadhaar-address-update': {
    id: 'aadhaar-address-update',
    name: 'Aadhaar Address Update',
    description: 'Update your Aadhaar card address online',
    category: 'correction',
    popularity: 100,
  },
  'pan-correction': {
    id: 'pan-correction',
    name: 'PAN Correction Form',
    description: 'Correct your PAN card details',
    category: 'correction',
    popularity: 95,
  },
  'income-certificate': {
    id: 'income-certificate',
    name: 'Income Certificate Application',
    description: 'Apply for income certificate',
    category: 'certificate',
    popularity: 90,
  },
  'caste-certificate': {
    id: 'caste-certificate',
    name: 'Caste Certificate Application',
    description: 'Apply for caste certificate',
    category: 'certificate',
    popularity: 85,
  },
  'birth-certificate': {
    id: 'birth-certificate',
    name: 'Birth Certificate Application',
    description: 'Apply for birth certificate',
    category: 'certificate',
    popularity: 80,
  },
  'bank-kyc': {
    id: 'bank-kyc',
    name: 'Bank KYC Form',
    description: 'Complete bank KYC online',
    category: 'application',
    popularity: 75,
  },
  'self-declaration': {
    id: 'self-declaration',
    name: 'Self Declaration Form',
    description: 'Generate self declaration letter',
    category: 'application',
    popularity: 70,
  },
  'noc-letter': {
    id: 'noc-letter',
    name: 'NOC Letter Generator',
    description: 'Generate No Objection Certificate',
    category: 'application',
    popularity: 65,
  },
  'passport-photo-resize': {
    id: 'passport-photo-resize',
    name: 'Passport Size Photo Resize',
    description: 'Resize photos for passport, PAN, visa',
    category: 'tool',
    popularity: 100,
  },
  'ration-card-correction': {
    id: 'ration-card-correction',
    name: 'Ration Card Correction Form',
    description: 'Correct ration card details',
    category: 'correction',
    popularity: 60,
  },
};

export const getFormMetadata = (formId: FormId): FormMetadata => {
  return FORM_METADATA[formId];
};

export const getAllForms = (): FormMetadata[] => {
  return Object.values(FORM_METADATA);
};

export const getFormsByCategory = (category: FormMetadata['category']): FormMetadata[] => {
  return Object.values(FORM_METADATA).filter(form => form.category === category);
};

