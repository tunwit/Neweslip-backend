import { int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import { shopsTable } from "./shopsTable";
import { ownersTable } from "./ownersTable";
import { relations } from "drizzle-orm";

export const shopOwnerTable = mysqlTable(
  "shop_owner",
  {
    shopId: int()
      .notNull()
      .references(() => shopsTable.id)
      .notNull(),
    ownerId: int()
      .notNull()
      .references(() => ownersTable.id)
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.shopId, t.ownerId] })]
);

export const shopOwnerRelations = relations(shopOwnerTable, ({ one }) => ({
  shop: one(shopsTable, {
    fields: [shopOwnerTable.shopId],
    references: [shopsTable.id],
  }),
  owner: one(ownersTable, {
    fields: [shopOwnerTable.ownerId],
    references: [ownersTable.id],
  }),
}));
