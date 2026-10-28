import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/weddings", "/birthdays", ...projects.map((p) => `/work/${p.slug}`)];
  return pages.map((path) => ({ url: `${site.url}${path}`, priority: path === "" ? 1 : 0.7 }));
}
