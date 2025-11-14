# Government Form Auto-Fill & PDF Generator

A complete government form solution platform that provides auto-fill capabilities, step-by-step guides, and document tools for Indian government forms.

## Project Overview

**Core Value Proposition:**
- Fill government forms in minutes instead of hours
- Download ready-to-submit PDFs
- Access comprehensive guides for each form
- Use free document tools (photo resize, PDF merge/split)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Firebase account (for backend services)
- Razorpay account (for payments - optional for development)
- Google Analytics account (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MGanesh517/Government_forms_website.git
   cd GovernmentLinksWebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` with your Firebase and Razorpay credentials.

4. **Set up Firebase**
   - Create a Firebase project
   - Enable Firestore, Storage, and Auth
   - Add Firebase config to `.env.local`
   - (Optional) Add `serviceAccountKey.json` for template uploads

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Upload PDF Templates

1. **Prepare templates**
   - Create blank PDF forms for each form type
   - Place them in a `templates/` folder with names matching form IDs:
     - `aadhaar-address-update.pdf`
     - `pan-correction.pdf`
     - `income-certificate.pdf`
     - etc.

2. **Upload to Firebase Storage**
   ```bash
   # Using the upload script (requires serviceAccountKey.json)
   npx tsx scripts/upload-templates.ts
   
   # Or manually upload via Firebase Console
   # Go to Storage > templates/ folder and upload PDFs
   ```

## 📁 Project Structure

```
/
├── app/                      # Next.js 14 App Router
│   ├── api/                  # API routes
│   │   └── forms/            # Form generation API
│   ├── forms/                # Form pages
│   ├── guides/               # Guide pages
│   ├── tools/                # Tool pages
│   └── page.tsx              # Home page
├── components/               # React components
│   ├── forms/                # Form components
│   │   └── form-types/       # Individual form components
│   ├── layout/               # Layout components
│   └── analytics/            # Analytics components
├── lib/                      # Utilities
│   ├── firebase/             # Firebase config
│   ├── forms/                # Form utilities
│   ├── pdf/                  # PDF generation
│   ├── email/                # Email notifications
│   └── utils/                # Helper utilities
├── types/                    # TypeScript types
├── scripts/                  # Utility scripts
└── docs/                     # Planning documents
```

## 🛠️ Technology Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Firebase (Firestore, Storage, Functions)
- **PDF Generation:** pdf-lib (with template support)
- **Payment:** Razorpay
- **Forms:** React Hook Form
- **Validation:** React Hook Form + custom validation
- **Analytics:** Google Analytics 4
- **Email:** SendGrid (optional, configurable)

## 📋 Features

### Core Features
- ✅ 10 high-demand government forms (all implemented)
- ✅ Auto-fill form functionality with validation
- ✅ PDF generation (free with watermark, premium without)
- ✅ PDF template support (fills actual form PDFs)
- ✅ Step-by-step guides for each form
- ✅ Document tools (photo resizer, PDF merge/split/compress)
- ✅ Responsive design (mobile-first)
- ✅ Google Analytics integration
- ✅ Email notifications (optional)

### Forms Implemented
1. ✅ Aadhaar Address Update
2. ✅ PAN Correction
3. ✅ Income Certificate
4. ✅ Caste Certificate
5. ✅ Birth Certificate
6. ✅ Bank KYC
7. ✅ Self Declaration
8. ✅ NOC Letter
9. ✅ Ration Card Correction
10. ✅ Passport Photo Resize (tool)

### Coming Soon
- Payment integration (Razorpay) - Structure ready
- User dashboard
- Form history
- More forms (expand to 50+)
- Multi-language support

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Form Development

All 10 forms are implemented. To add a new form:

1. Add form type to `types/forms.ts`
2. Add form metadata to `lib/forms/form-metadata.ts`
3. Create form component in `components/forms/form-types/`
4. Add form case to `components/forms/FormInput.tsx`
5. Update PDF generator in `lib/pdf/pdf-generator.ts`
6. Add PDF template mapping in `lib/pdf/pdf-template-filler.ts`
7. Create guide page in `app/guides/[formId]/page.tsx`

### PDF Template Setup

1. **Create blank PDF templates** for each form
2. **Ensure PDF has form fields** (not just text)
3. **Field names should match** those in `getFieldMapping()` function
4. **Upload templates** using the upload script or Firebase Console
5. **Test form filling** to ensure fields populate correctly

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/MGanesh517/Government_forms_website.git
   git push -u origin main
   ```

2. Import project to Vercel
   - Connect your GitHub repository
   - Add environment variables
   - Deploy

3. Set up Firebase Storage rules (allow public read for templates)

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Firebase Hosting
- Self-hosted

## 📝 Environment Variables

Required variables in `.env.local`:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Razorpay (optional)
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Email (optional)
SENDGRID_API_KEY=
FROM_EMAIL=
```

## 📖 Documentation

Complete planning documentation available in the `/docs` folder:

1. **[Functionality Specification](./docs/01-functionality-specification.md)** - Complete feature breakdown
2. **[Architecture & Technology](./docs/02-architecture-technology.md)** - Technical architecture
3. **[Development Roadmap](./docs/03-development-roadmap.md)** - Step-by-step development plan
4. **[Monetization Plan](./docs/04-monetization-plan.md)** - Revenue streams
5. **[SEO Strategy](./docs/05-seo-strategy.md)** - SEO and content strategy
6. **[Launch Plan](./docs/06-launch-plan.md)** - Launch checklist
7. **[Growth Plan](./docs/07-growth-plan.md)** - Marketing strategy

## 🎯 Next Steps

1. ✅ **Set up Firebase** - Configure Firestore, Storage, Auth
2. ✅ **Upload PDF templates** - Use the upload script
3. ⏳ **Integrate Razorpay** - Add payment flow
4. ⏳ **Set up email service** - Configure SendGrid or similar
5. ⏳ **Set up Google Analytics** - Add measurement ID
6. ⏳ **Test all forms** - Verify PDF generation works
7. ⏳ **Deploy to production** - Deploy to Vercel/production

## 📧 Contact

For questions or support, please contact: contact@formease.in

## 📄 License

This project is proprietary. All rights reserved.

---

**Built with ❤️ using Next.js and Firebase**
