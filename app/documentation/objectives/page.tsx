"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, CheckCircle2 } from 'lucide-react';
import { HoloCard } from '../../../components/HoloCard'; // Import yung ginawa natin

export default function ObjectivesPage() {
  const objectives = [
    "Develop a CNC milling machine integrated with artificial intelligence (AI) to optimize toolpaths and predict potential machine failures.",
    "Implement real-time data visualization for monitoring machine parameters and AI predictions during operation.",
    "Simulate the integration of quantum computing algorithms to demonstrate potential future improvements in manufacturing optimization.",
    "Evaluate the performance of the developed system in terms of efficiency, accuracy, and reliability compared to conventional CNC machines.",
    "Contribute to the vision of intelligent manufacturing by exploring AI and quantum computing integration in CNC technologies."
  ];

  const significances = [
    { title: "Manufacturing Industry", desc: "Insights into AI & Quantum efficiency gains." },
    { title: "Educational Institutions", desc: "Reference for future intelligent systems research." },
    { title: "Researchers & Students", desc: "Prototype methodology for emerging tech." },
    { title: "Future Smart Factories", desc: "Feasibility of advanced computational integration." }
  ];

  return (
    <div className="space-y-12">
      
      {/* HEADER SECTION */}
      <div className="relative">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
          Objectives & Significance
        </h1>
        <div className="h-1 w-20 bg-cyan-500 rounded-full shadow-[0_0_15px_cyan]"></div>
      </div>

      {/* OBJECTIVES SECTION */}
      <section>
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <Target className="text-cyan-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Research Objectives</h2>
        </div>

        <HoloCard className="p-8">
          <ul className="space-y-6">
            {objectives.map((obj, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <CheckCircle2 className="text-zinc-600 group-hover:text-cyan-400 transition-colors mt-1 shrink-0" size={20} />
                <span className="text-zinc-300 group-hover:text-white transition-colors leading-relaxed">
                  {obj}
                </span>
              </motion.li>
            ))}
          </ul>
        </HoloCard>
      </section>

      {/* SIGNIFICANCE SECTION */}
      <section>
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <Lightbulb className="text-purple-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Significance of the Study</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {significances.map((sig, i) => (
            <HoloCard key={i} className="p-6 group cursor-default">
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{sig.title}</h3>
              <p className="text-zinc-400 text-sm group-hover:text-zinc-200 transition-colors">{sig.desc}</p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-purple-500 transition-all duration-500 group-hover:w-full"></div>
            </HoloCard>
          ))}
        </div>
      </section>

    </div>
  );
}