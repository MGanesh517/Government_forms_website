// Form types and interfaces

export type FormId = 
  | 'aadhaar-address-update'
  | 'pan-correction'
  | 'income-certificate'
  | 'caste-certificate'
  | 'birth-certificate'
  | 'bank-kyc'
  | 'self-declaration'
  | 'noc-letter'
  | 'passport-photo-resize'
  | 'ration-card-correction';

export interface FormMetadata {
  id: FormId;
  name: string;
  description: string;
  category: 'certificate' | 'correction' | 'application' | 'tool';
  icon?: string;
  popularity?: number;
}

// Aadhaar Address Update
export interface AadhaarAddressUpdate {
  applicantName: string;
  aadhaarNumber: string;
  mobileNumber: string;
  email?: string;
  currentAddress: string;
  currentPinCode: string;
  currentState: string;
  currentDistrict: string;
  newAddress: string;
  newPinCode: string;
  newState: string;
  newDistrict: string;
  proofOfAddress?: string;
}

// PAN Correction
export interface PANCorrection {
  panNumber: string;
  fullName: string;
  dateOfBirth: string;
  fatherName: string;
  address: string;
  pinCode: string;
  state: string;
  district: string;
  correctionType: 'name' | 'dob' | 'address' | 'father-name';
  mobileNumber: string;
}

// Income Certificate
export interface IncomeCertificate {
  applicantName: string;
  fatherHusbandName: string;
  age: number;
  address: string;
  pinCode: string;
  state: string;
  district: string;
  tehsil?: string;
  annualIncome: number;
  occupation: string;
  familyMembers: Array<{
    name: string;
    age: number;
    relationship: string;
  }>;
  mobileNumber: string;
}

// Caste Certificate
export interface CasteCertificate {
  applicantName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  age: number;
  address: string;
  pinCode: string;
  state: string;
  district: string;
  tehsil: string;
  village: string;
  caste: string;
  religion: string;
  mobileNumber: string;
}

// Birth Certificate
export interface BirthCertificate {
  childName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  placeOfBirth: 'hospital' | 'home';
  hospitalName?: string;
  fatherName: string;
  motherName: string;
  fatherAge: number;
  motherAge: number;
  address: string;
  pinCode: string;
  state: string;
  district: string;
  mobileNumber: string;
}

// Bank KYC
export interface BankKYC {
  fullName: string;
  dateOfBirth: string;
  panNumber: string;
  aadhaarNumber: string;
  currentAddress: string;
  permanentAddress: string;
  currentPinCode: string;
  permanentPinCode: string;
  occupation: string;
  annualIncome: number;
  nomineeName?: string;
  nomineeRelationship?: string;
  mobileNumber: string;
  email: string;
}

// Self Declaration
export interface SelfDeclaration {
  name: string;
  address: string;
  pinCode: string;
  declarationType: 'employment' | 'education' | 'business' | 'other';
  declarationStatement: string;
  date: string;
  signature?: string;
}

// NOC Letter
export interface NOCLetter {
  applicantName: string;
  address: string;
  pinCode: string;
  nocPurpose: 'travel' | 'employment' | 'business' | 'school' | 'other';
  date: string;
  toRecipient: string;
  reason: string;
}

// Passport Photo Resize
export interface PassportPhotoResize {
  photo: File | string;
  size: 'passport' | 'visa' | 'pan' | 'govt-job';
  backgroundColor: 'white' | 'blue';
}

// Ration Card Correction
export interface RationCardCorrection {
  rationCardNumber: string;
  headOfFamilyName: string;
  correctionType: 'name' | 'address' | 'members';
  currentDetails: string;
  correctedDetails: string;
  address: string;
  pinCode: string;
  mobileNumber: string;
}

// Union type for all form data
export type FormData = 
  | AadhaarAddressUpdate
  | PANCorrection
  | IncomeCertificate
  | CasteCertificate
  | BirthCertificate
  | BankKYC
  | SelfDeclaration
  | NOCLetter
  | PassportPhotoResize
  | RationCardCorrection;

export interface FormSubmission {
  id: string;
  formId: FormId;
  formData: FormData;
  userId?: string;
  createdAt: Date;
  downloadLink?: string;
  isPremium: boolean;
  paymentId?: string;
  expiresAt: Date;
}

