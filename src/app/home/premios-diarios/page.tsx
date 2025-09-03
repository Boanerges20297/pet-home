
"use client";

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Gift, CheckCircle2, Gem } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

const generateRewards = (days: number) => {
  return Array.from({ length: days }, (_, i) => {
    const day = i + 1;
    const week = Math.floor(i / 7);
    const dayOfWeek = i % 7;
    
    let rewardType: 'coins' | 'gems' = 'coins';
    let rewardAmount = 50 + dayOfWeek * 25 + week * 50;
    let isSpecial = false;

    if (day === 2 || (day > 7 && (day - 2) % 7 === 0)) { // Give gems on day 2 of each week
        rewardType = 'gems';
        rewardAmount = 5 + week; // Increasing gem reward each week
        isSpecial = true;
    } else if ((day % 7) === 0) { // Big coin reward at the end of the week
      rewardAmount = 200 + week * 150;
      isSpecial = true;
    }

    return { day, reward: { type: rewardType, amount: rewardAmount }, isSpecial };
  });
};

export default function DailyRewardsPage() {
  const { currentDay, collectedDays, collectReward } = usePlayer();
  
  const dailyRewards = useMemo(() => generateRewards(90), []);

  const handleCollect = (day: number, reward: { type: 'coins' | 'gems'; amount: number }) => {
    collectReward(day, reward.amount, reward.type);
  };

  const isCollected = (day: number) => collectedDays.includes(day);

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
              const collected = isCollected(item.day);
              const canCollect = item.day === currentDay && !collected;

              return (
                <Card
                  key={item.day}
                  className={`flex flex-col items-center justify-center p-4 text-center transition-all 
                    ${item.isSpecial ? 'border-yellow-400' : ''}
                    ${collected ? 'bg-muted/50' : 'bg-card'}
                    ${canCollect ? 'border-primary ring-2 ring-primary' : ''}`}
                >
                  <CardHeader className="p-2">
                    <CardTitle className="font-headline text-lg text-foreground">Dia {item.day}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 flex-grow flex flex-col items-center justify-center">
                    {collected ? (
                      <CheckCircle2 className="h-10 w-10 mb-2 text-green-500" />
                    ) : (
                      <Gift className="h-10 w-10 mb-2 text-primary" />
                    )}
                    <div className="flex items-center gap-1">
                      {item.reward.type === 'coins' ? (
                        <Coins className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Gem className="h-5 w-5 text-blue-500" />
                      )}
                      <span className="font-headline text-xl text-foreground">{item.reward.amount}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-2 w-full">
                    <Button 
                      onClick={() => handleCollect(item.day, item.reward)}
                      disabled={!canCollect} 
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:bg-muted disabled:text-muted-foreground"
                    >
                      {collected ? 'Coletado' : 'Coletar'}
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
