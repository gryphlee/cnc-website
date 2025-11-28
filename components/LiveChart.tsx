"use client";

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LiveChart({ value }: { value: number }) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(prev => {
      const now = new Date().toLocaleTimeString('en-US', { hour12: false, second: "2-digit", minute: "2-digit" });
      const newData = [...prev, { time: now, value: value }];
      if (newData.length > 20) return newData.slice(1);
      return newData;
    });
  }, [value]);

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="time" hide />
          <YAxis domain={['auto', 'auto']} hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
            itemStyle={{ color: '#22d3ee' }}
            cursor={{ stroke: '#22d3ee', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#22d3ee" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}