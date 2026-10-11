import "server-only";
import { MongoClient } from "mongodb";

// Reuse client across hot reloads and serverless warm invocations.
const globalForMongo = globalThis;
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const client = globalForMongo.__bazardorMongoClient || new MongoClient(uri, { maxPoolSize: 10 });
if (!globalForMongo.__bazardorMongoClient) globalForMongo.__bazardorMongoClient = client;

export const db = client.db(process.env.MONGODB_DB || "bazardor");
