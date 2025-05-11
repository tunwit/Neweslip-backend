import { drizzle } from "drizzle-orm/mysql2";
import Elysia, { t } from "elysia";
import db from "../../db";
import { ownersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { getToken } from "next-auth/jwt";
import { createRemoteJWKSet, jwtVerify } from "jose";

const user = new Elysia({ prefix: "/user" }).get("/", async ({ headers }) => {
  return { message: "hello" };
});

export default user;
