import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MediConnect - Find and Consult with Top Doctors Online",
  description:
    "Find and consult with top doctors online. Book appointments with experienced doctors across various specialties.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "MediConnect",
              url: "https://mediconnect.com",
              logo: "https://mediconnect.com/logo.png",
              description:
                "Find and consult with top doctors online. Book appointments with experienced doctors across various specialties.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "India",
              },
              telephone: "+91-1234567890",
            }),
          }}
        />
        {/* Canonical URL */}
        <link rel="canonical" href="https://mediconnect.com/doctors/general-physicians" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
