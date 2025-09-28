
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Award, RotateCw, Sparkles, Shower, Droplets } from 'lucide-react';
import Link from 'next/link';
import { usePlayer } from '@/context/PlayerContext';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const GAME_DURATION = 15; // seconds
const PROGRESS_PER_CLICK = 5;

export default function FunBathPage() {
  const { addXp, addCoins, ownedPets, isLoading } = usePlayer();
  const { toast } = useToast();

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [progress, setProgress] = useState(0);

  const pet = ownedPets.length > 0 ? ownedPets[0] : { id: 'default', name: 'Amiguinho', imageUrl: 'https://images.unsplash.com/photo-1556872513-f69904c18596?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkb2clMjBiYXRofGVufDB8fHx8MTc1ODIyMjAxNHww&ixlib=rb-4.1.0&q=80&w=1080' };

  const timerRef = useRef<NodeJS.Timeout>();

  const resetGame = useCallback(() => {
    setGameState('idle');
    setTimeLeft(GAME_DURATION);
    setProgress(0);
    clearInterval(timerRef.current);
  }, []);

  const startGame = () => {
    resetGame();
    setGameState('playing');
  };

  const handleWashClick = () => {
    if (gameState !== 'playing') return;
    setProgress(p => Math.min(100, p + PROGRESS_PER_CLICK));
  };
  
  useEffect(() => {
      if(progress >= 100 && gameState === 'playing') {
          setGameState('finished');
          const coinsEarned = 20;
          const xpEarned = 40;
          addCoins(coinsEarned);
          addXp(xpEarned);
          toast({
              title: "Filhote Limpinho!",
              description: `Você ganhou ${coinsEarned} moedas e ${xpEarned} XP!`
          })
      }
  }, [progress, gameState, addCoins, addXp, toast]);
  
  useEffect(() => {
      if (gameState === 'playing') {
          timerRef.current = setInterval(() => {
              setTimeLeft(t => t - 1);
          }, 1000);
      }
      return () => clearInterval(timerRef.current);
  }, [gameState]);

  useEffect(() => {
      if (timeLeft <= 0 && gameState === 'playing') {
          setGameState('finished');
          toast({
              title: "O tempo acabou!",
              description: "Seu filhote ainda precisa de um banho.",
              variant: "destructive"
          })
      }
  }, [timeLeft, gameState, toast]);

  if (isLoading) {
    return (
      <main className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
        <div className="mx-auto max-w-2xl w-full">
          <Skeleton className="h-[600px] w-full" />
        </div>
      </main>
    )
  }


  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
      <div className="mx-auto max-w-2xl w-full">
        <Link href="/home/minigames" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" />
          Voltar para os Minigames
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Banho Divertido</CardTitle>
            <CardDescription className="text-lg">
              Clique o mais rápido que puder para dar um banho no seu filhote!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-6">
            <div className="relative w-64 h-64">
                <Image src={pet.imageUrl} alt={pet.name} fill className='object-cover rounded-full' />
                <div className='absolute inset-0 bg-blue-300/50 rounded-full flex items-center justify-center' style={{ clipPath: `inset(${progress}% 0 0 0)` }}/>
                <Droplets className='absolute top-2 right-2 w-16 h-16 text-blue-500 animate-bounce' />
            </div>

            <div className='w-full space-y-2'>
                 <div className="flex justify-between font-bold text-lg">
                    <span className='text-primary'>Progresso</span>
                    <span className='text-destructive'>Tempo: {timeLeft}s</span>
                </div>
                <Progress value={progress} className="h-6" />
            </div>

            <Button onClick={handleWashClick} size="lg" disabled={gameState !== 'playing'}>
                <Shower className='mr-2'/>
                Lavar!
            </Button>
          </CardContent>
           <CardFooter className="flex-col gap-4 justify-center">
                {gameState === 'idle' && <Button onClick={startGame} size="lg"><Play className="mr-2" />Começar</Button>}
                {gameState === 'finished' && (
                    <div className="text-center flex flex-col items-center gap-4">
                        {progress >= 100 ? (
                           <p className="text-2xl font-bold"><Award className="inline h-8 w-8 text-yellow-500" /> Banho completo!</p>
                        ) : (
                           <p className="text-2xl font-bold text-destructive">Tempo esgotado!</p>
                        )}
                        <Button onClick={startGame} size="lg"><RotateCw className="mr-2" />Jogar Novamente</Button>
                    </div>
                )}
            </CardFooter>
        </Card>
      </div>
    </main>
  );
}
