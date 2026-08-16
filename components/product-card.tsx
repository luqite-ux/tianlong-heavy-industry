import Image from "next/image";
import Link from "next/link";
import type { productFamilies } from "@/lib/site-data";

type ProductFamily = (typeof productFamilies)[number];

export function ProductCard({ product }: { product: ProductFamily }) {
  const Icon = product.icon;

  return (
    <article className="group overflow-hidden rounded-[8px] border border-blue-100 bg-white shadow-lift">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[1.35] overflow-hidden bg-brand-sky" aria-label={`View ${product.title}`}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-blue">
          <Icon size={18} />
          {product.eyebrow}
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
          <Link href={`/products/${product.slug}`} className="hover:text-brand-blue">
            {product.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-7 text-steel">{product.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {product.models.slice(0, 5).map((model) => (
            <span key={model} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">
              {model}
            </span>
          ))}
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="mt-6 inline-flex rounded-full border border-brand-blue px-5 py-3 text-sm font-bold text-brand-blue transition hover:bg-brand-blue hover:text-white"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
