"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, Zap, Database, Hexagon, History, ChevronRight } from 'lucide-react';

// --- 1. SPOTLIGHT CARD COMPONENT ---
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34, 211, 238, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- 2. METEOR EFFECT ---
const Meteors = ({ number = 20 }: { number?: number }) => {
  const styles = [...new Array(number)].map(() => ({
    top: Math.floor(Math.random() * 100) + "%",
    left: Math.floor(Math.random() * 100) + "%",
    animationDelay: Math.random() * 1 + 0.2 + "s",
    animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
  }));

  return (
    <>
      {styles.map((style, idx) => (
        <span
          key={idx}
          className="pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          style={style}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </>
  );
};

// --- MAIN PAGE ---
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020204] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* BACKGROUND LAYERS */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-grid-small-white/[0.2] mask-radial-faded" />
        <Meteors number={20} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full opacity-20" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020204]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Hexagon className="text-cyan-500 fill-cyan-500/10 animate-pulse-glow" size={24} />
            <span className="font-bold tracking-tight text-xl">CNC<span className="text-white/40">QUANTUM</span></span>
          </div>
          <div className="flex items-center gap-8">
             <Link href="/documentation/overview" className="hidden md:block text-sm text-zinc-400 hover:text-white transition-colors">
                Research Docs
             </Link>
             <Link href="/dashboard">
                <button className="group relative inline-flex h-9 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl group-hover:bg-slate-900 transition-colors">
                    Launch Console
                  </span>
                </button>
             </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6">
        
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto text-center mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 mb-8 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></span>
            PROJECT INTELLI-MILL V1.0
          </motion.div>
          
          {/* THESIS TITLE REPLACEMENT */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-black tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10 drop-shadow-2xl leading-tight"
          >
            CNC RESTORATION OF <br />
            NC MILLING MACHINE <br />
            <span className="text-cyan-500 inline-block relative text-3xl md:text-6xl mt-2">
              WITH AI & QUANTUM COMPUTING
              <div className="absolute -inset-2 bg-cyan-500/20 blur-xl -z-10" />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            Integrating <span className="text-white font-medium">Real-Time Data Visualization</span> for predictive maintenance and hyper-optimized pathing.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/dashboard" className="w-full sm:w-auto">
              <button className="w-full relative px-8 py-4 bg-white text-black text-lg font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
                Initialize System <ChevronRight size={20} />
              </button>
            </Link>
            <Link href="/documentation/overview" className="w-full sm:w-auto">
              <button className="w-full px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 text-zinc-300 font-medium transition-colors flex items-center justify-center gap-2">
                Read The Research
              </button>
            </Link>
          </motion.div>
        </section>

        {/* FEATURES GRID (BENTO STYLE) */}
        <section className="max-w-7xl mx-auto mb-40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Feature 1 */}
            <SpotlightCard className="p-8 col-span-1 md:col-span-2">
              <div className="h-12 w-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20">
                <Activity className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Predictive Diagnostics</h3>
              <p className="text-zinc-400 leading-relaxed">
                Using advanced Neural Networks to analyze micro-vibrations in the milling spindle. The system predicts tool failure 40 hours before it occurs, preventing costly damage.
              </p>
            </SpotlightCard>

            {/* Feature 2 */}
            <SpotlightCard className="p-8 col-span-1">
              <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
                <Zap className="text-purple-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Quantum QAOA</h3>
              <p className="text-zinc-400 leading-relaxed">
                Solving the "Travel Salesman Problem" for drill-pathing using Quantum Approximate Optimization Algorithm.
              </p>
            </SpotlightCard>

             {/* Feature 3 */}
             <SpotlightCard className="p-8 col-span-1">
              <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20">
                <Database className="text-green-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Digital Twin</h3>
              <p className="text-zinc-400 leading-relaxed">
                A 1:1 synchronized 3D replica of the hardware state, powered by Three.js and IoT webhooks.
              </p>
            </SpotlightCard>

            {/* Feature 4 */}
            <SpotlightCard className="p-8 col-span-1 md:col-span-2 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-4">The Research Team</h3>
                <div className="flex -space-x-4 mb-6">
                  {["S", "E", "J", "L", "R"].map((l, i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-sm font-bold text-white">
                      {l}
                    </div>
                  ))}
                </div>
                <p className="text-zinc-400 text-sm">Led by Stan Lee Natividad</p>
              </div>
              <Link href="/documentation/team">
                <button className="px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors text-sm">
                    Meet the Proponents
                </button>
              </Link>
            </SpotlightCard>
          </div>
        </section>

        {/* LOGS SECTION */}
        <section className="max-w-4xl mx-auto border-t border-white/10 pt-20 text-center">
            <div className="inline-flex items-center gap-2 mb-8 text-zinc-500 uppercase tracking-widest text-sm font-medium">
                <History size={16} /> System Development Logs
            </div>
            <div className="space-y-2">
                {[
                    { phase: "Phase 05", task: "Deployment & Final Defense", status: "Pending", color: "text-yellow-500" },
                    { phase: "Phase 04", task: "Quantum Algorithm Integration", status: "Complete", color: "text-green-500" },
                    { phase: "Phase 03", task: "AI Model Training (Vibration)", status: "Complete", color: "text-green-500" },
                    { phase: "Phase 02", task: "Hardware Retrofitting", status: "Complete", color: "text-green-500" },
                ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 transition-colors group">
                        <span className="text-zinc-500 font-mono text-sm">{item.phase}</span>
                        <span className="text-zinc-300 font-medium group-hover:text-white transition-colors">{item.task}</span>
                        <span className={`text-xs ${item.color} font-mono uppercase`}>{item.status}</span>
                    </div>
                ))}
            </div>
        </section>

      </main>
      
      <footer className="py-12 text-center border-t border-white/5 mt-20 bg-[#020204]">
        <p className="text-zinc-600 text-xs uppercase tracking-widest font-medium">
            Designed & Engineered by Stan Lee Natividad © 2025
        </p>
      </footer>
    </div>
  );
}