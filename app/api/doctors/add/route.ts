import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const doctorData = await request.json()

    // Validate required fields
    const requiredFields = [
      "name",
      "specialization",
      "qualification",
      "yearsOfExperience",
      "consultationFee",
      "languages",
      "consultModes",
    ]

    for (const field of requiredFields) {
      if (!doctorData[field]) {
        return NextResponse.json({ success: false, message: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Add timestamp
    doctorData.createdAt = new Date()

    // Insert doctor into database
    const result = await db.collection("doctors").insertOne(doctorData)

    return NextResponse.json({
      success: true,
      message: "Doctor added successfully",
      doctorId: result.insertedId,
    })
  } catch (error) {
    console.error("Error adding doctor:", error)
    return NextResponse.json({ success: false, message: "Failed to add doctor" }, { status: 500 })
  }
}
