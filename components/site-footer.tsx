import Link from "next/link";
import { company, navItems, productFamilies } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-[#10213d] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-2xl font-black tracking-wide">{company.brand}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/72">{company.tagline}</p>
          <div className="mt-6 space-y-2 text-sm text-white/76">
            {company.phones.map((phone) => (
              <p key={phone}>{phone}</p>
            ))}
            <p>{company.address}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/56">Products</h3>
          <div className="mt-5 grid gap-3 text-sm text-white/76">
            {productFamilies.slice(0, 4).map((item) => (
              <Link key={item.slug} href={`/products/${item.slug}`} className="hover:text-white">
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/56">Navigation</h3>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/76">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/54">
        Copyright {new Date().getFullYear()} Qingdao Tianlong Heavy Industry Co., Ltd. All rights reserved.
      </div>
    </footer>
  );
}
