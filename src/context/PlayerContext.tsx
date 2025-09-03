
"use client";

import { Pet } from '@/components/PetCard';
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface PlayerItem {
  id: string;
  name: string;
  quantity: number;
}

type Reward = 
  | { type: 'coins'; amount: number }
  | { type: 'gems'; amount: number }
  | { type: 'item'; item: Omit<PlayerItem, 'quantity'> & { quantity: 1 } };


interface PlayerContextType {
  coins: number;
  gems: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  currentDay: number;
  collectedDays: number[];
  ownedPets: Pet[];
  inventory: PlayerItem[];
  addCoins: (amount: number) => void;
  addGems: (amount: number) => void;
  addXp: (amount: number) => void;
  collectReward: (day: number, reward: Reward) => void;
  buyPet: (pet: Pet) => boolean;
  addItemToInventory: (itemId: string, itemName: string, quantity: number) => void;
  useItem: (itemId: string) => boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const calculateXpToNextLevel = (level: number) => 100 * level * 1.5;

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [coins, setCoins] = useState(0);
  const [gems, setGems] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [xpToNextLevel, setXpToNextLevel] = useState(calculateXpToNextLevel(1));
  const [currentDay, setCurrentDay] = useState(1);
  const [collectedDays, setCollectedDays] = useState<number[]>([]);
  const [ownedPets, setOwnedPets] = useState<Pet[]>([]);
  const [inventory, setInventory] = useState<PlayerItem[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !initialized) {
        const initialPetData = localStorage.getItem('initialPet');
        if (initialPetData) {
            try {
                const pet: Pet = JSON.parse(initialPetData);
                if (pet && pet.id && !ownedPets.some(p => p.id === pet.id)) {
                    setOwnedPets([pet]);
                    // Optional: clear the item so it doesn't get added again on refresh
                    localStorage.removeItem('initialPet'); 
                }
            } catch(e) {
                console.error("Failed to parse initial pet data", e)
                localStorage.removeItem('initialPet');
            }
        }
        setInitialized(true);
    }
  }, [initialized, ownedPets]);


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
        toast({
          title: 'Subiu de Nível!',
          description: `Parabéns! Você alcançou o nível ${newLevel}.`,
        });
      }

      setLevel(newLevel);
      setXpToNextLevel(newXpToNextLevel);
      return newXp;
    });
  }, [level, xpToNextLevel, toast]);

  const collectReward = (day: number, reward: Reward) => {
    if (day === currentDay && !collectedDays.includes(day)) {
      let toastDescription = '';
      if (reward.type === 'coins') {
        addCoins(reward.amount);
        toastDescription = `Você ganhou ${reward.amount} moedas!`;
      } else if (reward.type === 'gems') {
        addGems(reward.amount);
        toastDescription = `Você ganhou ${reward.amount} gemas!`;
      } else if (reward.type === 'item') {
        addItemToInventory(reward.item.id, reward.item.name, reward.item.quantity);
        toastDescription = `Você ganhou: ${reward.item.name}!`;
      }

      setCollectedDays([...collectedDays, day]);
      addXp(25); // Ganha 25 XP por coletar o prêmio diário
      setCurrentDay(currentDay + 1);
       toast({
        title: 'Recompensa Coletada!',
        description: toastDescription,
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

  const addItemToInventory = (itemId: string, itemName: string, quantity: number) => {
    setInventory(prevInventory => {
      const existingItem = prevInventory.find(item => item.id === itemId);
      if (existingItem) {
        return prevInventory.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevInventory, { id: itemId, name: itemName, quantity }];
      }
    });
  };

  const useItem = (itemId: string) => {
    const item = inventory.find(i => i.id === itemId);
    if (!item || item.quantity <= 0) {
        toast({ title: "Item esgotado!", variant: 'destructive' });
        return false;
    }

    setInventory(prev =>
      prev.map(i => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i)).filter(i => i.quantity > 0)
    );
    
    // Grant XP based on item type
    if (itemId.startsWith('food')) {
        let xpAmount = 10;
        if(itemId === 'food_biscuit') xpAmount = 20;
        if(itemId === 'food_premium') xpAmount = 25;
        if(itemId === 'food_fruits') xpAmount = 15;
        addXp(xpAmount);
        toast({ title: `Você usou ${item.name}!`, description: `Seu filhote ganhou ${xpAmount} XP.` });
    }
    
    return true;
  };


  return (
    <PlayerContext.Provider value={{ coins, gems, level, xp, xpToNextLevel, currentDay, collectedDays, ownedPets, inventory, addCoins, addGems, addXp, collectReward, buyPet, addItemToInventory, useItem }}>
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
