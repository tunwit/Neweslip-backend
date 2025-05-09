import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";
import mysql from "mysql2/promise";

const db = drizzle(process.env.DATABASE_URL!, { schema, mode: "default" });
export default db;
