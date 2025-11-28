"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hexagon, Terminal, CheckCircle2, Cpu, Wifi } from 'lucide-react';
import { useSFX } from '../hooks/useSFX';

const bootLogs = [
  "INITIALIZING INTELLI-MILL KERNEL...",
  "LOADING NEURAL NETWORK WEIGHTS...",
  "CONNECTING TO QUANTUM CLOUD...",
  "CALIBRATING SENSORS [X, Y, Z]...",
  "VERIFYING SECURITY PROTOCOLS...",
  "ESTABLISHING SECURE HANDSHAKE...",
  "SYSTEM OPTIMAL. WELCOME USER."
];

export default function BootLoader() {
  const { playStartup } = useSFX();
  const [isLoading, setIsLoading] = useState(true);
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    playStartup();

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return prev + Math.random() * 10; 
      });
    }, 150);

    const logTimer = setInterval(() => {
      setLogIndex((prev) => (prev < bootLogs.length - 1 ? prev + 1 : prev));
    }, 400);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, [playStartup]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="bootloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-center font-mono text-cyan-500 cursor-wait"
        >
          <div className="mb-12 relative">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 rounded-full border-t-2 border-cyan-500/30 w-24 h-24 -top-2 -left-2"
            />
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 rounded-full border-b-2 border-purple-500/30 w-32 h-32 -top-6 -left-6"
            />
            <Hexagon size={80} className="text-white fill-white/5 animate-pulse" />
          </div>

          <h1 className="text-2xl md:text-4xl font-black tracking-widest text-white mb-2">
            INTELLI-MILL <span className="text-cyan-500">OS</span>
          </h1>
          <p className="text-xs text-zinc-500 tracking-[0.5em] mb-12 uppercase">
            Quantum Restoration Environment
          </p>

          <div className="w-64 md:w-96 h-1 bg-zinc-900 rounded-full overflow-hidden relative mb-4">
            <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_15px_cyan]"
                style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between w-64 md:w-96 text-[10px] text-cyan-400 font-bold mb-8">
            <span>LOADING MODULES...</span>
            <span>{Math.min(100, Math.floor(progress))}%</span>
          </div>

          <div className="h-24 flex flex-col items-center justify-end space-y-1 overflow-hidden">
            {bootLogs.slice(0, logIndex + 1).map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-xs flex items-center gap-2 ${i === logIndex ? "text-white" : "text-zinc-600"}`}
              >
                {i === logIndex && <Terminal size={10} className="animate-pulse" />}
                {log}
                {i < logIndex && <CheckCircle2 size={10} className="text-green-500" />}
              </motion.div>
            ))}
          </div>

          <div className="absolute bottom-8 flex gap-8 text-[10px] text-zinc-600 uppercase tracking-widest">
            <div className="flex items-center gap-2"><Cpu size={12} /> CPU: OK</div>
            <div className="flex items-center gap-2"><Wifi size={12} /> NET: SECURE</div>
            <div className="flex items-center gap-2">V.1.0.4</div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}