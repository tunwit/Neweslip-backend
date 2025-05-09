import { relations } from "drizzle-orm";
import { int, mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core";
import { shopOwnerTable } from "./shopOwnerTable";

export const ownersTable = mysqlTable("owners", {
  id: int().autoincrement().notNull().primaryKey(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  avatar: varchar({ length: 255 }),
});

export const ownerRelations = relations(ownersTable, ({ many }) => ({
  shops: many(shopOwnerTable),
}));
