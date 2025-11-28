import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BootLoader from '@/components/BootLoader';
import CortexTerminal from '@/components/CortexTerminal';
import { SystemProvider } from '../components/SystemContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CNC Quantum Restoration',
  description: 'Thesis Project 2025',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. WRAP EVERYTHING WITH PROVIDER */}
        <SystemProvider>
          <BootLoader />
          <CortexTerminal /> {/* Cortex lives here globally */}
          {children}
        </SystemProvider>
      </body>
    </html>
  );
}