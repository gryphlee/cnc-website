"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Zap, Cpu } from 'lucide-react';

// Tumatanggap na ngayon ng props galing sa Dashboard
export default function QuantumMap({ isQuantum, onToggle }: { isQuantum: boolean, onToggle: () => void }) {
  const [isComputing, setIsComputing] = useState(false);

  // Points data
  const points = [
    { x: 20, y: 70, id: 1 }, { x: 50, y: 30, id: 2 },
    { x: 80, y: 60, id: 3 }, { x: 60, y: 90, id: 4 }, { x: 30, y: 50, id: 5 },
  ];
  
  const classicPath = [0, 4, 1, 2, 3, 0]; 
  const quantumPath = [0, 4, 1, 3, 2, 0]; 

  const handleToggle = () => {
    setIsComputing(true);
    setTimeout(() => {
      onToggle(); // Ipagpaalam sa Dashboard na nag-switch na
      setIsComputing(false);
    }, 800);
  };

  const activePath = isQuantum ? quantumPath : classicPath;
  const color = isQuantum ? '#a855f7' : '#64748b';

  return (
    <div className="h-full w-full flex flex-col relative">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 z-20">
        <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Optimization Engine</span>
            <div className="flex items-center gap-2">
                {isComputing ? (
                    <span className="text-xs text-yellow-400 font-mono animate-pulse">COMPUTING...</span>
                ) : (
                    <span className={`text-xs font-mono font-bold ${isQuantum ? 'text-purple-400' : 'text-zinc-400'}`}>
                        {isQuantum ? 'QPU: ENTANGLED' : 'CPU: LINEAR'}
                    </span>
                )}
            </div>
        </div>

        <button 
          onClick={handleToggle}
          className={`px-3 py-1 rounded flex items-center gap-2 transition-all text-[10px] font-bold border ${
            isQuantum 
            ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
            : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'
          }`}
        >
          {isQuantum ? <Zap size={12} /> : <Cpu size={12} />}
          {isQuantum ? 'QUANTUM ON' : 'CLASSIC'}
        </button>
      </div>

      {/* MAP VISUALIZER */}
      <div className="flex-1 relative bg-black/40 rounded-lg border border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        <svg className="w-full h-full p-4" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Paths & Dots rendering here (Simplified for brevity, same logic as before) */}
            {!isComputing && (
                <motion.path
                    d={`M ${activePath.map(i => `${points[i].x} ${points[i].y}`).join(' L ')}`}
                    fill="none" stroke={color} strokeWidth={isQuantum ? "1.5" : "1"}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: isQuantum ? 0.5 : 2 }}
                />
            )}
            {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="2" fill={isQuantum ? '#a855f7' : '#555'} />
            ))}
        </svg>

        <AnimatePresence>
            {isComputing && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-30">
                    <span className="text-[10px] text-cyan-400 font-mono animate-pulse">OPTIMIZING PATH...</span>
                </div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}