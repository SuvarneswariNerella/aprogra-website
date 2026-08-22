import { Code2, Cpu, Layers, PenTool, Cloud, Database, Shield, Zap, Globe, GitBranch, Terminal, Server } from 'lucide-react';

export interface ArchitectureDetail {
  id: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  accentColor: string;
  icon: any; // Lucide icon
  technologies: {
    category: string;
    items: string[];
  }[];
  architecturePoints: {
    title: string;
    description: string;
    icon: any;
  }[];
  mermaidGraph: string;
}

export const architectureData: Record<string, ArchitectureDetail> = {
  'web-app': {
    id: 'web-app',
    title: 'Web & Mobile Engineering',
    subtitle: 'Sub-45ms Edge & Native Mobile Systems',
    heroDescription: 'Our Web & Mobile architecture focuses on delivering sub-second edge applications and cross-platform native experiences engineered for instantaneous response and maximum reliability.',
    accentColor: '#3B82F6',
    icon: Code2,
    technologies: [
      { category: 'Frontend', items: ['React 19', 'Next.js 15 App Router', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'Mobile', items: ['React Native', 'Expo', 'Flutter'] },
      { category: 'Edge Computing', items: ['Vercel Edge Functions', 'Cloudflare Workers'] },
      { category: 'State & Sync', items: ['Zustand', 'CRDTs', 'SQLite Offline Sync'] },
    ],
    architecturePoints: [
      {
        title: 'Edge-First Rendering',
        description: 'Server components rendered at the edge to guarantee sub-45ms TTFB (Time to First Byte) globally.',
        icon: Globe,
      },
      {
        title: 'Local-First Offline Sync',
        description: 'Data is written locally to SQLite and synced seamlessly in the background using CRDT conflict resolution.',
        icon: Database,
      },
      {
        title: 'Native Performance',
        description: 'React Native pipelines utilizing the new architecture (Fabric) and JSI for 60fps concurrent rendering.',
        icon: Zap,
      },
    ],
    mermaidGraph: `
graph TD
    Client[Client Device] -->|Edge Request| CDN[Global Edge Network]
    CDN -->|Cache Miss| EdgeRuntime[Edge Server Components]
    EdgeRuntime -->|Read/Write| EdgeDB[(Edge Replica DB)]
    EdgeDB -.->|Sync| PrimaryDB[(Primary Database)]
    Client -->|Local Mutate| LocalDB[(Local SQLite)]
    LocalDB -->|Background Sync| PrimaryDB
    
    classDef client fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef edge fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef db fill:#f3e5f5,stroke:#8e24aa,stroke-width:2px;
    
    class Client,LocalDB client;
    class CDN,EdgeRuntime,EdgeDB edge;
    class PrimaryDB db;
    `
  },
  
  'ai-agents': {
    id: 'ai-agents',
    title: 'AI & Agentic Solutions',
    subtitle: 'Autonomous Cognitive Workflows',
    heroDescription: 'Moving beyond generic chat wrappers into verifiable tool-calling pipelines, structured schema outputs, and local SLM inference for complex task execution.',
    accentColor: '#8B5CF6',
    icon: Cpu,
    technologies: [
      { category: 'Language Models', items: ['Gemini 1.5 Pro/Flash', 'Claude 3.5 Sonnet', 'Llama 3', 'Local SLMs'] },
      { category: 'Frameworks', items: ['LangChain', 'LlamaIndex', 'AutoGen', 'Custom Reasoning Loops'] },
      { category: 'Vector Stores', items: ['Pinecone', 'Qdrant', 'pgvector'] },
      { category: 'Observability', items: ['LangSmith', 'PromptFoo Eval', 'DataDog'] },
    ],
    architecturePoints: [
      {
        title: 'Multi-Agent Orchestration',
        description: 'Hierarchical agent architectures where planner agents delegate specialized tasks to worker agents with specific tool access.',
        icon: GitBranch,
      },
      {
        title: 'Structured Output Enforcement',
        description: 'Constrained generation techniques guaranteeing 100% adherence to complex JSON schemas for API ingestion.',
        icon: Code2,
      },
      {
        title: 'Air-Gapped SLM Inference',
        description: 'Locally deployed Small Language Models on secure VPCs ensuring zero data leakage for highly sensitive PII.',
        icon: Shield,
      },
    ],
    mermaidGraph: `
graph TD
    User[User Request] --> Orchestrator[Planner Agent]
    Orchestrator -->|Decomposes Task| Router{Task Router}
    
    Router -->|RAG| WorkerA[Research Agent]
    Router -->|Code Execution| WorkerB[Code Interpreter Agent]
    Router -->|External API| WorkerC[Action Agent]
    
    WorkerA --> VectorDB[(Vector DB)]
    WorkerB --> Sandbox[Secure Docker Sandbox]
    WorkerC --> APIs[External APIs]
    
    WorkerA -->|Result| Orchestrator
    WorkerB -->|Result| Orchestrator
    WorkerC -->|Result| Orchestrator
    
    Orchestrator -->|Synthesized JSON| Output[Structured Response]
    
    classDef ai fill:#ede7f6,stroke:#673ab7,stroke-width:2px;
    classDef data fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    
    class Orchestrator,WorkerA,WorkerB,WorkerC,Router ai;
    class VectorDB,Output data;
    `
  },
  
  'saas-product': {
    id: 'saas-product',
    title: 'Product & SaaS Engines',
    subtitle: 'Multi-Tenant Cloud Architecture',
    heroDescription: 'Full-lifecycle software engineering from raw data schema to scalable multi-tenant execution with automated Stripe metering and subscription logic.',
    accentColor: '#06B6D4',
    icon: Layers,
    technologies: [
      { category: 'Backend Engine', items: ['Node.js', 'Go', 'PostgreSQL', 'Redis'] },
      { category: 'Billing & Identity', items: ['Stripe Billing', 'Clerk / Auth0', 'RBAC Middleware'] },
      { category: 'Queues & Events', items: ['RabbitMQ', 'Kafka', 'BullMQ'] },
      { category: 'APIs', items: ['GraphQL', 'tRPC', 'RESTful OpenAPI'] },
    ],
    architecturePoints: [
      {
        title: 'Row-Level Security (RLS)',
        description: 'Hardened multi-tenancy utilizing PostgreSQL RLS policies guaranteeing absolute data isolation between tenant organizations.',
        icon: Shield,
      },
      {
        title: 'Event-Driven Microservices',
        description: 'Asynchronous event bus architecture enabling highly decoupled, scalable background processing for intensive tasks.',
        icon: Zap,
      },
      {
        title: 'Usage-Based Metering',
        description: 'High-throughput Redis ingestion pipelines capturing micro-transactions for accurate Stripe usage-based billing syncs.',
        icon: Database,
      },
    ],
    mermaidGraph: `
graph TD
    Client[SaaS Tenant] --> API[API Gateway]
    API --> Auth[Identity Provider / JWT Check]
    Auth --> Core[Core Monolith/Microservices]
    
    Core -->|Read/Write| DB[(PostgreSQL + RLS)]
    Core -->|Cache/Rate Limit| Cache[(Redis Cluster)]
    
    Core -->|Publish Event| MessageBus[Message Broker]
    MessageBus --> WorkerA[Background Job Worker]
    MessageBus --> WorkerB[Webhooks Dispatcher]
    
    WorkerA --> DB
    WorkerA -.->|Usage Analytics| Stripe[Stripe Billing Engine]
    
    classDef core fill:#e3f2fd,stroke:#1565c0,stroke-width:2px;
    classDef db fill:#fbe9e7,stroke:#d84315,stroke-width:2px;
    
    class API,Auth,Core,WorkerA,WorkerB core;
    class DB,Cache,MessageBus db;
    `
  },
  
  'design-systems': {
    id: 'design-systems',
    title: 'UI/UX & Design Systems',
    subtitle: 'Systematic Visual Foundations',
    heroDescription: 'Tokenized, multi-platform component ecosystems with mathematical typography scaling, WCAG accessibility, and fluid kinetic micro-interactions.',
    accentColor: '#F43F5E',
    icon: PenTool,
    technologies: [
      { category: 'Design Tools', items: ['Figma Variables', 'Protopie', 'Spline 3D'] },
      { category: 'Component Libraries', items: ['Radix UI', 'Headless UI', 'React Aria'] },
      { category: 'Styling Engines', items: ['Tailwind CSS', 'CSS Modules', 'Stitches'] },
      { category: 'Documentation', items: ['Storybook', 'Zeroheight', 'MDX'] },
    ],
    architecturePoints: [
      {
        title: 'Figma to Code Pipeline',
        description: 'Automated CI/CD pipelines extracting Figma Design Tokens directly into CSS variable structures.',
        icon: Terminal,
      },
      {
        title: 'Headless Architecture',
        description: 'Decoupling component logic from visual styling using Radix UI primitives for ultimate customization and accessibility.',
        icon: Layers,
      },
      {
        title: 'Kinetic Motion Systems',
        description: 'Spring-physics based animation choreographies using Framer Motion for natural, fluid user feedback.',
        icon: Zap,
      },
    ],
    mermaidGraph: `
graph TD
    Figma[Figma Variables] -->|Token Export| TokenRepo[Design Token Repo]
    TokenRepo -->|CI/CD Pipeline| CSSVars[CSS/Tailwind Variables]
    
    Headless[Headless Primitives] --> Component[React Component]
    CSSVars --> Component
    Motion[Framer Motion Physics] --> Component
    
    Component --> Storybook[Storybook Catalog]
    Component --> App[Production App]
    
    classDef design fill:#fce4ec,stroke:#c2185b,stroke-width:2px;
    classDef dev fill:#e8eaf6,stroke:#3f51b5,stroke-width:2px;
    
    class Figma,TokenRepo design;
    class Headless,CSSVars,Component,Storybook,App dev;
    `
  },
  
  'cloud-devops': {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Infra',
    subtitle: 'Zero-Trust Sovereign Operations',
    heroDescription: 'Resilient cloud infrastructure with declarative Terraform IaC, self-healing Kubernetes clusters, blue-green deployments, and military-grade edge security.',
    accentColor: '#10B981',
    icon: Cloud,
    technologies: [
      { category: 'Infrastructure as Code', items: ['Terraform', 'Pulumi', 'AWS CloudFormation'] },
      { category: 'Container Orchestration', items: ['Kubernetes (EKS/GKE)', 'Docker', 'Helm'] },
      { category: 'CI/CD & Observability', items: ['GitHub Actions', 'ArgoCD', 'Prometheus', 'Grafana'] },
      { category: 'Cloud Providers', items: ['AWS', 'Google Cloud', 'Cloudflare', 'Vercel'] },
    ],
    architecturePoints: [
      {
        title: 'GitOps Workflows',
        description: 'Infrastructure state stored exclusively in Git, with ArgoCD automatically syncing cluster states to the repository truth.',
        icon: GitBranch,
      },
      {
        title: 'Zero-Trust Networking',
        description: 'Mutual TLS (mTLS) enforced between all internal microservices via Istio service mesh.',
        icon: Shield,
      },
      {
        title: 'Blue-Green Deployments',
        description: 'Zero-downtime rolling updates with instant rollback capabilities managed through Kubernetes traffic routing.',
        icon: Server,
      },
    ],
    mermaidGraph: `
graph TD
    Dev[Developer Push] --> GitHub[GitHub Repo]
    GitHub -->|Trigger| Actions[CI Pipeline / Tests]
    Actions -->|Build Image| Registry[(Container Registry)]
    
    GitHub -.->|Config Changes| GitOpsRepo[GitOps Config Repo]
    
    subgraph Kubernetes Cluster
        ArgoCD[ArgoCD / Flux] -->|Watch| GitOpsRepo
        ArgoCD -->|Deploy/Sync| K8s[K8s Deployments]
        
        Ingress[Ingress Controller] -->|Traffic| ServiceA[Microservice A]
        Ingress -->|Traffic| ServiceB[Microservice B]
        
        ServiceA <-->|mTLS Mesh| ServiceB
    end
    
    Registry --> ArgoCD
    
    classDef git fill:#f3e5f5,stroke:#8e24aa,stroke-width:2px;
    classDef infra fill:#e0f2f1,stroke:#00796b,stroke-width:2px;
    
    class GitHub,GitOpsRepo,Actions,Registry git;
    class ArgoCD,K8s,Ingress,ServiceA,ServiceB infra;
    `
  }
};
