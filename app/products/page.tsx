import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { productFamilies } from "@/lib/site-data";

export const metadata = {
  title: "Products",
  description: "Automatic horizontal molding machines, static pressure molding machines, rotor sand mixers, and supporting foundry line equipment from TIANLONG."
};

export default function ProductsPage() {
  return (
    <section className="industrial-grid px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Products"
          title="Foundry machinery organized by production system"
          titleAs="h1"
          body="Explore Tianlong equipment by machine family and production line role. Each product path leads to a project inquiry rather than a shopping workflow."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {productFamilies.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
