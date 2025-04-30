import DoctorListing from "@/components/doctor-listing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Consult General Physicians Online - Internal Medicine Specialists",
  description:
    "Find and consult with top general physicians and internal medicine specialists online. Book appointments with experienced doctors.",
  openGraph: {
    title: "Consult General Physicians Online - Internal Medicine Specialists",
    description:
      "Find and consult with top general physicians and internal medicine specialists online. Book appointments with experienced doctors.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consult General Physicians Online - Internal Medicine Specialists",
    description:
      "Find and consult with top general physicians and internal medicine specialists online. Book appointments with experienced doctors.",
  },
  alternates: {
    canonical: "https://yourdomain.com/doctors/general-physicians",
  },
}

export default function Home() {
  return (
    <main>
      <DoctorListing />
    </main>
  )
}
