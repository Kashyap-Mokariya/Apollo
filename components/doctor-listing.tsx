"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FilterSidebar from "@/components/filter-sidebar"
import DoctorCard from "@/components/doctor-card"
import type { Doctor } from "@/types/doctor"

type FilterKeys = "consultMode" | "experience" | "fees" | "language" | "facility"

export default function DoctorListing() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [totalDoctors, setTotalDoctors] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<Record<FilterKeys, string[]>>({
    consultMode: [],
    experience: [],
    fees: [],
    language: [],
    facility: [],
  })
  useEffect(() => {
    fetchDoctors()
  }, [currentPage, filters])

  const fetchDoctors = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()
      queryParams.append("page", currentPage.toString())
      queryParams.append("limit", "10")

      // Add filters to query params
      Object.entries(filters).forEach(([key, values]) => {
        if (values.length > 0) {
          queryParams.append(key, values.join(","))
        }
      })

      const response = await fetch(`/api/doctors?${queryParams.toString()}`)
      const data = await response.json()

      setDoctors(data.doctors)
      setTotalDoctors(data.total)
    } catch (error) {
      console.error("Error fetching doctors:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => {
      const currentValues = [...prev[filterType as keyof typeof prev]]

      if (currentValues.includes(value)) {
        return {
          ...prev,
          [filterType]: currentValues.filter((v) => v !== value),
        }
      } else {
        return {
          ...prev,
          [filterType]: [...currentValues, value],
        }
      }
    })

    // Reset to first page when filters change
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setFilters({
      consultMode: [],
      experience: [],
      fees: [],
      language: [],
      facility: [],
    })
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-4">
        <Link href="/" className="text-gray-500 hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
        <Link href="/doctors" className="text-gray-500 hover:text-primary">
          Doctors
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
        <span className="text-primary">General Physicians</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onClearAll={clearAllFilters} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Consult General Physicians Online - Internal Medicine Specialists</h1>
            <p className="text-gray-600">({totalDoctors} doctors)</p>
          </div>

          {/* Sort and Filter Controls */}
          <div className="flex justify-between items-center mb-6">
            <div></div>
            <div className="relative">
              <Button variant="outline" className="flex items-center gap-2">
                <span>Availability</span>
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-10">Loading doctors...</div>
            ) : doctors.length === 0 ? (
              <div className="text-center py-10">No doctors found matching your criteria</div>
            ) : (
              doctors.map((doctor) => <DoctorCard key={doctor._id} doctor={doctor} />)
            )}
          </div>

          {/* Pagination */}
          {doctors.length > 0 && (
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={doctors.length < 10}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
