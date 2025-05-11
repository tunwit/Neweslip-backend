import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { shopsTable } from "./shopsTable";
import { relations } from "drizzle-orm";
export const branchesTable = mysqlTable("branches", {
  id: int().autoincrement().notNull().primaryKey(),
  name: varchar({ length: 50 }).notNull(),
  shopId: int()
    .notNull()
    .references(() => shopsTable.id)
    .notNull(),
});

export const branchRelations = relations(branchesTable, ({ one }) => ({
  shop: one(shopsTable, {
    fields: [branchesTable.shopId],
    references: [shopsTable.id],
  }),
}));
