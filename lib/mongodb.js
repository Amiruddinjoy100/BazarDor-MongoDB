
import "server-only";
import dns from "node:dns";
import { MongoClient } from "mongodb";

// Use working DNS servers during local development
if (process.env.NODE_ENV === "development") {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

// MongoDB Atlas connection
const globalForMongo = globalThis;

const uri =
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017";

const client =
  globalForMongo.__bazardorMongoClient ||
  new MongoClient(uri, { maxPoolSize: 10 });

if (!globalForMongo.__bazardorMongoClient) {
  globalForMongo.__bazardorMongoClient = client;
}

export const db = client.db(
  process.env.MONGODB_DB || "bazardor"
);
