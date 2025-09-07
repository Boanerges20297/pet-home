
"use client";

import { Pet } from '@/components/PetCard';
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { allPets } from '@/lib/allPets';

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
  favorites: string[];
  addCoins: (amount: number) => void;
  addGems: (amount: number) => void;
  removeGems: (amount: number) => void;
  addXp: (amount: number) => void;
  collectReward: (day: number, reward: Reward) => void;
  buyPet: (pet: Pet) => boolean;
  adoptPet: (pet: Pet) => void;
  addItemToInventory: (itemId: string, itemName: string, quantity: number) => void;
  useItem: (itemId: string, selectedPetId?: string | null) => boolean;
  toggleFavorite: (petId: string) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const calculateXpToNextLevel = (level: number) => 100 * level * 1.5;

const createInitialDog = (petName: string): Pet => ({
    id: 'initial_dog',
    name: petName,
    age: 'Nível 1',
    breed: 'Vira-lata Caramelo',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxmaWxob3RlfGVufDB8fHx8MTc1NjkwMTEwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'caramel dog',
    price: 0,
});


// Function to get the initial state from localStorage
const getInitialState = <T,>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') {
        return defaultValue;
    }
    try {
        // Handle new user registration specifically
        if (localStorage.getItem('isNewUser') === 'true') {
            switch (key) {
                case 'coins': return 0 as T;
                case 'gems': return 20 as T;
                case 'level': return 1 as T;
                case 'xp': return 0 as T;
                case 'currentDay': return 1 as T;
                case 'collectedDays': return [] as T;
                case 'inventory': return [] as T;
                case 'favorites': return [] as T;
                case 'ownedPets':
                    const petName = localStorage.getItem('initialPetName') || 'Amigão';
                    return [createInitialDog(petName)] as T;
                default:
                    const storedValue = localStorage.getItem(key);
                    return storedValue ? JSON.parse(storedValue) : defaultValue;
            }
        }

        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
    } catch (error) {
        console.error(`Error reading from localStorage key “${key}”:`, error);
    }
    
    return defaultValue;
};


export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  
  const [coins, setCoins] = useState<number>(() => getInitialState('coins', 0));
  const [gems, setGems] = useState<number>(() => getInitialState('gems', 20));
  const [level, setLevel] = useState<number>(() => getInitialState('level', 1));
  const [xp, setXp] = useState<number>(() => getInitialState('xp', 0));
  const [xpToNextLevel, setXpToNextLevel] = useState(() => calculateXpToNextLevel(getInitialState('level', 1)));
  const [currentDay, setCurrentDay] = useState<number>(() => getInitialState('currentDay', 1));
  const [collectedDays, setCollectedDays] = useState<number[]>(() => getInitialState('collectedDays', []));
  const [ownedPets, setOwnedPets] = useState<Pet[]>(() => getInitialState('ownedPets', []));
  const [inventory, setInventory] = useState<PlayerItem[]>(() => getInitialState('inventory', []));
  const [favorites, setFavorites] = useState<string[]>(() => getInitialState('favorites', []));

  // Effect to save state to localStorage whenever it changes
  useEffect(() => {
    try {
        localStorage.setItem('coins', JSON.stringify(coins));
        localStorage.setItem('gems', JSON.stringify(gems));
        localStorage.setItem('level', JSON.stringify(level));
        localStorage.setItem('xp', JSON.stringify(xp));
        localStorage.setItem('currentDay', JSON.stringify(currentDay));
        localStorage.setItem('collectedDays', JSON.stringify(collectedDays));
        localStorage.setItem('ownedPets', JSON.stringify(ownedPets));
        localStorage.setItem('inventory', JSON.stringify(inventory));
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // After the first save for a new user, remove the flags
        if (localStorage.getItem('isNewUser') === 'true') {
          localStorage.removeItem('isNewUser');
          localStorage.removeItem('initialPetName');
        }
    } catch(e) {
        console.error("Error saving state to localStorage", e);
    }
  }, [coins, gems, level, xp, currentDay, collectedDays, ownedPets, inventory, favorites]);


  const addCoins = (amount: number) => {
    setCoins(prevCoins => prevCoins + amount);
  };

  const addGems = (amount: number) => {
    setGems(prevGems => prevGems + amount);
  };

  const removeGems = (amount: number) => {
    setGems(prevGems => Math.max(0, prevGems - amount));
  }
  
  const addXp = useCallback((amount: number) => {
    setXp(prevXp => {
      let newXp = prevXp + amount;
      let currentLevel = level; // Use a local variable to track level changes within this update
      let currentXpToNextLevel = xpToNextLevel;

      while (newXp >= currentXpToNextLevel) {
        newXp -= currentXpToNextLevel;
        currentLevel++;
        currentXpToNextLevel = calculateXpToNextLevel(currentLevel);
        
        // Update state directly for level and xpToNextLevel
        setLevel(currentLevel);
        setXpToNextLevel(currentXpToNextLevel);

        toast({
          title: 'Subiu de Nível!',
          description: `Parabéns! Você alcançou o nível ${currentLevel}.`,
        });
      }

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

      const newCollectedDays = [...collectedDays, day];
      setCollectedDays(newCollectedDays);
      setCurrentDay(day + 1); // Advance the day only after collecting
      addXp(25); // Ganha 25 XP por coletar o prêmio diário
      
       toast({
        title: 'Recompensa Coletada!',
        description: toastDescription,
      });
    } else {
        toast({
            title: 'Ops!',
            description: day < currentDay ? 'Você já coletou este prêmio.' : 'Ainda não é hora de coletar este prêmio.',
            variant: 'destructive',
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

  const adoptPet = (pet: Pet) => {
    setOwnedPets(prevPets => [...prevPets, pet]);
    addXp(50); // Bonus XP for adoption
    toast({
      title: 'Novo Amigo na Coleção!',
      description: `Parabéns! Você adotou ${pet.name}.`,
    });
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

  const useItem = (itemId: string, selectedPetId: string | null = null): boolean => {
    const item = inventory.find(i => i.id === itemId);
    if (!item || item.quantity <= 0) {
        toast({ title: "Item esgotado!", variant: 'destructive' });
        return false;
    }

    setInventory(prev =>
      prev.map(i => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i)).filter(i => i.quantity > 0)
    );
    
    // Grant rewards based on item type
    if (itemId.startsWith('food')) {
        let xpAmount = 10;
        if(itemId.includes('biscuit')) xpAmount = 20;
        if(itemId.includes('premium')) xpAmount = 25;
        if(itemId.includes('fruits')) xpAmount = 15;
        addXp(xpAmount);
        toast({ title: `Você usou ${item.name}!`, description: `Seu filhote ganhou ${xpAmount} XP.` });
    } else if (itemId.startsWith('potion')) {
        const parts = itemId.split('_'); // e.g., ['potion', 'xp', '500']
        if (parts.length >= 3) {
            const type = parts[1]; // 'xp' or 'coin'
            const amount = parseInt(parts.slice(2).join('_'), 10);
            if (!isNaN(amount)) {
                if (type === 'xp') {
                    addXp(amount);
                    toast({ title: 'Magia!', description: `Você usou ${item.name} e ganhou ${amount} XP!` });
                } else if (type === 'coin') {
                    addCoins(amount);
                    toast({ title: 'Fortuna!', description: `Você usou ${item.name} e ganhou ${amount} moedas!` });
                }
            }
        } else if (itemId === 'potion_stork') {
            if (!selectedPetId) {
                toast({ title: 'Selecione um pet!', description: 'Você precisa selecionar um pet para usar a Poção da Cegonha.', variant: 'destructive' });
                // Return item to inventory since it wasn't used
                addItemToInventory(itemId, item.name, 1);
                return false; 
            }
            const parentPet = ownedPets.find(p => p.id === selectedPetId);
            if (parentPet) {
                const numberOfPuppies = Math.floor(Math.random() * 3) + 1; // 1 to 3 puppies
                for (let i = 0; i < numberOfPuppies; i++) {
                    const puppyTemplate = allPets[Math.floor(Math.random() * allPets.length)];
                    const newPet: Pet = {
                        ...puppyTemplate,
                        id: `mini_${parentPet.id}_${Date.now()}_${i}`,
                        name: `Filhote de ${parentPet.name} ${i + 1}`,
                        age: 'Nível 1',
                        price: 0,
                    };
                    setOwnedPets(prev => [...prev, newPet]);
                }
                toast({ title: 'Ninhada a caminho!', description: `${parentPet.name} teve ${numberOfPuppies} filhotinhos!` });
            }
        }
    }
    
    return true;
  };

  const toggleFavorite = (petId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(petId)) {
        return prevFavorites.filter(id => id !== petId);
      } else {
        return [...prevFavorites, petId];
      }
    });
  };


  return (
    <PlayerContext.Provider value={{ coins, gems, level, xp, xpToNextLevel, currentDay, collectedDays, ownedPets, inventory, favorites, addCoins, addGems, removeGems, addXp, collectReward, buyPet, adoptPet, addItemToInventory, useItem, toggleFavorite }}>
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
