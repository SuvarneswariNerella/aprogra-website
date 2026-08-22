import React from 'react';
import { 
  Infinity, 
  ArrowUpRight, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  ArrowUp, 
  Sparkles, 
  ShieldCheck, 
  Globe2, 
  Cpu
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="main-footer"
      className="bg-[#FAF8F5] border-t border-[#0B0D12]/10 text-[#0B0D12] pt-10 pb-6 sm:pt-12 sm:pb-8 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* Decorative subtle top border accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#0B0D12]/15 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Directory Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-10 py-8 sm:py-10 border-b border-[#0B0D12]/10">
          
          {/* Brand & Overview Column (Span 4 on large screens) */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="p-1.5 rounded-md bg-[#0B0D12] text-white transition-colors duration-200 group-hover:bg-[#FF4A1C] shadow-xs">
                <Infinity className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-[#0B0D12]">Aprogra</span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#5A5E6E] -mt-1">Technologies</span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#5A5E6E] leading-relaxed max-w-sm">
              Engineering Infinite Possibilities. Full-cycle custom software, autonomous AI platforms, and mission-critical cloud systems built for hyper-scale enterprises.
            </p>

            {/* Live Operational Status */}
            <div className="space-y-2 pt-0.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-[#0B0D12]/10 text-[11px] font-medium text-[#0B0D12] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="font-semibold">All Systems Operational</span>
                <span className="text-[#5A5E6E]">• 99.99% Uptime</span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-[#5A5E6E]">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SOC2 Type II</span>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Globe2 className="w-3.5 h-3.5 text-[#0B0D12]" />
                  <span>San Francisco &amp; Global</span>
                </span>
              </div>
            </div>
          </div>
          
          {/* Products & Platforms Column (Span 3 on large screens) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#0B0D12] flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-[#FF4A1C]" />
              <span>Products &amp; Platforms</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5A5E6E]">
              <li>
                <Link to="/products/school-erp" className="hover:text-[#FF4A1C] transition-colors inline-flex items-center justify-between w-full group">
                  <span className="group-hover:translate-x-0.5 transition-transform">SmartSchool ERP</span>
                  <span className="text-[9px] font-bold bg-[#FF4A1C]/10 text-[#FF4A1C] px-1.5 py-0.5 rounded-full">v3.2</span>
                </Link>
              </li>
              <li>
                <Link to="/products/omnichat" className="hover:text-[#FF4A1C] transition-colors inline-flex items-center justify-between w-full group">
                  <span className="group-hover:translate-x-0.5 transition-transform">OmniChat AI Suite</span>
                  <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Active</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#FF4A1C] transition-colors inline-flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Enterprise Product Suite</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF4A1C]" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#FF4A1C] transition-colors inline-flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Custom Platform Request</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FF4A1C] transition-colors inline-flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Architecture Sandbox</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Capabilities Column (Span 3 on large screens) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#0B0D12]">
              Services &amp; Solutions
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5A5E6E]">
              <li>
                <Link to="/services" className="hover:text-[#FF4A1C] transition-colors inline-flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Full-Stack Cloud Systems</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#FF4A1C] transition-colors inline-flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Autonomous AI &amp; LLM Agents</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#FF4A1C] transition-colors inline-flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Native &amp; Cross-Platform Apps</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#FF4A1C] transition-colors inline-flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">DevOps &amp; Infrastructure</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#FF4A1C] transition-colors inline-flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Legacy Modernization Audits</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Connect Column (Span 2 on large screens) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#0B0D12]">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5A5E6E]">
              <li>
                <Link to="/about" className="hover:text-[#FF4A1C] transition-colors inline-flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">About Aprogra</span>
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-[#FF4A1C] transition-colors inline-flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Engineering Journal</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#FF4A1C] transition-colors inline-flex items-center justify-between w-full group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Careers</span>
                  <span className="text-[9px] font-bold bg-[#0B0D12] text-white px-1.5 py-0.5 rounded-full">Hiring</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FF4A1C] transition-colors inline-flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Contact Architects</span>
                </Link>
              </li>
            </ul>

            <div className="pt-1.5">
              <span className="block text-[11px] font-semibold text-[#0B0D12] mb-2">Follow Engineering</span>
              <div className="flex items-center gap-1.5">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="GitHub"
                  className="w-7 h-7 rounded-md bg-white border border-[#0B0D12]/15 text-[#0B0D12] flex items-center justify-center hover:bg-[#0B0D12] hover:text-white hover:border-[#0B0D12] transition-all shadow-2xs"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn"
                  className="w-7 h-7 rounded-md bg-white border border-[#0B0D12]/15 text-[#0B0D12] flex items-center justify-center hover:bg-[#0B0D12] hover:text-white hover:border-[#0B0D12] transition-all shadow-2xs"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="X Twitter"
                  className="w-7 h-7 rounded-md bg-white border border-[#0B0D12]/15 text-[#0B0D12] flex items-center justify-center hover:bg-[#0B0D12] hover:text-white hover:border-[#0B0D12] transition-all shadow-2xs"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
        
        {/* Bottom Legal, Global Locations & Back To Top */}
        <div className="pt-5 sm:pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-[#5A5E6E]">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-1.5 gap-x-4 sm:gap-x-5">
            <p>© {new Date().getFullYear()} Aprogra Technologies Inc. All rights reserved.</p>
            <span className="hidden sm:inline text-[#0B0D12]/20">•</span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-medium">
              <Link to="/contact" className="hover:text-[#0B0D12] transition-colors">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-[#0B0D12] transition-colors">Terms of Service</Link>
              <Link to="/contact" className="hover:text-[#0B0D12] transition-colors">Security &amp; Compliance</Link>
              <Link to="/contact" className="hover:text-[#0B0D12] transition-colors">Cookie Settings</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] sm:text-[11px] text-[#5A5E6E]">Enterprise High-Availability</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#0B0D12]/15 text-[11px] font-semibold text-[#0B0D12] hover:bg-[#0B0D12] hover:text-white hover:border-[#0B0D12] transition-all shadow-2xs cursor-pointer group"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
