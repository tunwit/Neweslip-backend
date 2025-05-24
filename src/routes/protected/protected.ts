import { drizzle } from "drizzle-orm/mysql2";
import Elysia from "elysia";
import db from "../../db";
import { ownersTable } from "../../db/schema";
import jwt from "@elysiajs/jwt";
import user from "./user";
import { middleware } from "../../middleware";
import shop from "./shop";
import employees from "./employees";
import { JWTPayload } from "../../../types/JWTPayload";
import { isJWTPayload } from "../../../utils/isJWTPayload";

const protected_route = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.ELYSIA_JWT_SECRET!,
    })
  )
  .derive<{ user?: JWTPayload; session_token?: string }>(
    async ({ jwt, cookie }) => {
      const session_token = cookie["next-auth.session-token"];
      if (!session_token) return {};
      const user = await jwt.verify(session_token.value);
      if (!user || !isJWTPayload(user)) return {};
      return { user, session_token: session_token.value };
    }
  )
  .guard(
    {
      beforeHandle: async ({ user, session_token, request, jwt, cookie }) => {
        return await middleware({ user, session_token, request, jwt, cookie });
      },
    },
    (app) => app.use(user).use(shop).use(employees)
  );

export default protected_route;
