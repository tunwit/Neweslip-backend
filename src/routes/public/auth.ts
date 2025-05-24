import { Elysia, t, status } from "elysia";
import { eq } from "drizzle-orm";
import db from "../../db";
import { ownersTable } from "../../db/schema";
import jwt from "@elysiajs/jwt";

const auth = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.ELYSIA_JWT_SECRET!,
    })
  )
  .post(
    "/verify",
    async ({ body, jwt }) => {
      const user = await db.query.ownersTable.findFirst({
        where: (ownersTable, { eq }) => eq(ownersTable.email, body.email),
      });

      if (!user) {
        return status("Unauthorized", { verify: false });
      }
      return status("OK", { verify: true, user });
    },
    {
      body: t.Object({ email: t.String({ format: "email" }) }),
    }
  );

export default auth;
