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
  .get("/test", () => {
    return { message: "kuy" };
  })
  .post(
    "/verify",
    async ({ body, jwt }) => {
      const user = await db
        .select()
        .from(ownersTable)
        .where(eq(ownersTable.email, body.email));

      if (user.length === 0) {
        return status("Unauthorized", { verify: false });
      }
      return status("OK", { verify: true });
    },
    {
      body: t.Object({ email: t.String() }),
    }
  );

export default auth;
