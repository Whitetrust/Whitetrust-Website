import { MongoClient, type Db } from "mongodb";
import { env, mongoEnabled } from "./env";

type Global = typeof globalThis & {
  _mongoClient?: MongoClient;
  _mongoClientPromise?: Promise<MongoClient>;
};

const g = globalThis as Global;

function client(): Promise<MongoClient> {
  if (!mongoEnabled()) {
    throw new Error("MongoDB not configured (MONGODB_URI missing)");
  }
  if (!g._mongoClientPromise) {
    const uri = env.mongoUri!;
    // Azure Cosmos DB for MongoDB (RU API) rejects retryable writes — force
    // retryWrites:false for Cosmos hosts so the same driver works against
    // either Cosmos or MongoDB Atlas without editing the connection string.
    const isCosmos = /\.cosmos\.azure\.com/i.test(uri);
    g._mongoClient = new MongoClient(uri, isCosmos ? { retryWrites: false } : {});
    g._mongoClientPromise = g._mongoClient.connect();
  }
  return g._mongoClientPromise;
}

export async function db(): Promise<Db> {
  const c = await client();
  return c.db(env.mongoDb);
}

export type EnquiryDoc = {
  _id?: string;
  ts: Date;
  name: string;
  email: string;
  phone?: string;
  country: string;
  interest: string;
  preferredWindow?: string;
  message: string;
  prospectToken?: string;
  ip?: string;
  userAgent?: string;
  booking?: {
    mailbox: string;
    start: string;
    end: string;
    eventId: string;
    teamsUrl?: string;
  };
  status: "received" | "booked" | "failed-booking";
  errorMessage?: string;
};
