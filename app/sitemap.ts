import type { MetadataRoute } from "next";
import { productFamilies } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const routes = ["/", "/products", "/solutions", "/about", "/manufacturing", "/quality", "/projects", "/faq", "/contact"];
  const productRoutes = productFamilies.map((product) => `/products/${product.slug}`);

  return [...routes, ...productRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
