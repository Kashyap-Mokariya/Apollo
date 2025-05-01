"use client"

import { Button } from "@/components/ui/button"

type FilterSidebarProps = {
  filters: {
    consultMode: string[]
    experience: string[]
    fees: string[]
    language: string[]
    facility: string[]
  }
  onFilterChange: (filterType: string, value: string) => void
  onClearAll: () => void
}

export default function FilterSidebar({ filters, onFilterChange, onClearAll }: FilterSidebarProps) {
  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Filters</h2>
        <Button variant="link" className="text-primary p-0 h-auto" onClick={onClearAll}>
          Clear All
        </Button>
      </div>

      {/* Show Doctors Near Me */}
      <div className="mb-6">
        <Button variant="outline" className="w-full justify-center border-primary text-primary">
          Show Doctors Near Me
        </Button>
      </div>

      {/* Mode of Consult */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Mode of Consult</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-primary mr-2"
              checked={filters.consultMode.includes("offline")}
              onChange={() => onFilterChange("consultMode", "offline")}
            />
            <span>Hospital Visit</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-primary mr-2"
              checked={filters.consultMode.includes("online")}
              onChange={() => onFilterChange("consultMode", "online")}
            />
            <span>Online Consult</span>
          </label>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Experience (In Years)</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-primary mr-2"
              checked={filters.experience.includes("0-5")}
              onChange={() => onFilterChange("experience", "0-5")}
            />
            <span>0-5</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-primary mr-2"
              checked={filters.experience.includes("6-10")}
              onChange={() => onFilterChange("experience", "6-10")}
            />
            <span>6-10</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-primary mr-2"
              checked={filters.experience.includes("11-16")}
              onChange={() => onFilterChange("experience", "11-16")}
            />
            <span>11-16</span>
          </label>
          <Button variant="link" className="text-primary p-0 h-auto text-sm">
            +1 More
          </Button>
        </div>
      </div>

      {/* Fees */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Fees (In Rupees)</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-primary mr-2"
              checked={filters.fees.includes("100-500")}
              onChange={() => onFilterChange("fees", "100-500")}
            />
            <span>100-500</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-primary mr-2"
              checked={filters.fees.includes("500-1000")}
              onChange={() => onFilterChange("fees", "500-1000")}
            />
            <span>500-1000</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-primary mr-2"
              checked={filters.fees.includes("1000+")}
              onChange={() => onFilterChange("fees", "1000+")}
            />
            <span>1000+</span>
          </label>
        </div>
      </div>

      {/* Language */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Language</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-primary mr-2"
              checked={filters.language.includes("english")}
              onChange={() => onFilterChange("language", "english")}
            />
            <span>English</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-primary mr-2"
              checked={filters.language.includes("hindi")}
              onChange={() => onFilterChange("language", "hindi")}
            />
            <span>Hindi</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-primary mr-2"
              checked={filters.language.includes("telugu")}
              onChange={() => onFilterChange("language", "telugu")}
            />
            <span>Telugu</span>
          </label>
          <Button variant="link" className="text-primary p-0 h-auto text-sm">
            +10 More
          </Button>
        </div>
      </div>

      {/* Facility */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Facility</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-primary mr-2"
              checked={filters.facility.includes("apollo")}
              onChange={() => onFilterChange("facility", "apollo")}
            />
            <span>Apollo Hospital</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded text-primary mr-2"
              checked={filters.facility.includes("other")}
              onChange={() => onFilterChange("facility", "other")}
            />
            <span>Other Clinics</span>
          </label>
        </div>
      </div>
    </div>
  )
}
