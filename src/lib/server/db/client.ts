import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if(!databaseUrl){
    throw new Error("Database url is required for API routes")
}

const sql = neon(databaseUrl);

export const db = drizzle({ client: sql, schema });
