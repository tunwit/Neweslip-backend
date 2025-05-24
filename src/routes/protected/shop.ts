import { drizzle } from "drizzle-orm/mysql2";
import Elysia, { status, t } from "elysia";
import db from "../../db";
import { ownersTable, shopsTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { getToken } from "next-auth/jwt";
import { createRemoteJWKSet, jwtVerify } from "jose";
import jwt, { JWTPayloadSpec } from "@elysiajs/jwt";
import { extractIdFromSlug } from "../../../utils/extractIdFromSlug";
import slugify from "slugify";
import { Context } from "elysia/dist/context";
import { CustomContext } from "../../../types/Context";

const shop = new Elysia({ prefix: "/shop" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.ELYSIA_JWT_SECRET!,
    })
  )
  .get("/", async ({ user, request, cookie, jwt }: CustomContext) => {
    const shops = await db.query.shopOwnerTable.findMany({
      where: (shopOwnerTable, { eq }) =>
        eq(shopOwnerTable.ownerId, user.userId),
      with: { shop: true },
    });

    return status("OK", shops);
  })
  .get(
    "/validateSlug",
    async ({ user, query, cookie, jwt }: CustomContext) => {
      const slug = query.shopSlug;
      const id = extractIdFromSlug(slug);
      if (!id) {
        return status("Bad Request", { error: "Invalid slug format" });
      }

      const shop = await db.query.shopsTable.findFirst({
        where: (shopsTable, { eq }) => eq(shopsTable.id, id),
        with: { owners: true },
      });

      if (!shop) {
        return status("Not Found", { error: "Shop not found" });
      }

      //Check is slug match the name
      const expectedSlug = slugify(`${shop.name}-${shop.id}`);
      if (slug !== expectedSlug) {
        return status("Forbidden", { error: "Slug mismatch" });
      }

      //Check is use can access shop
      const isOwner = shop.owners.some(
        (owner) => owner.ownerId === user.userId
      );

      if (!isOwner) {
        return status("Forbidden", {
          error: "You do not have access to this shop",
        });
      }

      return status("Accepted", { message: "valid" });
    },
    { query: t.Object({ shopSlug: t.String() }) }
  )
  .get(
    "/branch",
    async ({ user, query, cookie, jwt }: CustomContext) => {
      const shopId = query.shopId;
      const shop = await db.query.shopsTable.findFirst({
        where: (shopsTable, { eq }) => eq(shopsTable.id, Number(shopId)),
        with: { owners: true, branches: true },
      });

      if (!shop) {
        return status("Not Found", { error: "Shop not found" });
      }

      //Check is use can access shop
      const isOwner = shop.owners.some(
        (owner) => owner.ownerId === user.userId
      );

      if (!isOwner) {
        return status("Forbidden", {
          error: "You do not have access to this shop",
        });
      }
      return status("OK", shop.branches);
    },
    {
      query: t.Object({ shopId: t.Number() }),
    }
  );

export default shop;
