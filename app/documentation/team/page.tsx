"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BrainCircuit, Wrench, Briefcase, ShieldCheck, X, ChevronRight } from 'lucide-react';
import { HoloCard } from '../../../components/HoloCard';

// --- COLOR MAPPING (Para sa Text/Badges lang) ---
const colorVariants: any = {
  cyan: { text: "text-cyan-400", bg: "bg-cyan-400", border: "border-cyan-500", shadow: "shadow-cyan-400", badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  purple: { text: "text-purple-400", bg: "bg-purple-400", border: "border-purple-500", shadow: "shadow-purple-400", badge: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  yellow: { text: "text-yellow-400", bg: "bg-yellow-400", border: "border-yellow-500", shadow: "shadow-yellow-400", badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  green: { text: "text-green-400", bg: "bg-green-400", border: "border-green-500", shadow: "shadow-green-400", badge: "bg-green-500/10 text-green-400 border-green-500/20" },
  orange: { text: "text-orange-400", bg: "bg-orange-400", border: "border-orange-500", shadow: "shadow-orange-400", badge: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  red: { text: "text-red-400", bg: "bg-red-400", border: "border-red-500", shadow: "shadow-red-400", badge: "bg-red-500/10 text-red-400 border-red-500/20" }
};

const team = [
  { 
    name: "Stan Lee Natividad", 
    role: "Artificial Intelligence Developer", 
    image: "/team/lee.jpg", 
    icon: BrainCircuit,
    color: "cyan",
    bio: "Architect of the system's neural pathways. Responsible for training the vibration analysis models and integrating the Python backend with the Next.js interface.",
    stats: [ { label: "Neural Networks", value: 98 }, { label: "System Logic", value: 95 }, { label: "Full Stack", value: 92 } ]
  },
  { 
    name: "Emmanuel Arteta", 
    role: "Project Manager", 
    image: "/team/arteta.jpg", 
    icon: Briefcase,
    color: "purple",
    bio: "The strategic lead ensuring project milestones align with the critical path. Oversees resource allocation, documentation standards, and final system integration.",
    stats: [ { label: "Leadership", value: 96 }, { label: "Planning", value: 94 }, { label: "Resource Mgmt", value: 90 } ]
  },
  { 
    name: "John Raiven Blase", 
    role: "Technical Support", 
    image: "/team/blase.jpg", 
    icon: Wrench,
    color: "yellow",
    bio: "Hardware stability specialist. Ensures the ESP32 and sensor arrays maintain 99.9% uptime during operation and troubleshoots electronic anomalies.",
    stats: [ { label: "Electronics", value: 90 }, { label: "Troubleshooting", value: 95 }, { label: "Maintenance", value: 88 } ]
  },
  { 
    name: "Loren Balbaboco", 
    role: "Lead Mechanical Fabricator", 
    image: "/team/loren.jpg", 
    icon: Wrench,
    color: "green",
    bio: "Master of mechanics. Led the retrofitting of the ball screws and stepper motor mounts, ensuring the physical machine moves with micrometer precision.",
    stats: [ { label: "Fabrication", value: 98 }, { label: "CAD Design", value: 85 }, { label: "Assembly", value: 95 } ]
  },
  { 
    name: "Ryan Vargas", 
    role: "Assistant Mechanical Fabricator", 
    image: "/team/vargas.jpg", 
    icon: Wrench,
    color: "orange",
    bio: "Supports the mechanical assembly and structural integrity of the rig. Specialized in chassis reinforcement and vibration dampening.",
    stats: [ { label: "Welding", value: 90 }, { label: "Material Science", value: 85 }, { label: "Safety Protocols", value: 95 } ]
  },
  { 
    name: "Alexis Pino", 
    role: "Technical Admin", 
    image: "/team/pino.jpg", 
    icon: ShieldCheck,
    color: "red",
    bio: "Guardian of the system data. Manages the database integrity, user access protocols, and ensures compliance with engineering standards.",
    stats: [ { label: "Data Security", value: 92 }, { label: "Administration", value: 90 }, { label: "Compliance", value: 95 } ]
  }
];

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<typeof team[0] | null>(null);

  return (
    <div className="space-y-12 relative">
      
      {/* HEADER */}
      <div className="relative border-b border-white/10 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">The Proponents</h1>
        <p className="text-zinc-400">Select a personnel to view classified data.</p>
        <div className="absolute bottom-0 left-0 w-20 h-1 bg-cyan-500 rounded-full shadow-[0_0_15px_cyan]" />
      </div>

      {/* TEAM GRID */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member, i) => {
            const colors = colorVariants[member.color];
            return (
              <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedMember(member)}
              >
                  <HoloCard className="p-5 flex items-center gap-5 group cursor-pointer hover:bg-white/[0.02] active:scale-[0.98] transition-all">
                      
                      {/* AVATAR */}
                      <div className={`relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-${member.color}-500/50 transition-all duration-500 bg-zinc-900`}>
                          {member.image ? (
                             <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center bg-zinc-800"><span className="text-xl font-bold">{member.name[0]}</span></div>
                          )}
                      </div>
                      
                      {/* INFO */}
                      <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-white transition-colors truncate">
                              {member.name}
                          </h3>
                          <div className="flex items-center gap-2">
                              <member.icon size={14} className={colors.text} />
                              <span className={`text-xs font-mono uppercase ${colors.text} tracking-wide truncate opacity-80`}>
                                  {member.role}
                              </span>
                          </div>
                      </div>

                      <div className="pr-2 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                          <ChevronRight className={colors.text} />
                      </div>
                  </HoloCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* --- CINEMATIC MODAL OVERLAY --- */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            
            {/* Backdrop */}
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedMember(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className={`relative w-full max-w-4xl bg-zinc-900/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row`}
                style={{ borderColor: `var(--${selectedMember.color}-500)` }}
            >
                {/* LEFT: IMAGE & SCANNER */}
                <div className="w-full md:w-1/3 relative h-64 md:h-auto bg-black overflow-hidden">
                    {selectedMember.image && (
                        <Image src={selectedMember.image} alt={selectedMember.name} fill className="object-cover opacity-80" />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent`} />
                    
                    {/* BLUE TINT OVERLAY (Unified Hologram Look) */}
                    <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay" />

                    {/* SCANNER ANIMATION (Fixed to CYAN) */}
                    <motion.div 
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 z-10 opacity-80 bg-cyan-400 shadow-[0_0_20px_#22d3ee]"
                    />
                </div>

                {/* RIGHT: DATA */}
                <div className="flex-1 p-8 relative">
                    <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>

                    <div className="mb-6">
                        {/* Access Granted Badge - Matches Role Color */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase mb-2 ${colorVariants[selectedMember.color].badge}`}>
                            <selectedMember.icon size={12} /> Access Granted
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">{selectedMember.name}</h2>
                        <p className={`${colorVariants[selectedMember.color].text} font-medium`}>{selectedMember.role}</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xs font-mono uppercase text-zinc-500 mb-2">Bio / Clearance</h4>
                            <p className="text-zinc-300 leading-relaxed text-sm md:text-base">{selectedMember.bio}</p>
                        </div>

                        {/* SKILLS / STATS BARS */}
                        <div>
                            <h4 className="text-xs font-mono uppercase text-zinc-500 mb-3">Technical Aptitude</h4>
                            <div className="space-y-3">
                                {selectedMember.stats.map((stat, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs mb-1 text-zinc-300">
                                            <span>{stat.label}</span>
                                            <span>{stat.value}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${stat.value}%` }}
                                                transition={{ delay: 0.3 + (i * 0.1), duration: 1 }}
                                                // Blue Bar for everyone (Unified System Look), or use role color if preferred.
                                                // Using role color here is usually better for stats, but I'll stick to requested 'blue effect'
                                                // Actually, stats look better matching the badge. I'll keep stats colored but scan/image BLUE.
                                                className={`h-full ${colorVariants[selectedMember.color].bg} ${colorVariants[selectedMember.color].shadow}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}