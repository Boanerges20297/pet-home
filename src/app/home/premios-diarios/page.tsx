
"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Gift, CheckCircle2, Gem, Bone, Beef, Apple, Utensils } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import type { Reward } from '@/context/PlayerContext';

const storeItemsForRewards = [
  { id: 'food_biscuit', name: 'Biscoito da Sorte', icon: Bone },
  { id: 'food_premium', name: 'Ração Premium', icon: Beef },
  { id: 'food_fruits', name: 'Frutinhas Silvestres', icon: Apple },
];

const generateRewards = (days: number): { day: number; reward: Reward; isSpecial: boolean }[] => {
  return Array.from({ length: days }, (_, i) => {
    const day = i + 1;
    const week = Math.floor(i / 7);
    const dayOfWeek = i % 7;
    
    let reward: Reward;
    let isSpecial = false;

    if (day % 7 === 0) { // Final de semana
      reward = { type: 'coins', amount: 200 + week * 150 };
      isSpecial = true;
    } else if (day % 5 === 0 && day > 0) { // A cada 5 dias
      const item = storeItemsForRewards[i % storeItemsForRewards.length];
      reward = { type: 'item', item: { id: item.id, name: item.name, quantity: 1 } };
      isSpecial = true;
    } else if (day % 3 === 0 && day > 0) { // A cada 3 dias
        reward = { type: 'gems', amount: 5 + week };
        isSpecial = true;
    }
    else { // Dias normais
      reward = { type: 'coins', amount: 50 + dayOfWeek * 25 + week * 50 };
      isSpecial = false;
    }

    return { day, reward, isSpecial };
  });
};

export default function DailyRewardsPage() {
  const { currentDay, collectedDays, collectReward } = usePlayer();
  
  // A lista de recompensas é gerada uma vez e memorizada
  const dailyRewards = useMemo(() => generateRewards(90), []);

  const getRewardIcon = (reward: Reward) => {
    if (reward.type === 'coins') return <Coins className="h-5 w-5 text-yellow-500" />;
    if (reward.type === 'gems') return <Gem className="h-5 w-5 text-blue-500" />;
    if (reward.type === 'item') {
      const itemInfo = storeItemsForRewards.find(i => i.id === reward.item.id);
      if (itemInfo) {
        const Icon = itemInfo.icon;
        return <Icon className="h-5 w-5" />;
      }
      return <Utensils className="h-5 w-5 text-muted-foreground" />;
    }
    return <Gift className="h-5 w-5" />;
  };

  const getRewardText = (reward: Reward) => {
      if (reward.type === 'item') {
          return `${reward.item.name}`;
      }
      return `${reward.amount}`;
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <section className="mb-12 text-center">
          <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4">
            Prêmios Diários
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Volte todos os dias para coletar recompensas. O ciclo continua indefinidamente!
          </p>
        </section>

        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {dailyRewards.map((item) => {
              const isCollected = collectedDays.includes(item.day);
              const canCollect = item.day === currentDay && !isCollected;

              return (
                <Card
                  key={item.day}
                  className={`flex flex-col items-center justify-center p-4 text-center transition-all 
                    ${item.isSpecial ? 'border-yellow-400' : ''}
                    ${isCollected ? 'bg-muted/50' : 'bg-card'}
                    ${canCollect ? 'border-primary ring-2 ring-primary' : ''}`}
                >
                  <CardHeader className="p-2">
                    <CardTitle className="font-headline text-lg text-foreground">Dia {item.day}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 flex-grow flex flex-col items-center justify-center">
                    {isCollected ? (
                      <CheckCircle2 className="h-10 w-10 mb-2 text-green-500" />
                    ) : (
                      <Gift className="h-10 w-10 mb-2 text-primary" />
                    )}
                    <div className="flex items-center gap-1 text-center">
                      {getRewardIcon(item.reward)}
                      <span className="font-headline text-lg text-foreground">{getRewardText(item.reward)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2 w-full">
                    <Button 
                      onClick={() => collectReward(item.day, item.reward)}
                      disabled={!canCollect} 
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:bg-muted disabled:text-muted-foreground"
                    >
                      {isCollected ? 'Coletado' : `Coletar (Dia ${item.day})`}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
