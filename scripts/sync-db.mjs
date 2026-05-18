import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { MOCK_PRODUCTS, STORE_INFO } from "../src/data/mockCatalog.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const db = {
  store_info: STORE_INFO,
  products: MOCK_PRODUCTS,
};

writeFileSync(join(root, "db.json"), `${JSON.stringify(db, null, 2)}\n`);
console.log(`Wrote db.json with ${MOCK_PRODUCTS.length} products`);