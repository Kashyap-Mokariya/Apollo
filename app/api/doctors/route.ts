import {type NextRequest, NextResponse} from "next/server";
import {connectToDatabase} from "@/lib/mongodb";

export async function GET(request: NextRequest) {
	try {
		const {db} = await connectToDatabase();

		// Get query parameters
		const searchParams = request.nextUrl.searchParams;
		const page = Number.parseInt(searchParams.get("page") || "1");
		const limit = Number.parseInt(searchParams.get("limit") || "10");
		const skip = (page - 1) * limit;

		const filterQuery: any = {};
		const andConditions: any[] = [];

		// Consult Mode
		const consultMode = searchParams.get("consultMode");
		if (consultMode) {
			andConditions.push({
				consultModes: {$in: consultMode.split(",")},
			});
		}

		// Experience
		const experience = searchParams.get("experience");
		if (experience) {
			const experienceRanges = experience.split(",");
			const experienceConditions: any[] = [];

			experienceRanges.forEach((range) => {
				if (range === "0-5") {
					experienceConditions.push({
						yearsOfExperience: {$gte: 0, $lte: 5},
					});
				} else if (range === "6-10") {
					experienceConditions.push({
						yearsOfExperience: {$gte: 6, $lte: 10},
					});
				} else if (range === "11-16") {
					experienceConditions.push({
						yearsOfExperience: {$gte: 11, $lte: 16},
					});
				} else if (range === "17+") {
					experienceConditions.push({yearsOfExperience: {$gte: 17}});
				}
			});

			if (experienceConditions.length > 0) {
				andConditions.push({$or: experienceConditions});
			}
		}

		// Fees
		const fees = searchParams.get("fees");
		if (fees) {
			const feesRanges = fees.split(",");
			const feesConditions: any[] = [];

			feesRanges.forEach((range) => {
				if (range === "100-500") {
					feesConditions.push({
						consultationFee: {$gte: 100, $lte: 500},
					});
				} else if (range === "500-1000") {
					feesConditions.push({
						consultationFee: {$gte: 500, $lte: 1000},
					});
				} else if (range === "1000+") {
					feesConditions.push({consultationFee: {$gte: 1000}});
				}
			});

			if (feesConditions.length > 0) {
				andConditions.push({$or: feesConditions});
			}
		}

		// Language
		const language = searchParams.get("language");
		if (language) {
			const languageArray = language
				.split(",")
				.map((lang) => new RegExp(`^${lang}$`, "i")); // case-insensitive exact match (the data in the database has the first letter capital in languages)
			andConditions.push({languages: {$in: languageArray}});
		}

		// Facility
		const facility = searchParams.get("facility");
		if (facility) {
			const facilityValues = facility.split(",");
			if (facilityValues.includes("apollo")) {
				andConditions.push({
					clinicName: {$regex: "Apollo", $options: "i"},
				});
			} else if (facilityValues.includes("other")) {
				andConditions.push({
					clinicName: {$not: {$regex: "Apollo", $options: "i"}},
				});
			}
		}

		// Final filter query
		if (andConditions.length > 0) {
			filterQuery.$and = andConditions;
		}

		const total = await db
			.collection("doctors")
			.countDocuments(filterQuery);

		const doctors = await db
			.collection("doctors")
			.find(filterQuery)
			.skip(skip)
			.limit(limit)
			.toArray();

		return NextResponse.json({
			success: true,
			total,
			doctors,
		});
	} catch (error) {
		console.error("Error fetching doctors:", error);
		return NextResponse.json(
			{success: false, message: "Failed to fetch doctors"},
			{status: 500}
		);
	}
}
