
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, Timer, Award, Play, RotateCw } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const GAME_DURATION = 30; // seconds
const GRID_SIZE = 9;

export default function MinigamesPage() {
  const { addXp, addCoins, ownedPets } = usePlayer();
  const { toast } = useToast();

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [activeHole, setActiveHole] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');

  const gamePets = ownedPets.length > 0 ? ownedPets : [
    { id: 'default1', name: 'Amiguinho', imageUrl: 'https://images.unsplash.com/photo-1527778676396-eceba283ddfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYWNob3JybyUyMGZpbGhvdGUlMjB8ZW58MHx8fHwxNzU2ODE5NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'puppy' }
  ];
  
  const [activePetImage, setActivePetImage] = useState(gamePets[0].imageUrl);


  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameState('playing');
  };

  const endGame = useCallback(() => {
    setGameState('finished');
    setActiveHole(null);
    const coinsEarned = Math.floor(score / 2);
    const xpEarned = score * 2;

    if (score > 0) {
      addCoins(coinsEarned);
      addXp(xpEarned);
      toast({
        title: 'Jogo Finalizado!',
        description: `Você ganhou ${coinsEarned} moedas e ${xpEarned} XP!`,
      });
    }
  }, [score, addCoins, addXp, toast]);


  useEffect(() => {
    if (gameState !== 'playing') return;

    if (timeLeft <= 0) {
      endGame();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft, endGame]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const showMole = setInterval(() => {
      const randomHole = Math.floor(Math.random() * GRID_SIZE);
      const randomPet = gamePets[Math.floor(Math.random() * gamePets.length)];
      setActivePetImage(randomPet.imageUrl);
      setActiveHole(randomHole);
      
      setTimeout(() => {
        if(gameState === 'playing') setActiveHole(null);
      }, 900 - (score * 5)); // Speed increases with score
    }, 1000 - (score * 5));

    return () => clearInterval(showMole);
  }, [gameState, score, gamePets]);


  const handleHoleClick = (holeIndex: number) => {
    if (holeIndex === activeHole) {
      setScore(prev => prev + 1);
      setActiveHole(null); // Remove instantly after click
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <section className="mb-8 text-center">
          <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4 flex items-center justify-center gap-4">
            <Gamepad2 className="h-10 w-10" />
            Pegue o Filhote!
          </h1>
          <p className="text-lg text-muted-foreground">
            Teste seus reflexos! Clique nos filhotes que aparecem nos buracos para marcar pontos.
          </p>
        </section>

        <section>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-1">
                <CardTitle>Placar: {score}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Timer className="h-5 w-5" />
                  <span>Tempo: {timeLeft}s</span>
                </div>
              </div>
              {gameState === 'playing' && <div className="text-lg font-bold text-primary animate-pulse">JOGANDO!</div>}
            </CardHeader>
            <CardContent>
              <div className={cn("grid grid-cols-3 gap-4 p-4 rounded-lg bg-green-200/50 border-4 border-dashed border-yellow-600/50", { 'cursor-not-allowed opacity-70': gameState !== 'playing' })}>
                {Array.from({ length: GRID_SIZE }).map((_, index) => (
                  <div key={index} 
                       className="relative w-full aspect-square bg-yellow-800/70 rounded-full flex items-center justify-center overflow-hidden shadow-inner"
                       onClick={() => gameState === 'playing' && handleHoleClick(index)}
                  >
                    {gameState === 'playing' && activeHole === index && (
                      <div className="absolute bottom-0 w-3/4 h-3/4 animate-bounce-slow">
                        <Image
                          src={activePetImage}
                          alt="Filhote"
                          fill
                          className="object-contain drop-shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              {gameState === 'idle' && (
                <Button onClick={startGame} size="lg">
                  <Play className="mr-2" /> Começar a Jogar
                </Button>
              )}
              {gameState === 'finished' && (
                 <div className="text-center flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-2xl font-bold">
                        <Award className="h-8 w-8 text-yellow-500" />
                        <span>Pontuação Final: {score}</span>
                    </div>
                    <Button onClick={startGame} size="lg">
                        <RotateCw className="mr-2" /> Jogar Novamente
                    </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </section>
      </div>
    </main>
  );
}
