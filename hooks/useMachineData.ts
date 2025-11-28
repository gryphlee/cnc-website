import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

const defaultData = {
  vibration: 0,
  temp: 0,
  power: 0,
  position: { x: 0, y: 0, z: 0 },
  status: 'NORMAL',
};

export function useMachineData() {
  const [data, setData] = useState(defaultData);
  const socketRef = useRef<Socket | null>(null);
  const isConnected = useRef(false);

  useEffect(() => {
    
    socketRef.current = io('http://localhost:8000', {
      reconnectionAttempts: 3,
      timeout: 2000,
    });

    socketRef.current.on('connect', () => {
      console.log("✅ Connected to Python Backend");
      isConnected.current = true;
    });

    socketRef.current.on('machine_update', (newData) => {
      setData(newData);
    });

    socketRef.current.on('disconnect', () => {
      isConnected.current = false;
    });

    
    let time = 0;
    
    const interval = setInterval(() => {
      if (!isConnected.current) {
        time += 0.1; // Time step

        
        const pathX = Math.cos(time) * 2; 
        const pathY = Math.sin(time) * 2;
        
        const cutDepth = Math.sin(time * 0.5) > 0 ? 0.5 : -0.5;

        const waveA = Math.sin(time * 2); 
        
        const waveB = Math.sin(time * 5) * 0.3;
        
        
        const beautyVibration = 0.05 + Math.abs(waveA + waveB) * 0.08;

        
        const beautyPower = 1.2 + (Math.abs(Math.sin(time)) * 0.5);

       
        const beautyTemp = 42 + (Math.sin(time * 0.1) * 1.5);

        setData({
          vibration: parseFloat(beautyVibration.toFixed(3)), 
          temp: parseFloat(beautyTemp.toFixed(1)),
          power: parseFloat(beautyPower.toFixed(2)),
          position: {
            x: pathX,
            y: pathY,
            z: cutDepth
          },
          
          status: beautyVibration > 0.15 ? 'OPTIMIZING' : 'NORMAL',
        });
      }
    }, 100); 

    return () => {
      socketRef.current?.disconnect();
      clearInterval(interval);
    };
  }, []);

  return data;
}