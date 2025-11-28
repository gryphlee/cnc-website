"use client";

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Settings, FileText, Hexagon, LogOut } from 'lucide-react';
import { useSFX } from '../hooks/useSFX';

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Sidebar({ activeTab = 'dashboard', onTabChange }: SidebarProps) {
  const { playHover, playClick } = useSFX();

  const handleTabClick = (tab: string) => {
    playClick();
    if (onTabChange) onTabChange(tab);
  };

  return (
    <aside className="w-16 h-full flex flex-col items-center bg-black/40 backdrop-blur-xl border-r border-white/5 py-4 gap-6 z-50 shrink-0">
      <Link href="/">
        <div 
          className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)] cursor-pointer hover:scale-110 transition-transform"
          onMouseEnter={() => playHover()}
          onClick={() => playClick()}
        >
          <Hexagon size={20} className="text-cyan-400" />
        </div>
      </Link>

      <nav className="flex flex-col gap-4 flex-1 w-full px-2">
        <SidebarBtn 
          icon={LayoutDashboard} 
          active={activeTab === 'dashboard'} 
          onClick={() => handleTabClick('dashboard')} 
        />
        <SidebarBtn 
          icon={FileText} 
          active={activeTab === 'logs'} 
          onClick={() => handleTabClick('logs')} 
        />
        <SidebarBtn 
          icon={Settings} 
          active={activeTab === 'settings'} 
          onClick={() => handleTabClick('settings')} 
        />
      </nav>

      <button 
        className="p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        onMouseEnter={() => playHover()}
        onClick={() => playClick()}
      >
        <LogOut size={18} />
      </button>
    </aside>
  );
}

const SidebarBtn = ({ icon: Icon, active, onClick }: any) => {
  const { playHover } = useSFX();

  return (
    <button 
      onClick={onClick}
      onMouseEnter={() => playHover()}
      className={`relative p-2.5 rounded-lg w-full flex justify-center transition-all duration-300 group ${active ? 'bg-white/10' : 'hover:bg-white/5'}`}
    >
      {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-500 rounded-r-full shadow-[0_0_10px_cyan]" />}
      <Icon size={18} className={active ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-zinc-300'} />
    </button>
  );
};