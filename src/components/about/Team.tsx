import React from 'react';
import { InteractivePhotoStack, PhotoStackItem } from '@/components/ui/photo-stack';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { useTeamMembers } from '@/lib/strapi';

export default function Team() {
  const { teamMembers } = useTeamMembers();

  const stackItems: PhotoStackItem[] = teamMembers.map((m) => ({
    src: m.photoUrl,
    name: m.name,
    role: m.role,
    bio: m.bio,
    skills: m.skills,
    social: {
      linkedin: m.linkedinUrl || 'https://linkedin.com',
      github: m.githubUrl || 'https://github.com',
      twitter: m.twitterUrl || 'https://twitter.com',
    },
  }));

  return (
    <section className="min-h-screen py-24 md:py-32 px-6 bg-[#FAF8F5] text-[#0B0D12] flex flex-col justify-center border-t border-[#0B0D12]/10 relative overflow-hidden m-0 mt-0 mb-0">
      
      <div className="max-w-7xl mx-auto w-full space-y-16 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto space-y-4">
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
        </ScrollReveal>

        {/* Interactive Photo Stack Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="py-4"
        >
          <InteractivePhotoStack
            items={stackItems}
            title="Our Leadership & Core Architects"
          />
        </motion.div>

      </div>
    </section>
  );
}
