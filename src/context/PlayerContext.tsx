
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface PlayerContextType {
  coins: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  currentDay: number;
  collectedDays: number[];
  addCoins: (amount: number) => void;
  addXp: (amount: number) => void;
  collectReward: (day: number, reward: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const calculateXpToNextLevel = (level: number) => 100 * level * 1.5;

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [xpToNextLevel, setXpToNextLevel] = useState(calculateXpToNextLevel(1));
  const [currentDay, setCurrentDay] = useState(1);
  const [collectedDays, setCollectedDays] = useState<number[]>([]);

  const addCoins = (amount: number) => {
    setCoins(prevCoins => prevCoins + amount);
  };
  
  const addXp = useCallback((amount: number) => {
    setXp(prevXp => {
      let newXp = prevXp + amount;
      let newLevel = level;
      let newXpToNextLevel = xpToNextLevel;

      while (newXp >= newXpToNextLevel) {
        newXp -= newXpToNextLevel;
        newLevel++;
        newXpToNextLevel = calculateXpToNextLevel(newLevel);
      }

      setLevel(newLevel);
      setXpToNextLevel(newXpToNextLevel);
      return newXp;
    });
  }, [level, xpToNextLevel]);

  const collectReward = (day: number, reward: number) => {
    if (day === currentDay) {
      setCollectedDays([...collectedDays, day]);
      addCoins(reward);
      addXp(25); // Ganha 25 XP por coletar o prêmio diário
      setCurrentDay(currentDay + 1);
    }
  };

  return (
    <PlayerContext.Provider value={{ coins, level, xp, xpToNextLevel, currentDay, collectedDays, addCoins, addXp, collectReward }}>
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
