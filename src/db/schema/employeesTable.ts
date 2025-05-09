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
export const employeesTable = mysqlTable("employees", {
  id: int().autoincrement().notNull().primaryKey(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  nickName: text().notNull(),
  email: text().notNull(),
  position: varchar({ length: 20 }),
  gender: mysqlEnum(["male", "female", "other"]).default("female"),
  phoneNumber: varchar({ length: 11 }),
  dateEmploy: date(),
  address1: varchar({ length: 255 }),
  address2: varchar({ length: 255 }),
  address3: varchar({ length: 255 }),
  avatar: varchar({ length: 255 }),
  salary: int().notNull(),
  bankName: text(),
  bankAccount: text(),
  bankAccountNumber: text(),
  shopId: int().references(() => shopsTable.id),
  branchId: int().references(() => branchesTable.id),
});
