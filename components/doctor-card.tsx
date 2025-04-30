import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Info, ThumbsUp } from "lucide-react"
import type { Doctor } from "@/types/doctor"

type DoctorCardProps = {
  doctor: Doctor
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="border rounded-lg p-4 flex flex-col md:flex-row gap-4">
      <div className="flex-shrink-0">
        <Image
          src={doctor.profilePicture || "/placeholder-doctor.png"}
          alt={doctor.name}
          width={100}
          height={100}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">{doctor.name}</h2>
              <Info className="h-4 w-4 text-gray-400" />

              {doctor.isTopDoctor && (
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">DOCTOR OF THE HOUR</span>
              )}
            </div>

            <p className="text-gray-600">{doctor.specialization}</p>

            <div className="mt-1 text-sm text-primary">
              {doctor.yearsOfExperience} YEARS • {doctor.qualification}
            </div>

            <div className="mt-2 text-sm text-gray-600">
              {doctor.clinicName} - {doctor.location}
            </div>

            {doctor.rating && (
              <div className="mt-2 flex items-center">
                <ThumbsUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600">{doctor.rating}%</span>
                <span className="text-gray-500 text-sm ml-1">({doctor.patientCount}+ Patients)</span>
              </div>
            )}
          </div>

          <div className="mt-4 md:mt-0 text-right">
            <div className="text-xl font-bold">₹{doctor.consultationFee}</div>
            {doctor.cashback && (
              <div className="flex items-center justify-end text-sm text-gray-600">
                <Image src="/coin-icon.png" alt="Cashback" width={16} height={16} className="mr-1" />
                <span>₹{doctor.cashback} Cashback</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Consult Online
            {doctor.availableIn && <span className="text-xs ml-1">Available in {doctor.availableIn} minutes</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}
