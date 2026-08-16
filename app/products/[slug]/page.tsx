import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { SectionHeading } from "@/components/section-heading";
import { productFamilies } from "@/lib/site-data";

export function generateStaticParams() {
  return productFamilies.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productFamilies.find((item) => item.slug === slug);
  return {
    title: product?.title || "Product",
    description: product?.summary
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productFamilies.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const related = productFamilies.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="industrial-grid px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-red">{product.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink md:text-6xl">{product.title}</h1>
            <p className="mt-6 text-lg leading-8 text-steel">{product.summary}</p>
            <Link href="#inquiry" className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-4 text-sm font-bold text-white shadow-lift">
              Send Inquiry <ArrowRight size={17} />
            </Link>
          </div>
          <div className="relative min-h-[440px] overflow-hidden rounded-[8px] border border-white bg-white shadow-lift">
            <Image src={product.image} alt={product.title} fill priority className="object-cover" />
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Model Range" title="Discuss the right model for your line" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {product.models.map((model) => (
              <div key={model} className="rounded-[8px] border border-blue-100 bg-white p-4 text-sm font-bold text-ink shadow-lift">
                {model}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/72 px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <div className="rounded-[8px] border border-blue-100 bg-white p-7 shadow-lift">
            <h2 className="text-2xl font-semibold text-ink">Applications</h2>
            <div className="mt-6 grid gap-4">
              {product.applications.map((item) => (
                <p key={item} className="flex gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="shrink-0 text-brand-blue" size={20} /> {item}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-[8px] border border-blue-100 bg-white p-7 shadow-lift">
            <h2 className="text-2xl font-semibold text-ink">Advantages</h2>
            <div className="mt-6 grid gap-4">
              {product.advantages.map((item) => (
                <p key={item} className="flex gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="shrink-0 text-brand-red" size={20} /> {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Related Systems" title="Build around the full foundry process" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/products/${item.slug}`} className="rounded-[8px] border border-blue-100 bg-white p-5 shadow-lift hover:bg-brand-sky">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-blue">{item.eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold text-ink">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="inquiry" className="bg-gradient-to-br from-blue-50 via-white to-red-50/40 px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Inquiry" title="Share your project requirement" body="Tianlong can discuss model selection, line matching, and production layout based on your foundry process." />
          <InquiryForm interest={product.title} />
        </div>
      </section>
    </>
  );
}
