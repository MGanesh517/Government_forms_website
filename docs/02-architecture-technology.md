# Architecture & Technology Stack

## Complete Technical Architecture for Government Form Auto-Fill & PDF Generator

---

## 1. TECHNOLOGY STACK DECISION

### Frontend Framework

**Recommended: Next.js (React-based)**

**Why Next.js?**
- ✅ Best SEO capabilities (Server-Side Rendering)
- ✅ Fast page loads (static generation)
- ✅ Great for content-heavy sites (guides)
- ✅ API routes built-in
- ✅ Image optimization
- ✅ Perfect for Indian market (SEO = traffic = money)

**Alternative: Flutter Web**
- ⚠️ Weaker SEO
- ⚠️ Less mature for web
- ✅ Good if you plan mobile app later
- ❌ Not recommended for SEO-focused project

**Final Choice: Next.js 14+ (App Router)**

---

### Backend Solution

**Recommended: Firebase (Backend-as-a-Service)**

**Why Firebase?**
- ✅ Zero server maintenance
- ✅ Free tier generous for starting
- ✅ Auto-scales as you grow
- ✅ Built-in authentication
- ✅ Real-time database (Firestore)
- ✅ Cloud Storage for PDFs
- ✅ Cloud Functions for server-side logic
- ✅ Perfect for MVP and beyond

**Firebase Services Used:**
1. **Firebase Auth** - User authentication (optional, can be anonymous)
2. **Firestore** - Database (user data, form submissions, downloads, payments)
3. **Cloud Storage** - Store PDF templates and generated PDFs
4. **Cloud Functions** - PDF generation logic, payment webhooks

**Alternative Backend Options:**
- Node.js + Express (more control, more maintenance)
- Supabase (PostgreSQL-based, similar to Firebase)
- AWS Amplify (more complex, better for enterprise)

---

### PDF Generation Technology

**Primary: pdf-lib (Node.js library)**

**Why pdf-lib?**
- ✅ Fills PDF forms programmatically
- ✅ Can add text, images, watermarks
- ✅ Works with existing PDF templates
- ✅ Good documentation
- ✅ Fast performance

**Libraries to Use:**
- `pdf-lib` - Main PDF manipulation
- `canvas` - For image processing (photo resize)
- `jspdf` - Alternative for client-side generation (if needed)

**PDF Workflow:**
1. Upload blank PDF templates to Firebase Storage
2. Download template when user submits form
3. Use pdf-lib to fill fields with user data
4. Add watermark for free version
5. Upload generated PDF to Firebase Storage
6. Generate temporary download link (7-day expiry)
7. Return download link to user

---

### Payment Gateway

**Primary: Razorpay**

**Why Razorpay?**
- ✅ India-focused, widely accepted
- ✅ UPI integration (instant payments)
- ✅ Easy integration
- ✅ Good documentation
- ✅ Supports multiple payment methods (Card/UPI/Wallet/Net Banking)
- ✅ Low transaction fees (~2%)

**Integration Flow:**
1. User clicks "Premium Download"
2. Create Razorpay order (₹10)
3. User redirected to Razorpay checkout
4. After payment success, Razorpay webhook called
5. Verify payment signature
6. Generate premium PDF (no watermark)
7. Send download link to user

**Alternative: Paytm Payment Gateway**
- Similar features
- Also India-focused
- Consider as backup option

---

## 2. ARCHITECTURE OVERVIEW

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER (Browser)                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages/     │  │   API        │  │   Static     │      │
│  │   Components │  │   Routes     │  │   Content    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                │                    │              │
└─────────┼────────────────┼────────────────────┼──────────────┘
          │                │                    │
          ▼                ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    FIREBASE BACKEND                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Firestore  │  │   Storage    │  │   Functions  │      │
│  │   (Database) │  │   (PDFs)     │  │   (Logic)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                │                    │              │
└─────────┼────────────────┼────────────────────┼──────────────┘
          │                │                    │
          ▼                ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Razorpay   │  │   Google     │  │   Email      │      │
│  │   Payment    │  │   Analytics  │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. DETAILED COMPONENT ARCHITECTURE

### 3.1 Frontend Architecture (Next.js)

**Folder Structure:**
```
/
├── app/                      # Next.js 14 App Router
│   ├── (home)/              # Home route group
│   │   ├── page.tsx         # Landing page
│   │   └── layout.tsx
│   ├── forms/               # Form pages
│   │   ├── [formId]/
│   │   │   ├── page.tsx     # Form input page
│   │   │   └── preview/     # Preview page
│   ├── guides/              # Guide pages
│   │   ├── [formId]/
│   │   │   └── page.tsx     # Guide content
│   ├── tools/               # Tool pages
│   │   ├── photo-resizer/
│   │   ├── pdf-merge/
│   │   └── ...
│   ├── dashboard/           # User dashboard
│   ├── api/                 # API routes
│   │   ├── forms/
│   │   │   ├── generate/    # PDF generation
│   │   │   └── download/    # Download link
│   │   ├── payment/
│   │   │   ├── create-order/
│   │   │   └── webhook/     # Razorpay webhook
│   │   └── tools/
│   └── layout.tsx
├── components/              # React components
│   ├── forms/
│   ├── tools/
│   ├── ui/                  # Reusable UI components
│   └── layout/
├── lib/                     # Utilities
│   ├── firebase/
│   ├── pdf/
│   ├── payment/
│   └── utils/
├── public/                  # Static assets
│   ├── templates/           # PDF templates (reference)
│   └── images/
└── styles/                  # Global styles
```

**Key Components:**
- `FormInputPage` - Form field collection
- `FormPreview` - PDF preview before download
- `PaymentModal` - Razorpay integration
- `ToolInterface` - Photo/PDF tools UI
- `GuideContent` - Guide page content renderer

---

### 3.2 Backend Architecture (Firebase)

#### Firestore Database Structure

**Collections:**

```
users (optional - for dashboard users)
├── {userId}
    ├── email: string
    ├── name: string
    ├── phone: string
    └── createdAt: timestamp

form_submissions
├── {submissionId}
    ├── formId: string (e.g., "aadhaar-address-update")
    ├── userId: string (optional, can be anonymous)
    ├── formData: object (user inputs)
    ├── createdAt: timestamp
    ├── downloadLink: string (Firebase Storage URL)
    ├── isPremium: boolean
    ├── paymentId: string (if premium)
    └── expiresAt: timestamp (7 days from creation)

payments
├── {paymentId}
    ├── razorpayOrderId: string
    ├── razorpayPaymentId: string
    ├── amount: number (10)
    ├── formId: string
    ├── submissionId: string
    ├── userId: string (optional)
    ├── status: string ("pending"/"success"/"failed")
    ├── createdAt: timestamp
    └── verifiedAt: timestamp

analytics
├── daily_stats
    ├── {date}
        ├── totalDownloads: number
        ├── premiumDownloads: number
        ├── revenue: number
        ├── formStats: object
        └── traffic: object
```

#### Firebase Storage Structure

```
storage/
├── templates/               # Blank PDF templates
│   ├── aadhaar-address-update.pdf
│   ├── pan-correction.pdf
│   └── ...
├── generated/               # User-generated PDFs
│   ├── {submissionId}/
│   │   ├── free.pdf        # With watermark
│   │   └── premium.pdf     # Without watermark
└── watermarks/              # Watermark images
    └── watermark.png
```

#### Cloud Functions

**Functions:**

1. **generatePDF**
   - Trigger: HTTP request from Next.js API
   - Input: formId, formData, isPremium
   - Process:
     - Download PDF template from Storage
     - Fill fields using pdf-lib
     - Add watermark if free version
     - Upload to Storage
     - Generate signed URL (7-day expiry)
     - Save submission to Firestore
   - Output: downloadLink, submissionId

2. **handlePaymentWebhook**
   - Trigger: Razorpay webhook
   - Process:
     - Verify payment signature
     - Update payment record
     - Generate premium PDF
     - Send email with download link
   - Output: Success/failure response

3. **cleanupExpiredPDFs**
   - Trigger: Scheduled (daily cron)
   - Process:
     - Find expired submissions (>7 days)
     - Delete PDFs from Storage
     - Archive submission records

---

## 4. DATA FLOW DIAGRAMS

### 4.1 Free PDF Download Flow

```
User fills form
    ↓
Next.js sends formData to API route
    ↓
API route calls Firebase Function (generatePDF)
    ↓
Function downloads template from Storage
    ↓
Function fills PDF with pdf-lib (adds watermark)
    ↓
Function uploads PDF to Storage
    ↓
Function saves submission to Firestore
    ↓
Function returns downloadLink to API route
    ↓
Next.js displays preview + download button
    ↓
User clicks download → Gets PDF via signed URL
```

### 4.2 Premium PDF Download Flow

```
User fills form → Clicks "Premium Download"
    ↓
Next.js API creates Razorpay order
    ↓
User redirected to Razorpay checkout
    ↓
User completes payment (UPI/Card/etc.)
    ↓
Razorpay sends webhook to Firebase Function
    ↓
Function verifies payment signature
    ↓
Function generates premium PDF (no watermark)
    ↓
Function updates payment record in Firestore
    ↓
Function sends email with download link
    ↓
User receives email + can download from dashboard
```

---

## 5. TECHNOLOGY STACK SUMMARY

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui or Headless UI
- **Form Handling:** React Hook Form
- **State Management:** Zustand or React Context
- **Image Processing:** Canvas API (client-side)

### Backend
- **Platform:** Firebase
- **Database:** Firestore
- **Storage:** Firebase Storage
- **Functions:** Firebase Cloud Functions (Node.js)
- **Auth:** Firebase Auth (optional)

### PDF Processing
- **Library:** pdf-lib
- **Server-side:** Cloud Functions
- **Image Processing:** Sharp (Node.js, for photo resize)

### Payment
- **Gateway:** Razorpay
- **Webhook Handling:** Cloud Functions

### Analytics
- **Web Analytics:** Google Analytics 4
- **Search Console:** Google Search Console
- **Ad Revenue:** Google AdSense

### Additional Tools
- **Email:** SendGrid or Firebase Extensions
- **Monitoring:** Firebase Performance Monitoring
- **Error Tracking:** Sentry (optional)

---

## 6. HOSTING & DEPLOYMENT

### Frontend Hosting
**Recommended: Vercel**
- ✅ Made by Next.js creators
- ✅ Zero-config deployment
- ✅ Free tier
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments

**Alternative: Netlify**
- Similar features
- Also excellent for Next.js

### Backend Hosting
**Firebase Hosting** (for static assets)
- Integrated with Firebase ecosystem
- Free tier generous

**Cloud Functions** (deployed via Firebase CLI)
- Automatic scaling
- Pay-as-you-go pricing

---

## 7. SECURITY CONSIDERATIONS

### Data Security
- No permanent storage of sensitive data (unless user opts in)
- Data encrypted in transit (HTTPS)
- Data encrypted at rest (Firebase default)
- Temporary download links (7-day expiry)
- User data deleted after expiry (optional)

### Payment Security
- Razorpay handles PCI compliance
- Payment signatures verified server-side
- No card data stored locally
- Secure webhook verification

### API Security
- Rate limiting on API routes
- CORS configuration
- Input validation (client + server)
- XSS protection (Next.js built-in)
- CSRF protection

---

## 8. SCALABILITY CONSIDERATIONS

### Firebase Auto-Scaling
- Firestore: Handles millions of reads/writes
- Storage: Unlimited capacity
- Functions: Auto-scales based on traffic
- No infrastructure management needed

### Frontend Optimization
- Static generation for guide pages (fast loading)
- Image optimization (Next.js Image component)
- Lazy loading for components
- Code splitting

### Expected Traffic Handling
- **Month 1-3:** 20,000-70,000 visitors/month - ✅ Firebase free tier sufficient
- **Month 4-6:** 100,000+ visitors/month - ✅ Firebase scales automatically
- **Year 1+:** 500,000+ visitors/month - ✅ Firebase handles easily

---

## 9. COST ESTIMATION

### Firebase Costs (First 3 Months)
- **Firestore:** Free tier (50K reads/day) - ✅ Free
- **Storage:** Free tier (5GB) - ✅ Free
- **Functions:** Free tier (2M invocations/month) - ✅ Free
- **Bandwidth:** Free tier (10GB/month) - ✅ Free

**Estimated Cost:** ₹0 (within free tier)

### After Scaling (Month 4-6)
- **Firestore:** ~₹500-2000/month (based on reads)
- **Storage:** ~₹200-1000/month (based on storage)
- **Functions:** ~₹500-1500/month (based on invocations)
- **Bandwidth:** ~₹1000-5000/month (based on downloads)

**Estimated Cost:** ₹2,000-10,000/month

### Total Platform Costs
- **Domain:** ₹800-1500/year
- **Vercel Hosting:** Free tier (sufficient for most traffic)
- **Firebase:** ₹0-10,000/month (scales with usage)
- **Razorpay:** 2% transaction fee (only on paid downloads)

**Break-even:** Revenue easily covers costs after Month 1

---

## 10. DEVELOPMENT TOOLS

### Code Quality
- **Linting:** ESLint
- **Formatting:** Prettier
- **Type Checking:** TypeScript

### Version Control
- **Git:** GitHub/GitLab
- **Branch Strategy:** Main → Develop → Feature branches

### CI/CD
- **Vercel:** Automatic deployments on push
- **Firebase:** Deploy via CLI or GitHub Actions

---

## 11. MONITORING & ANALYTICS

### Application Monitoring
- Firebase Performance Monitoring
- Error tracking (optional: Sentry)

### Business Analytics
- Google Analytics 4
- Custom Firebase Analytics events
- Admin dashboard (custom-built)

### SEO Monitoring
- Google Search Console
- Ahrefs/SEMrush (optional, for keyword tracking)

---

This architecture is production-ready and scalable from day one.

