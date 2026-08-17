import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products-db";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://htchemmach.com";
  const routes = ["/", "/products", "/solutions", "/about", "/manufacturing", "/quality", "/projects", "/faq", "/contact"];
  const products = await getProducts();
  const productRoutes = products.map((product) => `/products/${product.slug}`);

  return [...routes, ...productRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
