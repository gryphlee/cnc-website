import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSFX } from './useSFX';
import { useSystem } from '../components/SystemContext';

export function useVoice() {
  const router = useRouter();
  const { playClick, playStartup } = useSFX();
  // Use Global State instead of local state
  const { isListening, setIsListening, setQuantum, setCritical } = useSystem(); 
  const [transcript, setTranscript] = useState("");

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 0.8; 
      utterance.rate = 1.1; 
      utterance.volume = 1;
      const voices = window.speechSynthesis.getVoices();
      const sciFiVoice = voices.find(v => v.name.includes('Google US English')) || voices[0];
      if (sciFiVoice) utterance.voice = sciFiVoice;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    
    // IMPORTANT: Auto-restart if it stops unexpectedly (Continuous Mode)
    recognition.onend = () => {
        // Only actually stop if we manually toggled it off. 
        // But for this logic, we rely on the isListening state from context
        // If we want it TRULY continuous across pages, we handle it via the context flag.
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const command = event.results[current][0].transcript.toLowerCase().trim();
      setTranscript(command);
      console.log("🎤 Command:", command);

      // --- COMMANDS ---
      
      if (command.includes('dashboard') || command.includes('console')) {
        speak("Opening Dashboard.");
        router.push('/dashboard');
      }
      else if (command.includes('team')) {
        speak("Showing Proponents.");
        router.push('/documentation/team');
      }
      else if (command.includes('overview')) {
        speak("Project Overview.");
        router.push('/documentation/overview');
      }
      else if (command.includes('timeline')) {
        speak("Project Timeline.");
        router.push('/documentation/timeline');
      }

      // GLOBAL CONTROLS (Gumagana kahit saang page)
      else if (command.includes('activate quantum') || command.includes('quantum mode')) {
        playStartup();
        speak("Quantum Core Engaged.");
        setQuantum(true); // Updates Global State
        router.push('/dashboard'); // Auto-redirect para makita effect
      }
      else if (command.includes('disable quantum') || command.includes('classic mode')) {
        playClick();
        speak("Reverting to Classic CPU.");
        setQuantum(false);
      }
      else if (command.includes('simulate failure') || command.includes('critical error')) {
        speak("WARNING. Critical Failure Simulated.");
        setCritical(true);
        router.push('/dashboard');
      }
      else if (command.includes('stabilize') || command.includes('reset system')) {
        speak("System Stabilized.");
        setCritical(false);
      }
    };

    if (isListening) {
        recognition.start();
    } else {
        recognition.stop();
    }

    return () => recognition.stop();
  }, [isListening, router, playClick, playStartup, setQuantum, setCritical, speak, setIsListening]);

  const toggleVoice = () => setIsListening(!isListening);

  return { isListening, toggleVoice, transcript };
}