"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";
import { Cloud, Cpu, Code, Shield, Sparkles, Zap, Smartphone, Megaphone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface ServiceCaseItem {
  title: string;
  category: string;
  icon: any;
  description: string;
  stats: string;
  client: string;
}

const defaultServices: ServiceCaseItem[] = [
  {
    title: "Cloud Architecture",
    category: "Infrastructure",
    icon: Cloud,
    description: "High-concurrency microservices, multi-region Kubernetes, and auto-scaling cloud engine.",
    stats: "99.999% Uptime",
    client: "Global SaaS Leader"
  },
  {
    title: "Generative AI Systems",
    category: "Artificial Intelligence",
    icon: Cpu,
    description: "Autonomous agents, custom LLM fine-tuning, RAG enterprise knowledge graphs.",
    stats: "10x Productivity",
    client: "FinTech Enterprise"
  },
  {
    title: "Full-Stack Software",
    category: "Web & Mobile",
    icon: Code,
    description: "Sub-10ms React & Node platforms with real-time WebSockets and custom databases.",
    stats: "< 10ms Latency",
    client: "EduTech ERP Platform"
  },
  {
    title: "Cybersecurity & Audit",
    category: "SecOps",
    icon: Shield,
    description: "Zero-trust network frameworks, automated threat detection, and SOC2 compliance.",
    stats: "100% Compliant",
    client: "Healthcare Network"
  },
  {
    title: "High-Speed APIs",
    category: "Backend Engine",
    icon: Zap,
    description: "Ultra-low latency GraphQL & gRPC data pipelines handling millions of req/sec.",
    stats: "5M+ Req/Min",
    client: "Logistics Giant"
  },
  {
    title: "Cross-Platform Apps",
    category: "Mobile Native",
    icon: Smartphone,
    description: "Fluid native iOS & Android applications with offline-first local synchronization.",
    stats: "4.9 ★ Rating",
    client: "Retail Commerce"
  },
  {
    title: "Growth & Analytics",
    category: "Media & Strategy",
    icon: Megaphone,
    description: "Data-driven growth engines, automated attribution, and brand amplification.",
    stats: "+320% Conversion",
    client: "E-Commerce Unicorn"
  }
];

function Case() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const timer = setInterval(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent((prev) => prev + 1);
      }
    }, 2800);

    return () => clearInterval(timer);
  }, [api, current]);

  return (
    <div className="w-full py-16 md:py-24 bg-white text-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/10 text-xs font-extrabold text-electric uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enterprise Solutions &amp; Capabilities</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-navy tracking-tight leading-tight">
                Architecting systems trusted by <span className="text-gradient">industry leaders</span>
              </h2>
            </div>

            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white text-sm font-bold hover:bg-navy-light transition-all shadow-md shrink-0 w-fit"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4 text-electric" />
            </Link>
          </div>

          {/* Infinite Carousel */}
          <div className="relative px-2">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent className="-ml-4 md:-ml-6">
                {defaultServices.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <CarouselItem className="pl-4 md:pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4" key={index}>
                      <div className="h-full p-6 rounded-3xl bg-offwhite border border-navy/10 hover:border-electric/40 shadow-soft hover:shadow-deep transition-all duration-300 flex flex-col justify-between group cursor-pointer">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-white border border-navy/10 flex items-center justify-center text-electric group-hover:bg-gradient-brand group-hover:text-white transition-all shadow-sm">
                              <Icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-magenta px-2.5 py-1 rounded-md bg-white border border-navy/5">
                              {item.category}
                            </span>
                          </div>

                          <div>
                            <h3 className="text-xl font-extrabold text-navy tracking-tight group-hover:text-electric transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-xs text-muted font-medium mt-2 leading-relaxed line-clamp-3">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-navy/10 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-muted font-bold block uppercase tracking-wider">Client Proof</span>
                            <span className="font-extrabold text-navy">{item.client}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-muted font-bold block uppercase tracking-wider">Metric</span>
                            <span className="font-black text-emerald-600">{item.stats}</span>
                          </div>
                        </div>

                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

        </div>
      </div>
    </div>
  );
}

export { Case };
