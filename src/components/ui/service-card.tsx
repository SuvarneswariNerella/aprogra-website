"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { useState } from "react";

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  value?: string;
  trend?: string;
  gradient?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  gradient,
}: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Use a fallback gradient if none provided, though demoServices has them.
  const gradientClass = gradient || "bg-gradient-to-br from-blue-500/10 to-purple-500/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="h-full"
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] bg-white border border-gray-100 p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:border-gray-200 transition-colors duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 cursor-pointer h-full"
        tabIndex={0}
      >
        {/* Soft Background Gradient Shift on Hover */}
        <div 
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out ${gradientClass}`}
        />

        {/* Floating gradient blob for subtle depth */}
        <div 
          className={`absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-5 blur-3xl transition-transform duration-700 ease-out ${gradientClass} group-hover:scale-150 group-hover:opacity-10`} 
        />

        <div className="flex flex-col h-full relative z-10">
          <motion.div 
            className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50/80 backdrop-blur-sm border border-gray-100/50 text-gray-700 shadow-sm transition-colors duration-500 group-hover:bg-white group-hover:border-gray-200"
            animate={isHovered && !shouldReduceMotion ? { scale: 1.05, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Icon className="h-7 w-7 stroke-[1.5]" />
          </motion.div>
          
          <div className="flex-grow">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors duration-500">
              {title}
            </h3>
            <p className="text-base text-gray-500 leading-relaxed font-medium group-hover:text-gray-600 transition-colors duration-500">
              {description}
            </p>
          </div>

          <div className="mt-8 overflow-hidden">
            <motion.div 
              className="flex items-center text-sm font-bold text-blue-600 uppercase tracking-wider"
              initial={{ x: -10, opacity: 0 }}
              animate={isHovered ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              <span className="mr-2">Learn more</span>
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
