import { drizzle } from "drizzle-orm/mysql2";
import Elysia, { status, t } from "elysia";
import db from "../../db";
import { ownersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { getToken } from "next-auth/jwt";
import { createRemoteJWKSet, jwtVerify } from "jose";

const user = new Elysia({ prefix: "/user" }).get(
  "/",
  async ({ query }) => {
    const email = query.email;
    const user = await db.query.ownersTable.findFirst({
      where: (ownersTable, { eq }) => eq(ownersTable.email, email),
    });
    if (user) {
      return status("OK", { user: user });
    } else {
      return status("Not Found");
    }
  },
  {
    query: t.Object({
      email: t.String({
        format: "email",
      }),
    }),
  }
);

export default user;
