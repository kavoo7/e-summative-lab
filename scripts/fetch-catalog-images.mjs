import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CATALOG_IMAGES, CATALOG_IMAGE_SOURCES } from "../src/data/catalogImages.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "catalog");
mkdirSync(outDir, { recursive: true });

const force = process.argv.includes("--force");
const entries = Object.entries(CATALOG_IMAGES);
let ok = 0;
let failed = 0;

for (const [key, url] of entries) {
  const dest = join(outDir, `${key}.jpg`);
  const label = CATALOG_IMAGE_SOURCES[key]?.label ?? key;
  if (existsSync(dest) && !force) {
    ok += 1;
    continue;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(dest, buf);
    ok += 1;
    console.log(`✓ ${key} — ${label}`);
  } catch (err) {
    failed += 1;
    console.warn(`✗ ${key}: ${err.message}`);
  }
}

console.log(`Done: ${ok} saved, ${failed} failed (${entries.length} total)`);