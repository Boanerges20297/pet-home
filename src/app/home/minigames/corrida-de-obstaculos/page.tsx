
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Award, RotateCw, Flag } from 'lucide-react';
import Link from 'next/link';
import { usePlayer } from '@/context/PlayerContext';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

const TRACK_LENGTH = 10;
const OBSTACLE_INTERVAL_MS = 2000;
const JUMP_SUCCESS_WINDOW_MS = 350;

export default function ObstacleRacePage() {
  const { addXp, addCoins, ownedPets } = usePlayer();
  const { toast } = useToast();

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [petPosition, setPetPosition] = useState(0);
  const [obstaclePosition, setObstaclePosition] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  const pet = ownedPets[0] || { id: 'default', name: 'Corredor', imageUrl: 'https://images.unsplash.com/photo-1558929996-da64ba858215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhZ2lsaXR5JTIwZG9nfGVufDB8fHx8MTc1ODIyMTc4NXww&ixlib=rb-4.1.0&q=80&w=1080' };

  const gameLoopRef = useRef<NodeJS.Timeout>();
  const obstacleTimerRef = useRef<NodeJS.Timeout>();

  const resetGame = useCallback(() => {
    setGameState('idle');
    setPetPosition(0);
    setObstaclePosition(null);
    setScore(0);
    setIsJumping(false);
    clearInterval(gameLoopRef.current);
    clearTimeout(obstacleTimerRef.current);
  }, []);

  const startGame = () => {
    resetGame();
    setGameState('playing');
  };

  const handleJump = useCallback(() => {
    if (gameState !== 'playing' || isJumping) return;

    if (obstaclePosition !== null && obstaclePosition < 2 && obstaclePosition > 0) {
      // Successful jump
      setScore((s) => s + 1);
      toast({ title: "Boa!", description: "Você saltou o obstáculo!" });
      setObstaclePosition(null); // Clear obstacle after jump
    } else {
      // Failed jump
      toast({ title: "Oh não!", description: "Você tropeçou.", variant: 'destructive' });
      setGameState('finished');
      return;
    }

    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 500);
  }, [gameState, isJumping, obstaclePosition, toast]);


  useEffect(() => {
    if (gameState !== 'playing') return;

    // Game loop for pet and obstacle movement
    gameLoopRef.current = setInterval(() => {
        if(petPosition < TRACK_LENGTH) {
            setPetPosition(p => p + 0.1);
        } else {
            setGameState('finished');
        }

        setObstaclePosition(pos => {
            if (pos === null) return null;
            const newPos = pos - 0.2;
            if (newPos < -1) return null; // Obstacle passed
            // Check for collision
            if (!isJumping && newPos < 1 && newPos > 0.5) {
                setGameState('finished');
            }
            return newPos;
        });

    }, 100);

    // Obstacle generation
    obstacleTimerRef.current = setTimeout(function generateObstacle() {
        if (gameState === 'playing') {
            setObstaclePosition(TRACK_LENGTH);
            obstacleTimerRef.current = setTimeout(generateObstacle, Math.random() * 1500 + OBSTACLE_INTERVAL_MS);
        }
    }, OBSTACLE_INTERVAL_MS);


    return () => {
        clearInterval(gameLoopRef.current);
        clearTimeout(obstacleTimerRef.current);
    }
  }, [gameState, isJumping, petPosition]);
  
  // Handle game finish
  useEffect(() => {
      if(gameState === 'finished' && petPosition > 0) {
          const coinsEarned = score * 5;
          const xpEarned = score * 10;
          if(score > 0) {
              addCoins(coinsEarned);
              addXp(xpEarned);
              toast({
                  title: "Fim de jogo!",
                  description: `Você ganhou ${coinsEarned} moedas e ${xpEarned} XP.`
              })
          }
      }
  }, [gameState, score, addCoins, addXp, toast, petPosition]);


  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
      <div className="mx-auto max-w-2xl w-full">
        <Link href="/home/minigames" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" />
          Voltar para os Minigames
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Corrida de Obstáculos</CardTitle>
            <CardDescription className="text-lg">
              Pressione "Saltar" na hora certa para desviar dos obstáculos!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="w-full h-48 bg-green-200/50 rounded-lg overflow-hidden relative border-4 border-yellow-600/50">
                 {/* Finish Line */}
                 <Flag className="absolute h-10 w-10 text-primary z-10" style={{ right: '5%', top: '50%' }} />

                {/* Pet */}
                <div
                    className={cn("absolute bottom-4 w-20 h-20 transition-transform duration-300", { 'animate-bounce': isJumping })}
                    style={{ left: `${(petPosition / TRACK_LENGTH) * 80}%` }}
                >
                    <Image src={pet.imageUrl} alt={pet.name} fill className="object-contain drop-shadow-lg" />
                </div>
                
                 {/* Obstacle */}
                {obstaclePosition !== null && (
                    <div
                        className="absolute bottom-4 w-12 h-12 bg-red-400 rounded-md"
                        style={{ left: `${(obstaclePosition / TRACK_LENGTH) * 100}%` }}
                    />
                )}
                 
                 <div className='absolute bottom-0 left-0 w-full h-5 bg-green-600/70' />
             </div>
             
             <div className='text-center font-bold text-2xl'>Pontuação: {score}</div>
             <Progress value={(petPosition / TRACK_LENGTH) * 100} className="h-4" />

          </CardContent>
           <CardFooter className="flex-col gap-4 justify-center">
                {gameState === 'idle' && <Button onClick={startGame} size="lg"><Play className="mr-2" />Começar</Button>}
                {gameState === 'playing' && <Button onClick={handleJump} size="lg">Saltar!</Button>}
                {gameState === 'finished' && (
                    <div className="text-center flex flex-col items-center gap-4">
                        <p className="text-2xl font-bold"><Award className="inline h-8 w-8 text-yellow-500" /> Pontuação Final: {score}</p>
                        <Button onClick={startGame} size="lg"><RotateCw className="mr-2" />Jogar Novamente</Button>
                    </div>
                )}
            </CardFooter>
        </Card>
      </div>
    </main>
  );
}
