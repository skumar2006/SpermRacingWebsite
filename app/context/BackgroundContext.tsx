"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

interface BackgroundContextType {
  isWhiteBackground: boolean;
  setIsWhiteBackground: (value: boolean) => void;
  globalBlur: number;
  setGlobalBlur: (value: number) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [isWhiteBackground, setIsWhiteBackground] = useState(false);
  const [globalBlur, setGlobalBlur] = useState(0);

  return (
    <BackgroundContext.Provider value={{ 
      isWhiteBackground, 
      setIsWhiteBackground,
      globalBlur,
      setGlobalBlur
    }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
} 