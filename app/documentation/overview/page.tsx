"use client";

import React from 'react';
import Image from 'next/image'; // Import Image
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Cpu, Activity } from 'lucide-react';
import { HoloCard } from '../../../components/HoloCard';

export default function OverviewPage() {
  return (
    <div className="space-y-12">
      
      {/* HERO HEADER */}
      <div className="relative">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4"
        >
            <Sparkles size={12} /> PROJECT INTELLI-MILL
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          <span className="text-white">PROJECT</span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-text-gradient bg-300%">
            OVERVIEW
          </span>
        </h1>
        
        <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
           Development of a CNC Milling Machine with AI, Quantum Simulation, and Real-Time Data Visualization.
        </p>
      </div>

      {/* MAIN CONTENT CARD */}
      <section>
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <BookOpen className="text-blue-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">The Abstract</h2>
        </div>

        <HoloCard className="p-8 md:p-10">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
                
                {/* LEFT: TEXT CONTENT */}
                <div className="flex-1 space-y-6 text-zinc-300 leading-relaxed text-lg">
                    <p>
                        This research focuses on the development of an <strong className="text-white">advanced CNC milling machine</strong> that integrates artificial intelligence and simulated quantum computing. 
                    </p>
                    <p>
                        The goal is to enhance manufacturing processes by creating a system that <span className="text-cyan-400">optimizes toolpaths</span>, <span className="text-purple-400">predicts machine failures</span>, and provides <span className="text-green-400">real-time data visualization</span>, paving the way for future intelligent manufacturing.
                    </p>
                    
                    {/* Mini Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="p-4 rounded-lg bg-black/40 border border-white/5">
                            <div className="text-xs text-zinc-500 uppercase font-mono mb-1">Target Efficiency</div>
                            <div className="text-2xl font-bold text-cyan-400">+45%</div>
                        </div>
                        <div className="p-4 rounded-lg bg-black/40 border border-white/5">
                            <div className="text-xs text-zinc-500 uppercase font-mono mb-1">Failure Prediction</div>
                            <div className="text-2xl font-bold text-purple-400">98.5%</div>
                        </div>
                    </div>
                </div>
                
                {/* RIGHT: MACHINE IMAGE WITH SCANNER */}
                <div className="w-full lg:w-1/2 aspect-video lg:aspect-square relative rounded-2xl overflow-hidden border-2 border-white/10 bg-black group shadow-2xl">
                    
                    {/* THE IMAGE */}
                    <Image 
                        src="/project/cnc.jpg" // Make sure file is in public/project/cnc.jpg
                        alt="CNC Machine Prototype"
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    {/* OVERLAYS */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay" />
                    
                    {/* GRID OVERLAY */}
                    <div className="absolute inset-0 bg-grid-small-white/[0.1] opacity-50" />

                    {/* SCANNER ANIMATION (The Blue Laser) */}
                    <motion.div 
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_20px_#22d3ee] z-10 opacity-70"
                    />

                    {/* FLOATING HUD ELEMENT (Right Top) */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-cyan-400 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        LIVE FEED
                    </div>

                    {/* CORNER BRACKETS (HUD STYLE) */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg" />
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />
                    <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg" />
                    <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg" />

                </div>
            </div>
        </HoloCard>
      </section>

    </div>
  );
}