import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              {/* <Image src="/logo.png" alt="MediConnect 24/7" width={120} height={40} className="h-10 w-auto" /> */}
            </Link>

            <div className="hidden md:flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1 text-primary" />
              <span>Select Location</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>
          </div>

          <div className="relative flex-1 mx-4 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search Doctors, Specialities, Conditions etc."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <Button variant="outline" className="flex items-center gap-2">
            <span>Login</span>
            <User className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex items-center space-x-6 mt-3 overflow-x-auto pb-2 text-sm">
          <Link href="#" className="whitespace-nowrap py-2">
            Buy Medicines
          </Link>
          <Link href="#" className="whitespace-nowrap py-2 text-primary font-medium">
            Find Doctors
          </Link>
          <Link href="#" className="whitespace-nowrap py-2">
            Lab Tests
          </Link>
          <Link href="#" className="whitespace-nowrap py-2">
            Circle Membership
          </Link>
          <Link href="#" className="whitespace-nowrap py-2">
            Health Records
          </Link>
          <Link href="#" className="whitespace-nowrap py-2">
            Diabetes Reversal
          </Link>
          <Link href="#" className="whitespace-nowrap py-2 flex items-center">
            Buy Insurance
            <span className="ml-1 text-xs bg-green-100 text-green-800 px-1 rounded">New</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
