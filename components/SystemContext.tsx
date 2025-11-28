"use client";

import React, { createContext, useContext, useState } from 'react';

interface SystemState {
  isQuantum: boolean;
  setQuantum: (val: boolean) => void;
  isCritical: boolean;
  setCritical: (val: boolean) => void;
  isListening: boolean;
  setIsListening: (val: boolean) => void;
}

const SystemContext = createContext<SystemState | undefined>(undefined);

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [isQuantum, setQuantum] = useState(false);
  const [isCritical, setCritical] = useState(false);
  const [isListening, setIsListening] = useState(false);

  return (
    <SystemContext.Provider value={{ 
      isQuantum, setQuantum, 
      isCritical, setCritical,
      isListening, setIsListening 
    }}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (!context) throw new Error("useSystem must be used within a SystemProvider");
  return context;
}