// Writes <name>-480.webp and <name>-960.webp next to every .webp in public/ (never enlarged).
// Static export has no image optimizer, so src/image-loader.ts picks one of these instead.
// Runs before every build; existing up-to-date variants are skipped.
import { readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const WIDTHS = [480, 960];
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const sources = walk("public").filter((f) => f.endsWith(".webp") && !/-(480|960)\.webp$/.test(f));

let made = 0;
for (const src of sources) {
  for (const w of WIDTHS) {
    const out = src.replace(/\.webp$/, `-${w}.webp`);
    if (existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs) continue;
    await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(out);
    made++;
  }
}
console.log(`image variants: ${made} written, ${sources.length} sources`);
