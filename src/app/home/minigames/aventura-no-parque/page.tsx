
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Award, Search, RotateCw } from 'lucide-react';
import Link from 'next/link';
import { usePlayer } from '@/context/PlayerContext';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type HiddenItem = {
    id: number;
    name: string;
    reward: { type: 'coins' | 'xp', amount: number};
    position: { top: string; left: string };
    found: boolean;
    icon: React.ReactNode;
}

const initialItems: HiddenItem[] = [
    { id: 1, name: 'Osso Enterrado', reward: { type: 'xp', amount: 30 }, position: { top: '75%', left: '20%' }, found: false, icon: <div className='w-8 h-8 bg-yellow-800/50 rounded-full' /> },
    { id: 2, name: 'Pote de Moedas', reward: { type: 'coins', amount: 25 }, position: { top: '40%', left: '80%' }, found: false, icon: <div className='w-6 h-6 bg-yellow-400/50 rounded-lg' /> },
    { id: 3, name: 'Brinquedo Perdido', reward: { type: 'xp', amount: 15 }, position: { top: '60%', left: '55%' }, found: false, icon: <div className='w-5 h-5 bg-red-500/50 rounded-full' /> },
    { id: 4, name: 'Gema Brilhante', reward: { type: 'coins', amount: 50 }, position: { top: '15%', left: '10%' }, found: false, icon: <div className='w-4 h-4 bg-blue-500/50 rounded-sm rotate-45' /> },
];

export default function ParkAdventurePage() {
  const { addXp, addCoins } = usePlayer();
  const { toast } = useToast();
  const [hiddenItems, setHiddenItems] = useState<HiddenItem[]>(initialItems);

  const handleFindItem = (id: number) => {
    const item = hiddenItems.find(i => i.id === id);
    if (!item || item.found) return;

    setHiddenItems(items => items.map(i => i.id === id ? {...i, found: true} : i));

    if (item.reward.type === 'coins') {
        addCoins(item.reward.amount);
    } else {
        addXp(item.reward.amount);
    }

    toast({
        title: "Você encontrou algo!",
        description: `Você achou: ${item.name} e ganhou ${item.reward.amount} ${item.reward.type}!`
    })
  }
  
  const allFound = hiddenItems.every(i => i.found);

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
      <div className="mx-auto max-w-4xl w-full">
        <Link href="/home/minigames" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" />
          Voltar para os Minigames
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Aventura no Parque</CardTitle>
            <CardDescription className="text-lg">
              Clique no cenário para encontrar itens escondidos e ganhar prêmios!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <div className='relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden border-2 border-dashed'>
                <Image src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwYXJrJTIwZG9nfGVufDB8fHx8MTc1ODIyMjA3M3ww&ixlib.rb-4.1.0&q=80&w=1080" alt="Parque" fill className='object-cover' />
                {hiddenItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => handleFindItem(item.id)}
                        disabled={item.found}
                        className={cn('absolute w-12 h-12 flex items-center justify-center rounded-full transition-opacity', { 'opacity-0 cursor-default': item.found, 'hover:bg-yellow-300/50': !item.found })}
                        style={{ top: item.position.top, left: item.position.left, transform: 'translate(-50%, -50%)' }}
                        aria-label={`Encontrar ${item.name}`}
                    >
                       {item.found && <Search className="w-8 h-8 text-green-500 animate-ping" />}
                    </button>
                ))}
            </div>
            <div>
                <ul className='list-disc pl-5'>
                    {hiddenItems.map(item => (
                        <li key={item.id} className={cn({'line-through text-muted-foreground': item.found})}>
                           {item.name} (+{item.reward.amount} {item.reward.type})
                        </li>
                    ))}
                </ul>
            </div>
          </CardContent>
           <CardFooter className="flex-col gap-4 justify-center">
             {allFound && (
                 <div className='text-center flex flex-col items-center gap-2'>
                    <p className="text-2xl font-bold text-yellow-500 flex items-center gap-2"><Award /> Você encontrou tudo!</p>
                     <Button onClick={() => setHiddenItems(initialItems.map(i => ({...i, found: false})))}><RotateCw className="mr-2" />Jogar Novamente</Button>
                 </div>
             )}
           </CardFooter>
        </Card>
      </div>
    </main>
  );
}
