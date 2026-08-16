import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MotionHero } from "@/components/motion-hero";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { capabilityCards, company, faqItems, galleryImages, lineFlow, metrics, productFamilies } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="industrial-grid overflow-hidden px-5 py-12 md:py-18 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="reveal-up">
            <p className="text-sm font-black uppercase tracking-[0.26em] text-brand-red">Automated Foundry Systems</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink md:text-6xl">
              Automated Foundry Machinery & Molding Line Solutions
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-steel">
              {company.name} develops molding machines, sand mixers, and supporting production line equipment for foundries moving toward practical automation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-4 text-sm font-bold text-white shadow-lift hover:bg-blue-800">
                Request a Quote <ArrowRight size={17} />
              </Link>
              <Link href="/products" className="inline-flex items-center gap-2 rounded-full border border-brand-blue bg-white/80 px-6 py-4 text-sm font-bold text-brand-blue hover:bg-brand-sky">
                Explore Machines
              </Link>
            </div>
          </div>
          <MotionHero />
        </div>
      </section>

      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-[8px] border border-blue-100 bg-white p-5 shadow-lift">
              <p className="text-3xl font-black text-brand-blue">{metric.value}</p>
              <p className="mt-2 text-sm font-semibold text-steel">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Product Systems"
            title="Machine families for automated foundry production"
            body="Tianlong groups equipment around molding, sand preparation, and complete line support, helping buyers discuss the right system instead of a single isolated machine."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {productFamilies.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/72 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Turnkey Flow"
            title="From sand treatment to finished line movement"
            body="A complete foundry line requires equipment that can work together across process stages. The site keeps this full-line view visible for overseas project buyers."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-7">
            {lineFlow.map((step, index) => (
              <div key={step} className="relative rounded-[8px] border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-5 shadow-lift">
                <p className="text-xs font-black text-brand-red">0{index + 1}</p>
                <p className="mt-3 text-sm font-bold text-ink">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Manufacturing"
              title="A practical factory foundation for custom line projects"
              body="The factory combines workshop capacity, technical staff, PLC design, and machining resources to support modern automated foundry equipment."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {capabilityCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="rounded-[8px] border border-blue-100 bg-white p-5 shadow-lift">
                    <Icon className="text-brand-blue" />
                    <h3 className="mt-4 text-lg font-bold text-ink">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-steel">{card.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative min-h-[520px] overflow-hidden rounded-[8px] shadow-lift">
            <Image src="/assets/factory-exterior.png" alt="Tianlong factory exterior" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 via-white to-red-50/40 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Factory Gallery" title="Real equipment, workshops, and site scenes" align="center" />
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {galleryImages.map((image) => (
              <figure key={image.src} className="overflow-hidden rounded-[8px] border border-white bg-white shadow-lift">
                <div className="relative aspect-[1.22]">
                  <Image src={image.src} alt={image.alt} fill className="object-cover" />
                </div>
                <figcaption className="p-4 text-sm font-bold text-ink">{image.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Buyer FAQ" title="Useful answers before a project discussion" />
          <div className="grid gap-4">
            {faqItems.slice(0, 4).map((item) => (
              <div key={item.question} className="rounded-[8px] border border-blue-100 bg-white p-5 shadow-lift">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 shrink-0 text-brand-blue" size={20} />
                  <div>
                    <h3 className="font-bold text-ink">{item.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-steel">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 lg:px-8">
        <div className="mx-auto rounded-[8px] bg-brand-blue p-8 text-white shadow-lift md:p-12 lg:flex lg:max-w-7xl lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">Project Inquiry</p>
            <h2 className="mt-3 text-3xl font-semibold">Discuss your molding line requirement with Tianlong.</h2>
          </div>
          <Link href="/contact" className="mt-6 inline-flex rounded-full bg-white px-6 py-4 text-sm font-bold text-brand-blue lg:mt-0">
            Send Inquiry
          </Link>
        </div>
      </section>
    </>
  );
}

