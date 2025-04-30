import {NextResponse} from "next/server";
import {connectToDatabase} from "@/lib/mongodb";

export async function GET() {
	try {
		console.log("Testing database connection...");
		const {db} = await connectToDatabase();

		// Try a simple operation
		const collections = await db.listCollections().toArray();
		const collectionNames = collections.map((c: any) => c.name);

		return NextResponse.json({
			success: true,
			message: "Database connection successful",
			collections: collectionNames,
			mongodbUri: process.env.MONGODB_URI?.replace(
				/mongodb\+srv:\/\/([^:]+):([^@]+)@/,
				"mongodb+srv://***:***@"
			),
			database: process.env.MONGODB_DB,
		});
	} catch (error) {
		console.error("Database connection test failed:", error);
		return NextResponse.json(
			{
				success: false,
				message: "Database connection test failed",
				error: error instanceof Error ? error.message : String(error),
			},
			{status: 500}
		);
	}
}
