
"use client";

import { Pet } from '@/components/PetCard';
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PlayerContextType {
  coins: number;
  gems: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  currentDay: number;
  collectedDays: number[];
  ownedPets: Pet[];
  addCoins: (amount: number) => void;
  addGems: (amount: number) => void;
  addXp: (amount: number) => void;
  collectReward: (day: number, amount: number, type: 'coins' | 'gems') => void;
  buyPet: (pet: Pet) => boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const calculateXpToNextLevel = (level: number) => 100 * level * 1.5;

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [coins, setCoins] = useState(1000); // Começar com moedas para testar
  const [gems, setGems] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [xpToNextLevel, setXpToNextLevel] = useState(calculateXpToNextLevel(1));
  const [currentDay, setCurrentDay] = useState(1);
  const [collectedDays, setCollectedDays] = useState<number[]>([]);
  const [ownedPets, setOwnedPets] = useState<Pet[]>([]);


  const addCoins = (amount: number) => {
    setCoins(prevCoins => prevCoins + amount);
  };

  const addGems = (amount: number) => {
    setGems(prevGems => prevGems + amount);
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

  const collectReward = (day: number, amount: number, type: 'coins' | 'gems') => {
    if (day === currentDay && !collectedDays.includes(day)) {
      if (type === 'coins') {
        addCoins(amount);
      } else {
        addGems(amount);
      }
      setCollectedDays([...collectedDays, day]);
      addXp(25); // Ganha 25 XP por coletar o prêmio diário
      setCurrentDay(currentDay + 1);
       toast({
        title: 'Recompensa Coletada!',
        description: `Você ganhou ${amount} ${type === 'coins' ? 'moedas' : 'gemas'}!`,
      });
    }
  };

  const buyPet = (pet: Pet) => {
    if (coins >= pet.price) {
      setCoins(prevCoins => prevCoins - pet.price);
      setOwnedPets(prevPets => [...prevPets, pet]);
      addXp(50); // Ganha 50 XP por comprar um novo filhote
      toast({
        title: 'Filhote Adotado!',
        description: `Parabéns! ${pet.name} agora é seu.`,
      });
      return true;
    } else {
      toast({
        title: 'Moedas Insuficientes',
        description: `Você não tem moedas suficientes para comprar ${pet.name}.`,
        variant: 'destructive',
      });
      return false;
    }
  };


  return (
    <PlayerContext.Provider value={{ coins, gems, level, xp, xpToNextLevel, currentDay, collectedDays, ownedPets, addCoins, addGems, addXp, collectReward, buyPet }}>
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
