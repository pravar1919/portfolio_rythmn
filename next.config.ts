import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site, served from Cloudflare Workers static assets (see wrangler.jsonc).
  output: "export",
  images: { loader: "custom", loaderFile: "./src/image-loader.ts" },
  // Cache Components is off: it adds nothing to a fully prerendered site and conflicts with
  // `output: "export"` for the sitemap/robots route handlers.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
