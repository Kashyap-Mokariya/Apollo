import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mediconnect"
const MONGODB_DB = process.env.MONGODB_DB || "mediconnect"

// Check if we have a connection to the database or if it's time to create a new one
let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  // If we have a connection to the database...
  if (cachedClient && cachedDb) {
    // Return the cached connection
    return { client: cachedClient, db: cachedDb }
  }

  // If no connection, create one
  const client = await MongoClient.connect(MONGODB_URI)

  // Select the database through the connection
  const db = client.db(MONGODB_DB)

  // Cache the connection
  cachedClient = client
  cachedDb = db

  return { client, db }
}
