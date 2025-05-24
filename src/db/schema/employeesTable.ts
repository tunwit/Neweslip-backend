import {
  date,
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/mysql-core";
import { shopsTable } from "./shopsTable";
import { branchesTable } from "./branchesTable";
import { status } from "elysia";
import { relations } from "drizzle-orm";

export const employeesTable = mysqlTable("employees", {
  id: int().autoincrement().notNull().primaryKey(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  nickName: text().notNull(),
  email: text().notNull(),
  position: varchar({ length: 20 }),
  dateOfBirth: text(),
  gender: mysqlEnum(["male", "female", "other"]).default("female"),
  phoneNumber: varchar({ length: 11 }).notNull(),
  dateEmploy: text(),
  address1: varchar({ length: 255 }),
  address2: varchar({ length: 255 }),
  address3: varchar({ length: 255 }),
  avatar: varchar({ length: 255 }),
  salary: int().notNull(),
  bankName: text().notNull(),
  bankAccountOwner: text().notNull(),
  bankAccountNumber: text().notNull(),
  promtpay: text(),
  shopId: int()
    .references(() => shopsTable.id)
    .notNull(),
  branchId: int()
    .references(() => branchesTable.id)
    .notNull(),
  status: mysqlEnum(["ACTIVE", "INACTIVE", "PARTTIME"]).default("ACTIVE"),
});

export const employeeRelations = relations(employeesTable, ({ one }) => ({
  branch: one(branchesTable, {
    fields: [employeesTable.branchId],
    references: [branchesTable.id],
  }),
}));
