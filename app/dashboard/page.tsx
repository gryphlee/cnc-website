"use client"; 

import React, { useState } from 'react';
import DigitalTwin from '../../components/DigitalTwin';
import LiveChart from '../../components/LiveChart';
import QuantumMap from '../../components/QuantumMap';
import { useMachineData } from '../../hooks/useMachineData';
import { Activity, Zap, Thermometer, AlertTriangle, Scan, TerminalSquare, Wifi, LayoutDashboard, Settings, FileText, Hexagon, LogOut, Mic, MicOff } from 'lucide-react';
import { useVoice } from '../../hooks/useVoice'; // Import hook
import { useSystem } from '../../components/SystemContext';
import Link from 'next/link';

export default function Dashboard() {
  // REMOVED LOCAL STATE: const [isQuantum, setIsQuantum] = useState(false);
  
  // USE GLOBAL STATE
  const { isQuantum, setQuantum, isCritical: isSimulatedCritical, isListening } = useSystem();
  const { toggleVoice, transcript } = useVoice(); // No args needed anymore
  
  const [activeTab, setActiveTab] = useState('dashboard');

  const machineData = useMachineData();
  
  // Combine Real Critical status with Simulated status
  const isCritical = machineData?.status === 'CRITICAL' || isSimulatedCritical;
  
  const position = machineData?.position || { x: 0, y: 0, z: 0 };
  // Boost values during critical simulation
  const vibration = isSimulatedCritical ? 0.45 : (machineData?.vibration || 0);
  const temp = isSimulatedCritical ? 85.2 : (machineData?.temp || 0);
  const power = machineData?.power || 0;

  return (
    <div className="flex h-screen w-screen bg-[#000000] text-white overflow-hidden font-mono selection:bg-cyan-500/30">
      
      {/* SIDEBAR (Keep same code) */}
      <aside className="w-14 h-full flex flex-col items-center bg-black/40 backdrop-blur-xl border-r border-white/5 py-4 gap-4 z-50 shrink-0">
        <Link href="/">
            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)] cursor-pointer hover:scale-110 transition-transform">
                <Hexagon size={18} className="text-cyan-400" />
            </div>
        </Link>
        <nav className="flex flex-col gap-3 flex-1 w-full px-1.5">
            <SidebarBtn icon={LayoutDashboard} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
            <SidebarBtn icon={FileText} active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
            <SidebarBtn icon={Settings} active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>
        <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut size={16} />
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px] -z-10 pointer-events-none transition-colors duration-500 ${isCritical ? 'bg-red-900/20' : ''}`} />

        <header className="h-12 shrink-0 border-b border-white/10 flex items-center justify-between px-4 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className={`w-1 h-4 rounded-full shadow-[0_0_15px] transition-colors ${isQuantum ? 'bg-purple-500 shadow-purple-500' : 'bg-cyan-500 shadow-cyan-500'}`} />
            <div>
              <h1 className="text-sm font-bold tracking-widest text-white uppercase">INTELLI-MILL <span className={isQuantum ? "text-purple-500" : "text-cyan-500"}>OS</span></h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            
            {/* GLOBAL VOICE TOGGLE */}
            <button onClick={toggleVoice} className={`flex items-center gap-2 text-[9px] font-bold px-2 py-0.5 rounded border transition-colors ${isListening ? 'bg-red-500/10 border-red-500 text-red-400 animate-pulse' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
                {isListening ? <Mic size={10} /> : <MicOff size={10} />}
                {isListening ? 'VOICE_ACTIVE' : 'VOICE_OFF'}
            </button>

            <div className="flex items-center gap-2 text-green-400 text-[9px] font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                <Wifi size={10} /> ONLINE
            </div>
            <div className={`px-2 py-0.5 rounded border flex items-center gap-2 transition-all ${
              isCritical ? 'bg-red-500/10 border-red-500 text-red-400 animate-pulse shadow-[0_0_20px_red]' : 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400'
            }`}>
              {isCritical ? <AlertTriangle size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]" />}
              <span className="text-[9px] font-bold tracking-wider">{isCritical ? 'CRITICAL' : 'OPTIMAL'}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-2 overflow-hidden min-h-0">
            
            {activeTab === 'dashboard' ? (
                <div className="grid grid-cols-12 gap-2 h-full">
                    
                    <div className="col-span-8 flex flex-col gap-2 h-full overflow-hidden">
                        
                        <div className={`flex-1 min-h-0 relative rounded-lg overflow-hidden border ${isCritical ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-white/10'} bg-zinc-900/10 backdrop-blur-sm group transition-all duration-500`}>
                            <DigitalTwin position={position} isQuantum={isQuantum} />
                            <div className="absolute top-2 left-2 z-20">
                                <div className={`flex items-center gap-2 px-2 py-1 bg-black/60 border rounded text-[9px] font-bold tracking-widest ${isQuantum ? 'border-purple-500/30 text-purple-400' : 'border-cyan-500/30 text-cyan-400'}`}>
                                    <Scan size={10} /> {isQuantum ? 'QUANTUM_FEED' : 'std_feed'}
                                </div>
                            </div>
                            
                            {isListening && transcript && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 backdrop-blur border border-cyan-500/50 rounded-full text-cyan-400 text-[10px] font-mono z-50">
                                    cmd_input: "{transcript}"
                                </div>
                            )}

                            {isCritical && (
                                <div className="absolute inset-0 border-2 border-red-500/50 animate-pulse pointer-events-none rounded-lg z-30 flex items-center justify-center">
                                    <div className="bg-red-500/20 backdrop-blur-sm px-6 py-2 rounded text-red-500 font-black tracking-[0.5em] text-xl border border-red-500/50">
                                        WARNING
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="h-24 shrink-0 grid grid-cols-3 gap-2">
                            <MetricCard label="VIBRATION" value={vibration} unit="mm/s" icon={Activity} color={isCritical ? "red" : "cyan"} alert={isCritical} />
                            <MetricCard label="SPINDLE TEMP" value={temp} unit="°C" icon={Thermometer} color={isCritical ? "red" : "purple"} alert={isCritical} />
                            <MetricCard label="POWER DRAW" value={power} unit="kW" icon={Zap} color="yellow" />
                        </div>
                    </div>

                    <div className="col-span-4 flex flex-col gap-2 h-full overflow-hidden">
                        
                        <div className={`flex-1 min-h-0 bg-zinc-900/10 border rounded-lg p-2 flex flex-col relative overflow-hidden ${isCritical ? 'border-red-500/30' : 'border-white/10'}`}>
                            <div className="flex items-center justify-between mb-1 shrink-0">
                                <h3 className="text-white text-[10px] font-bold flex items-center gap-2"><TerminalSquare size={12} className="text-cyan-400" /> AI ANALYSIS</h3>
                            </div>
                            <div className="flex-1 w-full min-h-0">
                                <LiveChart value={vibration} />
                            </div>
                        </div>

                        <div className="flex-1 min-h-0 bg-zinc-900/10 border border-white/10 rounded-lg p-2 flex flex-col relative overflow-hidden">
                            <div className="flex items-center justify-between mb-1 shrink-0">
                                <h3 className="text-white text-[10px] font-bold flex items-center gap-2"><Zap size={12} className="text-purple-400" /> QUANTUM ROUTE</h3>
                            </div>
                            <div className="flex-1 w-full min-h-0 relative">
                                {/* Pass setter to allow manual toggle too */}
                                <QuantumMap isQuantum={isQuantum} onToggle={() => setQuantum(!isQuantum)} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-zinc-500 text-xs">
                    // MODULE_OFFLINE
                </div>
            )}
        </div>
      </main>
    </div>
  );
}

const SidebarBtn = ({ icon: Icon, active, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`relative p-2 rounded-lg w-full flex justify-center transition-all duration-300 ${active ? 'bg-white/10' : 'hover:bg-white/5'}`}
    >
        {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-cyan-500 rounded-r-full shadow-[0_0_10px_cyan]" />}
        <Icon size={16} className={active ? 'text-cyan-400' : 'text-zinc-500'} />
    </button>
);

const MetricCard = ({ label, value, unit, icon: Icon, color, alert }: any) => (
    <div className={`relative rounded-lg border p-2 flex flex-col justify-between overflow-hidden h-full transition-all duration-300 ${alert ? 'border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-white/10 hover:border-white/20 bg-zinc-900/20'}`}>
        <div className="flex items-center justify-between mb-1 z-10">
            <span className="text-[9px] font-bold text-zinc-500 tracking-wider">{label}</span>
            <Icon size={12} className={alert ? 'text-red-500' : 'text-zinc-600'} />
        </div>
        <div className="z-10 flex items-baseline gap-1 mt-auto">
            <span className={`text-2xl font-black tracking-tighter ${alert ? 'text-red-500' : 'text-white'}`}>
                {typeof value === 'number' ? value.toFixed(2) : value}
            </span>
            <span className="text-[9px] text-zinc-500 font-medium">{unit}</span>
        </div>
        <div className={`absolute -right-2 -top-2 w-12 h-12 bg-${color}-500/10 blur-xl rounded-full pointer-events-none`} />
    </div>
);