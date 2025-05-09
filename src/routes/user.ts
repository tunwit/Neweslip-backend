import { drizzle } from "drizzle-orm/mysql2";
import Elysia from "elysia";
import db from "../db";
import { ownersTable } from "../db/schema";

const user = new Elysia({ prefix: "/user" })
  .get("/", async () => {
    return await db.query.ownersTable.findMany();
  })
  .get("/create", async () => {
    return await db
      .insert(ownersTable)
      .values({
        email: "tunwit2458@gmail.com",
        firstName: "Thanut",
        lastName: "Thappota",
      })
      .$returningId();
  });

export default user;
