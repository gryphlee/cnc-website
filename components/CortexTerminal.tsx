"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Send, Cpu, ArrowRightCircle, Zap, ShieldCheck, Activity, Mic, MicOff } from 'lucide-react';
import { useSFX } from '../hooks/useSFX';
import { useVoice } from '../hooks/useVoice';
import { useSystem } from './SystemContext';

const randomResponses = (key: string) => {
  const bank: any = {
    greeting: [
      "IDENTITY VERIFIED. WELCOME BACK, ADMINISTRATOR.",
      "CORTEX SYSTEMS ONLINE. AWAITING DIRECTIVE.",
      "NEURAL INTERFACE ACTIVE. HOW MAY I ASSIST?",
      "GOOD DAY, STAN LEE. SYSTEMS ARE OPTIMAL."
    ],
    unknown: [
      "COMMAND UNRECOGNIZED. PLEASE REFINE SYNTAX.",
      "ERROR: INPUT DOES NOT MATCH PROTOCOLS. TYPE 'HELP'.",
      "DATA FRAGMENT NOT FOUND. QUERY REJECTED.",
      "ACCESS DENIED. COMMAND INVALID."
    ],
    processing: [
      "PARSING NATURAL LANGUAGE...",
      "ACCESSING QUANTUM CLOUD...",
      "RETRIEVING ENCRYPTED DATA...",
      "RUNNING HEURISTIC ANALYSIS...",
      "DECRYPTING SECURE FILES..."
    ]
  };
  const list = bank[key] || bank.unknown;
  return list[Math.floor(Math.random() * list.length)];
};

const navPaths: any = {
  "dashboard": "/dashboard", "console": "/dashboard", "main": "/dashboard",
  "home": "/", "landing": "/",
  "team": "/documentation/team", "proponents": "/documentation/team", "members": "/documentation/team",
  "overview": "/documentation/overview", "abstract": "/documentation/overview", "about": "/documentation/overview",
  "timeline": "/documentation/timeline", "schedule": "/documentation/timeline", "gantt": "/documentation/timeline",
  "objectives": "/documentation/objectives", "goals": "/documentation/objectives"
};

export default function CortexTerminal() {
  const router = useRouter();
  const { setQuantum, setCritical } = useSystem();
  const { playClick, playHover, playStartup } = useSFX();
  const { isListening, toggleVoice, transcript } = useVoice(); 
  
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState([
    { type: 'system', text: "INITIALIZING CORTEX V1.0.4..." },
    { type: 'system', text: "SECURE CONNECTION ESTABLISHED." },
    { type: 'ai', text: "SYSTEM READY. AWAITING INPUT." }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  const simulateTyping = (text: string, type: 'ai' | 'system' | 'success' | 'error' = 'ai') => {
    setIsTyping(true);
    let currentText = "";
    const speed = 20; 

    // Add "Processing" line first
    const processingMsg = randomResponses('processing');
    setHistory(prev => [...prev, { type: 'process', text: `> ${processingMsg}` }]);

    setTimeout(() => {
        // Remove processing line and start typing real answer
        setHistory(prev => prev.slice(0, -1)); // Remove last
        setHistory(prev => [...prev, { type, text: "" }]); // Add empty slot

        let i = 0;
        const interval = setInterval(() => {
            currentText += text.charAt(i);
            setHistory(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1].text = currentText;
                return newHistory;
            });
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, speed);
    }, 800); // Delay for "thinking"
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    playClick();
    const rawInput = input;
    const cmd = input.toLowerCase().trim();
    
    setHistory(prev => [...prev, { type: 'user', text: rawInput }]);
    setInput("");

    // --- INTELLIGENCE ENGINE ---

    // 1. GREETINGS
    if (['hi', 'hello', 'hey', 'greetings', 'hola'].some(w => cmd.includes(w))) {
        simulateTyping(randomResponses('greeting'), 'ai');
        return;
    }

    // 2. IDENTITY
    if (cmd.includes("who are you") || cmd.includes("identify")) {
        simulateTyping("I AM CORTEX. A SPECIALIZED ARTIFICIAL INTELLIGENCE DESIGNED FOR CNC RESTORATION, QUANTUM SIMULATION, AND REAL-TIME ANALYTICS.", 'ai');
        return;
    }

    // 3. NAVIGATION
    const pathKey = Object.keys(navPaths).find(key => cmd.includes(key));
    if (pathKey) {
        simulateTyping(`CONFIRMED. INITIATING TRANSFER TO: ${pathKey.toUpperCase()} MODULE.`, 'success');
        setTimeout(() => {
            setIsOpen(false);
            router.push(navPaths[pathKey]);
        }, 2500);
        return;
    }

    // 4. SYSTEM COMMANDS
    if (cmd.includes("activate quantum") || cmd.includes("quantum mode")) {
        playStartup();
        setQuantum(true);
        simulateTyping("QUANTUM CORE: ENGAGED. SUPERPOSITION ESTABLISHED.", 'success');
        if (window.location.pathname !== '/dashboard') router.push('/dashboard');
        return;
    }

    if (cmd.includes("disable quantum") || cmd.includes("classic mode")) {
        setQuantum(false);
        simulateTyping("DISENGAGING QUANTUM CORE. REVERTING TO LINEAR PROCESSING.", 'system');
        return;
    }

    if (cmd.includes("simulate failure") || cmd.includes("critical")) {
        setCritical(true);
        simulateTyping("WARNING: SIMULATING CATASTROPHIC FAILURE EVENT. SAFETY PROTOCOLS BYPASSED.", 'error');
        if (window.location.pathname !== '/dashboard') router.push('/dashboard');
        return;
    }

    if (cmd.includes("stabilize") || cmd.includes("reset")) {
        setCritical(false);
        simulateTyping("SYSTEM STABILIZED. ALL METRICS RETURNING TO OPTIMAL LEVELS.", 'success');
        return;
    }

    if (cmd === "clear") {
        setHistory([{ type: 'system', text: "CONSOLE CLEARED." }]);
        return;
    }

    if (cmd.includes("help")) {
        simulateTyping("AVAILABLE PROTOCOLS: [NAVIGATE <PAGE>] [ACTIVATE QUANTUM] [SIMULATE FAILURE] [STATUS REPORT] [CHECK <METRIC>]", 'system');
        return;
    }

    // 5. DATA QUERIES
    if (cmd.includes("vibration")) {
        simulateTyping("VIBRATION ANALYSIS: 0.04 mm/s (OPTIMAL). HARMONIC RESONANCE: NEGATIVE.", 'ai');
        return;
    }
    if (cmd.includes("temp")) {
        simulateTyping("THERMAL READINGS: 41.5°C. COOLING SYSTEMS ACTIVE.", 'ai');
        return;
    }

    // DEFAULT: UNKNOWN
    simulateTyping(randomResponses('unknown'), 'error');
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        className="fixed bottom-8 right-8 z-[9999] p-4 rounded-full bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:bg-cyan-500 hover:text-black transition-all group backdrop-blur-md"
        onClick={() => { setIsOpen(true); playClick(); }}
        onMouseEnter={() => playHover()}
      >
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        <Terminal size={24} className="group-hover:rotate-12 transition-transform" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-8 w-[90vw] md:w-[450px] h-[600px] bg-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden"
          >
            
            {/* HEADER */}
            <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-white/5">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest">
                <Cpu size={14} /> CORTEX_V1 // NEURAL_LINK
              </div>
              <button 
                onClick={() => { setIsOpen(false); playClick(); }} 
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* LOGS */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-3 custom-scrollbar">
              {history.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  {msg.type !== 'user' && msg.type !== 'process' && (
                      <div className="flex items-center gap-2 mb-1 text-[9px] uppercase text-zinc-600 tracking-widest">
                          {msg.type === 'error' ? <ShieldCheck size={10} className="text-red-500"/> : <Activity size={10} className="text-cyan-500"/>}
                          {msg.type === 'ai' ? 'CORTEX_RESPONSE' : 'SYSTEM_LOG'}
                      </div>
                  )}

                  <div className={`max-w-[95%] p-3 rounded-lg text-xs leading-relaxed border ${
                    msg.type === 'user' 
                      ? 'bg-white/10 border-white/5 text-zinc-200 self-end' 
                      : msg.type === 'process'
                      ? 'bg-transparent border-none text-cyan-500 animate-pulse'
                      : msg.type === 'error'
                      ? 'bg-red-900/20 border-red-500/50 text-red-300'
                      : msg.type === 'success'
                      ? 'bg-green-900/20 border-green-500/50 text-green-300'
                      : 'bg-cyan-950/20 border-cyan-500/20 text-cyan-100 shadow-[0_0_10px_rgba(34,211,238,0.05)]'
                  }`}>
                    {msg.type === 'process' && <ArrowRightCircle size={12} className="inline mr-2 animate-spin" />}
                    {msg.text}
                    {/* Cursor effect for last message if typing */}
                    {i === history.length - 1 && isTyping && msg.type !== 'process' && (
                        <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-1 animate-pulse align-middle"/>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="p-4 border-t border-white/10 bg-black/50">
              
              {/* MICROPHONE STATUS */}
              {isListening && (
                  <div className="mb-3 p-2 rounded bg-red-500/10 border border-red-500/30 text-[10px] text-red-300 font-mono flex items-center gap-2 animate-pulse">
                      <Mic size={12} /> VOICE MODULE ACTIVE: LISTENING...
                      <span className="ml-auto text-white/50">"{transcript}"</span>
                  </div>
              )}

              <div className="relative flex items-center gap-2">
                <button 
                    onClick={toggleVoice}
                    className={`p-3 rounded-lg border transition-all ${
                        isListening 
                        ? 'bg-red-500 text-black border-red-500' 
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                    }`}
                >
                    {isListening ? <Mic size={16} className="animate-bounce" /> : <MicOff size={16} />}
                </button>

                <div className="relative flex-1">
                    <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={isTyping ? "System processing..." : "Enter command..."}
                    disabled={isTyping}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-lg py-3 pl-4 pr-10 text-white font-mono text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    autoFocus
                    />
                    <button 
                    onClick={handleSend}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-cyan-500/20 rounded text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors"
                    >
                    <Send size={14} />
                    </button>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}