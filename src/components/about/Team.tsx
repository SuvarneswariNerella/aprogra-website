import { InteractivePhotoStack, PhotoStackItem } from '@/components/ui/photo-stack';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const teamMembers: PhotoStackItem[] = [
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
    name: "Alexandre Vane",
    role: "Founder & Chief Architect",
    bio: "Ex-Google Staff Architect with 12+ years building distributed cloud platforms & high-throughput APIs.",
    skills: ["Cloud Arch", "Distributed Systems", "Rust & Go"],
    social: { linkedin: "https://linkedin.com", github: "https://github.com", twitter: "https://twitter.com" }
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop",
    name: "Isabella Chen",
    role: "Head of Product & Design",
    bio: "Pioneer in motion graphics & spatial UI design. Transformed digital products for 30+ enterprise firms.",
    skills: ["Design Systems", "Motion Graphics", "UX Strategy"],
    social: { linkedin: "https://linkedin.com", github: "https://github.com", twitter: "https://twitter.com" }
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    name: "Sophia Thorne",
    role: "Director of AI Research",
    bio: "Specializing in custom LLM fine-tuning, autonomous agentic workflows, and edge neural deployments.",
    skills: ["LLMs & RAG", "Machine Learning", "Autonomous Agents"],
    social: { linkedin: "https://linkedin.com", github: "https://github.com", twitter: "https://twitter.com" }
  },
  {
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    name: "Mia Rostova",
    role: "Lead Full-Stack Engineer",
    bio: "Polyglot software leader specializing in React 19, TypeScript, WebAudio, and frontend state engines.",
    skills: ["React / Next.js", "TypeScript", "State Engines"],
    social: { linkedin: "https://linkedin.com", github: "https://github.com", twitter: "https://twitter.com" }
  },
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop",
    name: "Charlotte Vance",
    role: "Principal Infrastructure Lead",
    bio: "Cloud-native infrastructure specialist building zero-downtime multi-region Kubernetes deployments.",
    skills: ["Kubernetes", "AWS / GCP", "Terraform"],
    social: { linkedin: "https://linkedin.com", github: "https://github.com", twitter: "https://twitter.com" }
  }
];

export default function Team() {
  return (
    <section className="min-h-screen py-24 md:py-32 px-6 bg-[#FAF8F5] text-[#0B0D12] flex flex-col justify-center border-t border-[#0B0D12]/10 relative overflow-hidden m-0 mt-0 mb-0">
      
      <div className="max-w-7xl mx-auto w-full space-y-16 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#0B0D12]/15 bg-white text-badge text-[#0B0D12]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4A1C]" />
            <span>World-Class Engineers &amp; Designers</span>
          </div>

          <h2 className="text-h2 text-[#0B0D12]">
            Meet the <span className="text-[#FF4A1C]">Aprogra Team</span>
          </h2>

          <p className="text-body-lg text-[#0B0D12]/70">
            Hover over the photo stack to scatter the team and reveal member bios, skills, and background information directly on each card.
          </p>
        </motion.div>

        {/* Interactive Photo Stack Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="py-4"
        >
          <InteractivePhotoStack
            items={teamMembers}
            title="Our Leadership & Core Architects"
          />
        </motion.div>

      </div>
    </section>
  );
}
