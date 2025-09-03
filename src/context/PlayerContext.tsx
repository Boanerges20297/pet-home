
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PlayerContextType {
  coins: number;
  currentDay: number;
  collectedDays: number[];
  addCoins: (amount: number) => void;
  collectReward: (day: number, reward: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoins] = useState(0);
  const [currentDay, setCurrentDay] = useState(1);
  const [collectedDays, setCollectedDays] = useState<number[]>([]);

  const addCoins = (amount: number) => {
    setCoins(prevCoins => prevCoins + amount);
  };

  const collectReward = (day: number, reward: number) => {
    if (day === currentDay) {
      setCollectedDays([...collectedDays, day]);
      addCoins(reward);
      setCurrentDay(currentDay + 1);
    }
  };

  return (
    <PlayerContext.Provider value={{ coins, currentDay, collectedDays, addCoins, collectReward }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
