import { relations } from "drizzle-orm";
import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { branchesTable } from "./branchesTable";
import { shopOwnerTable } from "./shopOwnerTable";

export const shopsTable = mysqlTable("shops", {
  id: int().autoincrement().notNull().primaryKey(),
  name: varchar({ length: 50 }),
  avatar: varchar({ length: 255 }),
});

export const shopRelations = relations(shopsTable, ({ many }) => ({
  branches: many(branchesTable),
  owners: many(shopOwnerTable),
}));
