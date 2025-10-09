// src/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { env } from "~/env";
import * as schema from "./schema";

const sql = neon(String(env.POSTGRES_URL));
export const db = drizzle(sql, { schema });
