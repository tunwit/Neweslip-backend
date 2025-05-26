import { drizzle } from "drizzle-orm/mysql2";
import Elysia, { status, t } from "elysia";
import db from "../../db";
import { employeesTable, ownersTable } from "../../db/schema";
import { and, count, eq, ilike, like, or } from "drizzle-orm";
import { getToken } from "next-auth/jwt";
import { createRemoteJWKSet, jwtVerify } from "jose";
import jwt from "@elysiajs/jwt";
import { CustomContext } from "../../../types/Context";

const getEmployeeSchema = t.Object({
  shopId: t.Number(),
  search_query: t.Optional(t.String()),
  page: t.Optional(t.Numeric()),
  limit: t.Optional(t.Numeric()),
  status: t.Optional(
    t.Enum({
      ACTIVE: "ACTIVE",
      INACTIVE: "INACTIVE",
      PARTTIME: "PARTTIME",
    })
  ),
  branchId: t.Optional(t.Numeric()),
});
const createEmployeeSchema = t.Object({
  branchId: t.Number(),
  shopId: t.Number(),
  firstName: t.String(),
  lastName: t.String(),
  nickName: t.String(),
  email: t.String({ format: "email" }),
  position: t.Optional(t.String()),
  dateOfBirth: t.String(),
  gender: t.Optional(
    t.Enum({
      male: "male",
      female: "female",
      other: "other",
    })
  ),
  phoneNumber: t.String(),
  dateEmploy: t.String(),
  address1: t.Optional(t.String()),
  address2: t.Optional(t.String()),
  address3: t.Optional(t.String()),
  avatar: t.Optional(t.String()),
  salary: t.Number(),
  bankName: t.String(),
  bankAccountOwner: t.String(),
  bankAccountNumber: t.String(),
  status: t.Enum({
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    PARTTIME: "PARTTIME",
  }),
});
const employees = new Elysia({ prefix: "/employees" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.ELYSIA_JWT_SECRET!,
    })
  )
  .get(
    "/",
    async ({
      user,
      query,
      cookie,
      jwt,
    }: CustomContext & { query: typeof getEmployeeSchema }) => {
      const shopId = query.shopId;

      //Check Ownership
      const shop = await db.query.shopsTable.findFirst({
        where: (shopsTable, { eq }) => eq(shopsTable.id, Number(shopId)),
        with: { owners: true },
      });

      if (!shop) {
        return status("Not Found", { error: "Shop not found" });
      }

      const isOwner = shop.owners.some(
        (owner) => owner.ownerId === user.userId
      );

      if (!isOwner) {
        return status("Forbidden", {
          error: "You do not have access to this shop",
        });
      }

      const branchId = query.branchId;
      const _status = query.status;
      const search = query.search_query ? query.search_query : "";
      const page = query.page ? Number(query.page) : 1;
      const limit = query.limit ? Number(query.limit) : 10;
      const offset = (page - 1) * limit;

      const shopFilter = eq(employeesTable.shopId, Number(shopId));
      const trimmedSearch = search.trim();
      const searchFilter = trimmedSearch
        ? or(
            like(employeesTable.firstName, `%${trimmedSearch}%`),
            like(employeesTable.lastName, `%${trimmedSearch}%`),
            like(employeesTable.nickName, `%${trimmedSearch}%`),
            like(employeesTable.email, `%${trimmedSearch}%`),
            like(employeesTable.position, `%${trimmedSearch}%`)
          )
        : undefined;

      const branchFilter = eq(employeesTable.branchId, branchId);
      const statusFilter = eq(employeesTable.status, _status);

      const employees = await db.query.employeesTable.findMany({
        where: (employeesTable, { eq }) =>
          and(
            shopFilter,
            ...(searchFilter ? [searchFilter] : []),
            ...(branchId ? [branchFilter] : []),
            ...(_status ? [statusFilter] : [])
          ),

        with: {
          branch: true,
        },
        limit: limit,
        offset: offset,
      });

      const total = await db
        .select({ count: count() })
        .from(employeesTable)
        .where(
          and(
            shopFilter,
            ...(searchFilter ? [searchFilter] : []),
            ...(branchId ? [branchFilter] : []),
            ...(_status ? [statusFilter] : [])
          )
        );

      return status("OK", {
        employees,
        pagination: {
          page: page,
          total: total[0].count,
          totalPages: Math.ceil(total[0].count / limit),
          limit: limit,
        },
      });
    },
    {
      query: getEmployeeSchema,
    }
  )
  .post(
    "/",
    async ({
      user,
      body,
      cookie,
      jwt,
    }: CustomContext & { body: typeof createEmployeeSchema.static }) => {
      //Check Ownership
      const shop = await db.query.shopsTable.findFirst({
        where: (shopsTable, { eq }) => eq(shopsTable.id, body!.shopId),
        with: { owners: true },
      });

      if (!shop) {
        return status("Not Found", { error: "Shop not found" });
      }

      const isOwner = shop.owners.some(
        (owner) => owner.ownerId === user.userId
      );

      if (!isOwner) {
        return status("Forbidden", {
          error: "You do not have access to this shop",
        });
      }

      const result = await db
        .insert(employeesTable)
        .values({ ...body })
        .$returningId();
      return status("Created", result);
    },
    {
      body: createEmployeeSchema,
    }
  );

export default employees;
