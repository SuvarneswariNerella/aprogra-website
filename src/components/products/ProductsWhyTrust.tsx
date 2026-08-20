import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, animate, useInView } from 'motion/react';
import { 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface KPIItemData {
  name: string;
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  badge: string;
  title: string;
  href: string;
  actionText: string;
}

const TRUST_ITEMS: KPIItemData[] = [
  {
    name: "In-House Codebase",
    target: 100,
    suffix: "%",
    decimals: 0,
    badge: "Zero Subcontracting",
    title: "Battle-Tested In Production",
    href: "/products/school-erp",
    actionText: "Explore codebase architecture",
  },
  {
    name: "Production SLA",
    target: 99.98,
    suffix: "%",
    decimals: 2,
    badge: "Cloud-Native HA",
    title: "Multi-Tenant Architecture",
    href: "/services",
    actionText: "View uptime & infra SLA",
  },
  {
    name: "Daily Active Users",
    target: 120,
    suffix: "K+",
    decimals: 0,
    badge: "Enterprise Scale",
    title: "Proven Real-World Volume",
    href: "/products/omnichat",
    actionText: "View scale benchmarks",
  },
  {
    name: "Response Time SLA",
    target: 24,
    suffix: "/7",
    decimals: 0,
    badge: "Guaranteed SLA",
    title: "Direct Core Team Support",
    href: "/contact",
    actionText: "Connect with lead architects",
  }
];

function AnimatedCounter({ 
  target, 
  decimals = 0, 
  prefix = "", 
  suffix = "" 
}: { 
  target: number; 
  decimals?: number; 
  prefix?: string; 
  suffix?: string; 
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1], // smooth cubic-out deceleration
      onUpdate: (latest) => {
        setVal(latest);
      },
    });

    return () => controls.stop();
  }, [isInView, target]);

  const formatted = decimals > 0 
    ? val.toFixed(decimals) 
    : Math.round(val).toString();

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function ProductsWhyTrust() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-white border-b border-[#0B0D12]/10">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF8F5] text-[#0B0D12] text-xs font-semibold border border-[#0B0D12]/10">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
              <span>Reliability &amp; Craft Standards</span>
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-[#0B0D12] tracking-tight leading-tight"
          >
            Why Teams Trust Aprogra Products
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm text-[#5A5E6E] max-w-2xl mx-auto leading-relaxed"
          >
            We don't build vaporware or speculative prototypes. Every system is engineered with founder-level devotion, multi-layered reliability, and real-time observability.
          </motion.p>
        </div>

        {/* Simple Content List with Count-Up Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-center">
          {TRUST_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col items-center space-y-3"
            >
              {/* Metric Value & Label */}
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#0B0D12] tracking-tight">
                  <AnimatedCounter 
                    target={item.target} 
                    decimals={item.decimals} 
                    prefix={item.prefix} 
                    suffix={item.suffix} 
                  />
                </div>
                <div className="text-xs font-mono font-semibold text-[#FF4A1C] uppercase tracking-wider mt-1">
                  {item.name}
                </div>
              </div>

              {/* Title */}
              <div className="pt-1">
                <h3 className="text-base font-bold font-display text-[#0B0D12] leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Link */}
              <div className="pt-2">
                <Link
                  to={item.href}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#0B0D12] hover:text-[#FF4A1C] transition-colors group"
                >
                  <span>{item.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#5A5E6E] group-hover:text-[#FF4A1C] group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

