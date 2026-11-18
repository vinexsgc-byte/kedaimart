// lib/db/index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { defineRelations } from "drizzle-orm/relations";
import pg from "pg";
import * as schema from "./schema";
import { envSchema } from "@/lib/validations/env-schema";

const { Pool } = pg;

const env = envSchema.parse(process.env);

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

const relations = defineRelations(schema);

export const db = drizzle({ client: pool, relations });
