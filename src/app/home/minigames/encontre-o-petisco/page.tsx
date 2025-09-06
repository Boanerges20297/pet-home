
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Award, RotateCw, Bone } from 'lucide-react';
import Link from 'next/link';
import { usePlayer } from '@/context/PlayerContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const CUP_COUNT = 3;

export default function FindTheTreatPage() {
  const { addXp, addCoins } = usePlayer();
  const { toast } = useToast();

  const [gameState, setGameState] = useState<'idle' | 'shuffling' | 'playing' | 'revealed'>('idle');
  const [cupPositions, setCupPositions] = useState<number[]>(Array.from(Array(CUP_COUNT).keys()));
  const [winningCup, setWinningCup] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startGame = () => {
    setGameState('shuffling');
    setIsAnimating(true);
    const newWinningCup = Math.floor(Math.random() * CUP_COUNT);
    setWinningCup(newWinningCup);

    // Show the treat
    setTimeout(() => {
        // Shuffle animation
        let shuffles = 0;
        const interval = setInterval(() => {
            const pos = [...cupPositions];
            const i = Math.floor(Math.random() * CUP_COUNT);
            let j = Math.floor(Math.random() * CUP_COUNT);
            while (i === j) {
                j = Math.floor(Math.random() * CUP_COUNT);
            }
            [pos[i], pos[j]] = [pos[j], pos[i]];
            setCupPositions(pos);

            shuffles++;
            if (shuffles >= 10) {
                clearInterval(interval);
                setIsAnimating(false);
                setGameState('playing');
            }
        }, 300);
    }, 1500);
  };
  
  const handleCupClick = (index: number) => {
    if (gameState !== 'playing') return;

    setGameState('revealed');
    if (index === winningCup) {
      const coinsEarned = 25;
      const xpEarned = 50;
      addCoins(coinsEarned);
      addXp(xpEarned);
      toast({
        title: "Você encontrou!",
        description: `Você ganhou ${coinsEarned} moedas e ${xpEarned} XP!`,
      });
    } else {
       toast({
        title: "Oh não!",
        description: "O petisco não estava aí. Tente novamente!",
        variant: "destructive"
      });
    }
  };


  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
      <div className="mx-auto max-w-2xl w-full">
        <Link href="/home/minigames" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" />
          Voltar para os Minigames
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Encontre o Petisco</CardTitle>
            <CardDescription className="text-lg">
              Preste atenção e descubra onde o petisco está escondido!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <div className="relative w-full flex justify-around items-center">
              {cupPositions.map((pos, index) => (
                 <div
                    key={index}
                    onClick={() => handleCupClick(index)}
                    className={cn(
                        "relative w-32 h-32 cursor-pointer transition-all duration-300 ease-in-out",
                        {'cursor-not-allowed': gameState !== 'playing'},
                    )}
                     style={{
                        transform: (gameState === 'shuffling' || (gameState === 'revealed' && winningCup === index)) ? 'translateY(-30px)' : 'translateY(0)',
                    }}
                 >
                    <div
                        className={cn(
                          "absolute w-full h-full bg-red-400 rounded-t-full border-b-8 border-red-600 z-10 transition-transform duration-300",
                        )}
                    />
                    {(gameState === 'shuffling' || (gameState === 'revealed')) && index === winningCup && (
                        <Bone className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 h-10 w-10 text-yellow-500 z-0" />
                    )}
                 </div>
              ))}
            </div>
             {gameState === 'shuffling' && <p className='mt-8 text-primary font-bold animate-pulse'>Preste atenção...</p>}
          </CardContent>
           <CardFooter className="flex-col gap-4 justify-center">
                {gameState === 'idle' && <Button onClick={startGame} size="lg"><Play className="mr-2" />Começar</Button>}
                {gameState === 'playing' && <p className="text-lg font-semibold">Onde está o petisco?</p>}
                {gameState === 'revealed' && (
                    <div className="text-center flex flex-col items-center gap-4">
                        <Button onClick={startGame} size="lg"><RotateCw className="mr-2" />Jogar Novamente</Button>
                    </div>
                )}
            </CardFooter>
        </Card>
      </div>
    </main>
  );
}
