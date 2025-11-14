import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FormEase - Government Form Auto-Fill & PDF Generator',
  description: 'Fill government forms online in minutes. Auto-fill Aadhaar, PAN, Income Certificate and more. Download ready-to-submit PDFs instantly.',
  keywords: 'government forms, form fill online, aadhaar update, pan correction, income certificate, caste certificate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

