import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Gift } from 'lucide-react';

const dailyRewards = [
  { day: 1, reward: 50 },
  { day: 2, reward: 75 },
  { day: 3, reward: 100 },
  { day: 4, reward: 125 },
  { day: 5, reward: 150 },
  { day: 6, reward: 200 },
  { day: 7, reward: 500, isSpecial: true },
];

export default function DailyRewardsPage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <section className="mb-12 text-center">
          <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4">
            Prêmios Diários
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Volte todos os dias para coletar recompensas. Não perca sua sequência!
          </p>
        </section>

        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {dailyRewards.map((item) => (
              <Card
                key={item.day}
                className={`flex flex-col items-center justify-center p-4 text-center transition-all bg-card
                  ${item.isSpecial ? 'bg-yellow-100 dark:bg-yellow-900/30' : ''}`}
              >
                <CardHeader className="p-2">
                  <CardTitle className="font-headline text-lg text-foreground">Dia {item.day}</CardTitle>
                </CardHeader>
                <CardContent className="p-2 flex-grow flex flex-col items-center justify-center">
                  <Gift className="h-10 w-10 mb-2 text-primary" />
                  <div className="flex items-center gap-1">
                    <Coins className="h-5 w-5 text-yellow-500" />
                    <span className="font-headline text-xl text-foreground">{item.reward}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-2 w-full">
                  <Button disabled className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Coletar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
