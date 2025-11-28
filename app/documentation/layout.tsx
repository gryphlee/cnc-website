"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Hexagon, BookOpen, Target, Users, Calendar, ArrowLeft } from 'lucide-react';

// --- METEOR COMPONENT (Minified) ---
const Meteors = () => {
  const styles = [...new Array(10)].map(() => ({
    top: Math.floor(Math.random() * 100) + "%",
    left: Math.floor(Math.random() * 100) + "%",
    animationDelay: Math.random() * 1 + 0.2 + "s",
    animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {styles.map((style, idx) => (
        <span key={idx} className="absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]" style={style}>
          <div className="absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </div>
  );
};

const navItems = [
  { name: 'Project Overview', href: '/documentation/overview', icon: BookOpen },
  { name: 'Objectives & Significance', href: '/documentation/objectives', icon: Target },
  { name: 'The Proponents', href: '/documentation/team', icon: Users },
  { name: 'Project Timeline', href: '/documentation/timeline', icon: Calendar },
];

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans flex flex-col md:flex-row relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-small-white/[0.2] mask-radial-faded opacity-40" />
        <Meteors />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full opacity-30" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full opacity-30" />
      </div>

      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-black/40 border-r border-white/5 backdrop-blur-xl p-6 flex flex-col md:h-screen sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 mb-8 md:mb-12">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Hexagon className="text-cyan-400 animate-pulse-glow" size={24} />
          </div>
          <span className="font-bold tracking-tight text-xl text-white">CNC<span className="text-cyan-500">DOCS</span></span>
        </Link>

        <nav className="space-y-2 flex-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className="relative group">
                   {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-500 rounded-r-full shadow-[0_0_10px_cyan]" />
                  )}
                  <span className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-cyan-500/5 text-cyan-300 border border-cyan-500/20 translate-x-2' 
                      : 'hover:bg-white/5 text-zinc-400 hover:text-white hover:translate-x-1 border border-transparent'
                  }`}>
                    <item.icon size={18} className={`transition-colors ${isActive ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-white'}`} />
                    <span className="font-medium text-sm">{item.name}</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 pt-6 border-t border-white/5">
          <Link href="/">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all text-sm font-medium group border border-white/5 hover:border-white/10">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
              Return to HQ
            </button>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto h-screen relative z-10 scroll-smooth">
        <div className="max-w-5xl mx-auto pb-20">
          {children}
        </div>
      </main>
    </div>
  );
}