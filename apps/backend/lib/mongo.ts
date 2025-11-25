import { MongoClient, MongoClientOptions, Db } from "mongodb";

let client: MongoClient;
let db: Db;

export const connectDB = async () => {
  try {
    if (!client) {
        if (!process.env.MONGO_URI) {
          throw new Error("MONGO_URI environment variable is not defined");
        }
        
        const options: Partial<MongoClientOptions> = {
            maxPoolSize: 20, // v6 valid option
          };
        client = new MongoClient(process.env.MONGO_URI, options);

      await client.connect();
      console.log("✅ MongoDB connected");
    }

    if (!process.env.MONGO_DB) {
      throw new Error("MONGO_DB environment variable is not defined");
    }
    
    db = client.db(process.env.MONGO_DB);
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) throw new Error("❗ Database not initialized. Call connectDB() first.");
  return db;
};

export const getClient = () => client;
