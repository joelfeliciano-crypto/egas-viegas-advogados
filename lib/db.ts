import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./db-schema"

const globalForDb = globalThis as typeof globalThis & { neonPool?: Pool }

export const pool = globalForDb.neonPool ?? new Pool({ connectionString: process.env.DATABASE_URL })

if (process.env.NODE_ENV !== "production") globalForDb.neonPool = pool

export const db = drizzle(pool, { schema })
