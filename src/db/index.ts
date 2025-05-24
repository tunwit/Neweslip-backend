import "dotenv/config";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import * as schema from "./schema";
import mysql from "mysql2/promise";

if (!process.env.DATABASE_URL!)
  throw new ReferenceError("DATABASE_URL environment variable is not set.");

let db: MySql2Database<typeof schema>;

try {
  const pool = mysql.createPool({
    uri: process.env.DATABASE_URL!,
    waitForConnections: true,
    connectionLimit: 5,
  });
  await pool.getConnection().then((conn) => conn.release());

  db = drizzle(pool, { schema, mode: "default" });
} catch {
  throw Error("Database pool creation failed.");
}

export default db;
