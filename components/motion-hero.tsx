import Image from "next/image";
import { AnimatedMetric } from "@/components/animated-metric";
import { metrics } from "@/lib/site-data";

export function MotionHero() {
  return (
    <div className="relative min-h-[620px] overflow-hidden rounded-[8px] border border-white/70 bg-white shadow-lift">
      <Image
        src="/assets/horizontal-molding-machine.png"
        alt="Automatic horizontal molding machine"
        fill
        priority
        sizes="(min-width: 1024px) 52vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/82 via-white/34 to-blue-900/12" />
      <svg className="absolute inset-x-0 bottom-16 h-48 w-full text-brand-blue/35" viewBox="0 0 900 220" fill="none">
        <path
          className="line-flow"
          d="M20 160 C150 40 260 220 410 98 C560 -20 660 180 880 60"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          className="line-flow"
          d="M40 188 C210 118 280 144 430 124 C610 98 710 144 860 110"
          stroke="#e51f2f"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.42"
        />
      </svg>
      <div className="absolute left-5 top-5 rounded-[8px] border border-white/80 bg-white/88 p-5 shadow-lift backdrop-blur reveal-up">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">Line Automation</p>
        <p className="mt-2 max-w-[220px] text-sm leading-6 text-slate-700">Molding, sand treatment, cooling, and auxiliary systems coordinated for foundry production.</p>
      </div>
      <div className="absolute bottom-5 right-5 grid w-[min(440px,calc(100%-2.5rem))] grid-cols-2 gap-3">
        {metrics.slice(0, 4).map((metric, index) => (
          <div
            key={metric.label}
            className="float-slow rounded-[8px] border border-white/80 bg-white/90 p-4 shadow-lift backdrop-blur"
            style={{ animationDelay: `${index * 0.25}s` }}
          >
            <p className="text-2xl font-black text-brand-blue">
              <AnimatedMetric value={metric.value} />
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-600">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
