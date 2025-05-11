import { drizzle } from "drizzle-orm/mysql2";
import Elysia from "elysia";
import db from "../../db";
import { ownersTable } from "../../db/schema";
import jwt from "@elysiajs/jwt";
import user from "./user";
import { middleware } from "../../middleware";

const protected_route = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.ELYSIA_JWT_SECRET!,
    })
  )
  .guard(
    {
      beforeHandle: middleware,
    },
    (app) => app.use(user)
  );

export default protected_route;
