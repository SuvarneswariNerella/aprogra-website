import { create } from 'zustand';

export interface ServiceChapterData {
  id: number;
  tag: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  thesis: string;
  themeColor: string;
  accentColor: string;
  gradientText: string;
  bullets: {
    title: string;
    description: string;
    metric: string;
    metricLabel: string;
    highlightId: string;
  }[];
  techBadges: string[];
}

export const CHAPTERS_DATA: ServiceChapterData[] = [
  {
    id: 1,
    tag: "01 / ARCHITECTURE",
    shortTitle: "Web & Mobile",
    title: "Web & Mobile Engineering",
    subtitle: "High-throughput, reactive client systems",
    thesis: "We engineer resilient, sub-second web and mobile applications that handle millions of concurrent sessions with zero interface lag.",
    themeColor: "#3B82F6",
    accentColor: "#60A5FA",
    gradientText: "from-[#3B82F6] via-[#60A5FA] to-[#FF4A1C]",
    bullets: [
      {
        title: "Sub-Second Edge Rendering",
        description: "Optimized SSR and ISR edge runtimes achieving sub-45ms TTFB and flawless Core Web Vitals.",
        metric: "<45ms",
        metricLabel: "P95 TTFB",
        highlightId: "rendering"
      },
      {
        title: "Cross-Platform Precision",
        description: "Native iOS, Android, and Web clients engineered with shared type-safe core engines and 60fps gesture physics.",
        metric: "60 FPS",
        metricLabel: "Frame Stability",
        highlightId: "cross-platform"
      },
      {
        title: "Deterministic State Machines",
        description: "Zero-drift reactive architectures that prevent state desynchronization under high concurrency and offline conditions.",
        metric: "99.99%",
        metricLabel: "State Consistency",
        highlightId: "state"
      }
    ],
    techBadges: ["React / Next.js", "TypeScript", "React Native", "Swift & Kotlin", "Tailwind CSS", "WebAssembly"]
  },
  {
    id: 2,
    tag: "02 / INTELLIGENCE",
    shortTitle: "AI & Agentic",
    title: "AI & Agentic Solutions",
    subtitle: "Autonomous cognitive workflows & neural systems",
    thesis: "Beyond generic chatbots — we build multi-agent autonomous loops, real-time RAG pipelines, and fine-tuned LLM infrastructure that execute business logic.",
    themeColor: "#8B5CF6",
    accentColor: "#EC4899",
    gradientText: "from-[#8B5CF6] via-[#EC4899] to-[#FF4A1C]",
    bullets: [
      {
        title: "Multi-Agent Orchestration",
        description: "Autonomous agentic pods with deterministic tool execution, self-correction loops, and structured output verification.",
        metric: "10x",
        metricLabel: "Task Throughput",
        highlightId: "agents"
      },
      {
        title: "Sub-200ms Neural RAG",
        description: "Hybrid vector + keyword search over proprietary knowledge graphs with semantic reranking and zero hallucination boundaries.",
        metric: "<180ms",
        metricLabel: "Semantic Query Latency",
        highlightId: "rag"
      },
      {
        title: "Model Distillation & Privacy",
        description: "Fine-tuned quantized SLMs and private on-premise inference clusters with enterprise SOC2 data air-gapping.",
        metric: "100%",
        metricLabel: "Sovereign Privacy",
        highlightId: "distillation"
      }
    ],
    techBadges: ["Gemini 2.5/3", "LangGraph", "Vector DBs", "PyTorch", "vLLM", "Agentic Protocols"]
  },
  {
    id: 3,
    tag: "03 / PRODUCT",
    shortTitle: "SaaS & Platform",
    title: "Product Engineering & SaaS",
    subtitle: "End-to-end venture-scale software",
    thesis: "From napkin architecture to multi-tenant global scale, we build production software engineered for high retention, unit economics, and rapid iteration.",
    themeColor: "#06B6D4",
    accentColor: "#3B82F6",
    gradientText: "from-[#06B6D4] via-[#3B82F6] to-[#8B5CF6]",
    bullets: [
      {
        title: "Multi-Tenant Isolation",
        description: "Row-level security and schema-isolated multi-tenant databases designed to onboard thousands of enterprise teams effortlessly.",
        metric: "Zero-Leak",
        metricLabel: "Tenant Isolation",
        highlightId: "multitenant"
      },
      {
        title: "Automated Billing & Entitlements",
        description: "Complex usage-based metering, global invoicing, and tiered license provisioning with zero accounting reconciliation errors.",
        metric: "100%",
        metricLabel: "Billing Accuracy",
        highlightId: "billing"
      },
      {
        title: "Venture-Grade Velocity",
        description: "Modular domain-driven design enabling continuous delivery of production features without technical debt accumulation.",
        metric: "2-Week",
        metricLabel: "Ship Cycles",
        highlightId: "velocity"
      }
    ],
    techBadges: ["Node / Go", "PostgreSQL / Spanner", "Redis", "Stripe Connect", "GraphQL", "Event Streams"]
  },
  {
    id: 4,
    tag: "04 / INTERFACE",
    shortTitle: "Design Systems",
    title: "UI/UX & Design Systems",
    subtitle: "Mathematical design tokens & micro-interactions",
    thesis: "We craft design systems that bridge the gap between Figma and production code — mathematically proportional, accessible, and obsessively refined.",
    themeColor: "#EC4899",
    accentColor: "#F43F5E",
    gradientText: "from-[#EC4899] via-[#F43F5E] to-[#FF4A1C]",
    bullets: [
      {
        title: "Tokenized Component Libraries",
        description: "Strict typographic scales, semantic color variables, and headless accessible primitives synced directly with design tokens.",
        metric: "100%",
        metricLabel: "WCAG AAA Ready",
        highlightId: "tokens"
      },
      {
        title: "Kinetic Micro-Interactions",
        description: "Physics-based gesture feedback, spring animations, and tactile cursor states that elevate the product's perceived quality.",
        metric: "120Hz",
        metricLabel: "Animation Sync",
        highlightId: "physics"
      },
      {
        title: "Rapid Prototyping to Code",
        description: "High-fidelity interactive code sandboxes that reduce friction between design intent and engineering execution.",
        metric: "4x",
        metricLabel: "Hand-off Velocity",
        highlightId: "prototyping"
      }
    ],
    techBadges: ["Figma Tokens", "Tailwind CSS", "Motion / GSAP", "Radix UI", "Storybook", "Design Ops"]
  },
  {
    id: "5" as unknown as number,
    tag: "05 / INFRASTRUCTURE",
    shortTitle: "Cloud & DevOps",
    title: "Cloud & DevOps Infrastructure",
    subtitle: "Zero-trust edge deployments & 99.99% uptime",
    thesis: "Immutable infrastructure, automated GitOps CI/CD pipelines, and auto-scaling multi-region clusters built to withstand unexpected 100x traffic surges.",
    themeColor: "#10B981",
    accentColor: "#3B82F6",
    gradientText: "from-[#10B981] via-[#06B6D4] to-[#3B82F6]",
    bullets: [
      {
        title: "Self-Healing Kubernetes",
        description: "Auto-scaling pod clusters with distributed load balancing, zero-downtime rolling deploys, and automated canary rollbacks.",
        metric: "99.99%",
        metricLabel: "SLA Uptime",
        highlightId: "k8s"
      },
      {
        title: "Multi-Region Distributed Edge",
        description: "Global geo-distributed database replication and CDN routing ensuring data proximity and strict regional compliance.",
        metric: "14+",
        metricLabel: "Edge Hubs",
        highlightId: "edge"
      },
      {
        title: "SOC2 & Zero-Trust Security",
        description: "End-to-end mTLS encryption, least-privilege IAM policies, automated vulnerability scanning, and real-time audit logs.",
        metric: "SOC2",
        metricLabel: "Compliance Standard",
        highlightId: "security"
      }
    ],
    techBadges: ["AWS / GCP", "Terraform / IaC", "Kubernetes", "Docker", "GitHub Actions", "Prometheus"]
  }
];

interface ServicesState {
  currentChapter: number;
  scrollProgress: number;
  chapterProgress: number;
  hoveredBulletIndex: number | null;
  hoveredHighlightId: string | null;
  mousePosition: { x: number; y: number };
  isReducedMotion: boolean;
  activeChapterId: number;
  
  setCurrentChapter: (chapter: number) => void;
  setScrollProgress: (progress: number) => void;
  setChapterProgress: (progress: number) => void;
  setHoveredBullet: (index: number | null, highlightId?: string | null) => void;
  setMousePosition: (x: number, y: number) => void;
  setIsReducedMotion: (reduced: boolean) => void;
  setActiveChapterId: (id: number) => void;
}

export const useServicesStore = create<ServicesState>((set) => ({
  currentChapter: 0,
  scrollProgress: 0,
  chapterProgress: 0,
  hoveredBulletIndex: null,
  hoveredHighlightId: null,
  mousePosition: { x: 0, y: 0 },
  isReducedMotion: false,
  activeChapterId: 0,

  setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setChapterProgress: (progress) => set({ chapterProgress: progress }),
  setHoveredBullet: (index, highlightId = null) => set({ hoveredBulletIndex: index, hoveredHighlightId: highlightId }),
  setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
  setIsReducedMotion: (reduced) => set({ isReducedMotion: reduced }),
  setActiveChapterId: (id) => set({ activeChapterId: id }),
}));
