"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Flag, CheckCircle2, Clock } from 'lucide-react';
import { HoloCard } from '../../../components/HoloCard';

export default function TimelinePage() {
  const milestones = [
    { title: "Proposal Defense", status: "Complete", color: "green" },
    { title: "System Design & Assembly", status: "Complete", color: "green" },
    { title: "AI Module Development", status: "Complete", color: "green" },
    { title: "Live Data Visualization Setup", status: "Complete", color: "green" },
    { title: "Quantum Simulation Testing", status: "In Progress", color: "yellow" },
    { title: "Final Defense", status: "Pending", color: "zinc" }
  ];

  return (
    <div className="space-y-12">
      
      {/* HEADER */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Project Timeline</h1>
        <div className="h-1 w-20 bg-purple-500 rounded-full shadow-[0_0_15px_purple]"></div>
      </div>

      {/* MILESTONES */}
      <section>
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <Flag className="text-purple-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Key Milestones</h2>
        </div>

        <HoloCard className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/5 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                    {m.status === "Complete" ? (
                        <CheckCircle2 className="text-green-500" size={20} />
                    ) : (
                        <Clock className={`text-${m.color}-500`} size={20} />
                    )}
                    <span className="text-zinc-200 font-medium">{m.title}</span>
                </div>
                <span className={`text-xs font-mono uppercase px-2 py-1 rounded bg-${m.color}-500/10 text-${m.color}-400 border border-${m.color}-500/20`}>
                    {m.status}
                </span>
              </div>
            ))}
          </div>
        </HoloCard>
      </section>

      {/* GANTT CHART */}
      <section>
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
                <Calendar className="text-pink-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Gantt Chart</h2>
        </div>

        <HoloCard className="p-8 overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Months Header */}
            <div className="grid grid-cols-12 gap-2 mb-6 text-xs text-zinc-500 font-mono uppercase text-center border-b border-white/10 pb-4">
              <div className="col-span-3 text-left pl-4">Phase</div>
              <div>Aug</div><div>Sep</div><div>Oct</div><div>Nov</div><div>Dec</div><div>Jan</div><div>Feb</div><div>Mar</div><div>Apr</div>
            </div>

            {/* Grid Background */}
            <div className="space-y-3 relative">
              <div className="absolute inset-0 grid grid-cols-12 gap-2 pointer-events-none z-0">
                  <div className="col-span-3"></div>
                  {[...Array(9)].map((_, i) => <div key={i} className="border-l border-white/5 h-full"></div>)}
              </div>

              {/* Bars */}
              <GanttBar title="Proposal" start={3} span={1} color="bg-cyan-500" />
              <GanttBar title="Integration" start={4} span={2} color="bg-blue-500" />
              <GanttBar title="Quantum Sim" start={6} span={2} color="bg-purple-500" />
              <GanttBar title="Live Data" start={7} span={1} color="bg-pink-500" />
              <GanttBar title="AI Training" start={8} span={2} color="bg-red-500" />
              <GanttBar title="Defense" start={11} span={1} color="bg-green-500" />
            </div>
          </div>
        </HoloCard>
      </section>
    </div>
  );
}

// Helper Component for Gantt Bars
const GanttBar = ({ title, start, span, color }: any) => (
  <div className="grid grid-cols-12 gap-2 items-center relative z-10 group">
    <div className="col-span-3 text-sm text-zinc-400 pl-4 truncate group-hover:text-white transition-colors">{title}</div>
    <div className="col-span-9 h-10 bg-black/40 rounded-lg border border-white/5 relative overflow-hidden flex items-center">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${(span / 9) * 100}%` }}
        transition={{ duration: 1.2, ease: "circOut" }}
        className={`absolute top-2 bottom-2 rounded-md ${color} bg-opacity-80 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
        style={{ left: `${((start-3) / 9) * 100}%` }}
      />
    </div>
  </div>
);