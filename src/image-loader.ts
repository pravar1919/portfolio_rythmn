// Static-export image loader: serves the pre-generated -480 / -960 WebP variants
// (scripts/image-variants.mjs) and the original for anything wider. The `w` query is ignored by
// the static host; it only keeps each requested width a distinct URL, as next/image expects.
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  let file = src;
  if (src.endsWith(".webp")) {
    if (width <= 480) file = src.replace(/\.webp$/, "-480.webp");
    else if (width <= 960) file = src.replace(/\.webp$/, "-960.webp");
  }
  return `${file}?w=${width}`;
}
