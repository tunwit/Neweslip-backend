import { eq } from "drizzle-orm";
import db from "./src/db";
import {
  branchesTable,
  ownersTable,
  shopOwnerTable,
  shopsTable,
} from "./src/db/schema";

//create owner
// const owner = await db
//   .insert(ownersTable)
//   .values({
//     firstName: "Thanut",
//     lastName: "Thappota",
//     email: "tunwit2458@gmail.com",
//   });

//create shop
// const shop = await db
//   .insert(shopsTable)
//   .values({ name: "Haris Premium Buffet" });

// const shopowner = await db
//   .insert(branchesTable)
//   .values([{ name: "รามอินทรา", shopId: 1 }]);

const shop = await db.query.employeesTable.findMany();
console.log(shop);

// const owner = await db.query.ownersTable.findFirst({
//   where: (ownersTable, { eq }) => eq(ownersTable.id, 1),
//   with: {
//     shops: { with: { shop: true } },
//   },
// });

// const shopowner = await db.query.shopOwnerTable.findMany();
// console.log(owner?.shops);
