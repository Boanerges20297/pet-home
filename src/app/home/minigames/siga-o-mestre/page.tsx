
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Award, RotateCw, Dog, Cat, Star } from 'lucide-react';
import Link from 'next/link';
import { usePlayer } from '@/context/PlayerContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import * as Tone from 'tone';

const SOUNDS = {
  dog: { note: 'C4', color: 'bg-blue-500', hover: 'hover:bg-blue-600', icon: Dog },
  cat: { note: 'G4', color: 'bg-orange-500', hover: 'hover:bg-orange-600', icon: Cat },
};

type SoundKey = keyof typeof SOUNDS;

export default function SimonSaysPage() {
  const { addXp, addCoins } = usePlayer();
  const { toast } = useToast();

  const [sequence, setSequence] = useState<SoundKey[]>([]);
  const [playerSequence, setPlayerSequence] = useState<SoundKey[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'player_turn' | 'finished'>('idle');
  const [activeButton, setActiveButton] = useState<SoundKey | null>(null);

  const synth = useRef<Tone.Synth | null>(null);

  useEffect(() => {
    synth.current = new Tone.Synth().toDestination();
  }, []);

  const playSound = useCallback((key: SoundKey) => {
    Tone.start();
    synth.current?.triggerAttackRelease(SOUNDS[key].note, '8n');
    setActiveButton(key);
    setTimeout(() => setActiveButton(null), 300);
  }, []);

  const playSequence = useCallback(() => {
    setGameState('playing');
    let i = 0;
    const interval = setInterval(() => {
      playSound(sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        setGameState('player_turn');
      }
    }, 600);
  }, [sequence, playSound]);

  const nextRound = useCallback(() => {
      const nextSound: SoundKey = Object.keys(SOUNDS)[Math.floor(Math.random() * Object.keys(SOUNDS).length)] as SoundKey;
      setPlayerSequence([]);
      const newSequence = [...sequence, nextSound];
      setSequence(newSequence);
  }, [sequence]);
  
  useEffect(() => {
    if(gameState === 'playing' && sequence.length > 0) {
        playSequence();
    }
  }, [sequence, gameState, playSequence]);

  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setGameState('playing');
    // Start the first round
    const firstSound: SoundKey = Object.keys(SOUNDS)[Math.floor(Math.random() * Object.keys(SOUNDS).length)] as SoundKey;
    setSequence([firstSound]);
  };
  
  const handlePlayerInput = (key: SoundKey) => {
    if (gameState !== 'player_turn') return;
    playSound(key);
    const newPlayerSequence = [...playerSequence, key];
    setPlayerSequence(newPlayerSequence);

    // Check if correct
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameState('finished');
      const score = sequence.length - 1;
      const coinsEarned = score * 5;
      const xpEarned = score * 10;
       if (score > 0) {
        addCoins(coinsEarned);
        addXp(xpEarned);
        toast({
            title: "Fim de Jogo!",
            description: `Você chegou à rodada ${score} e ganhou ${coinsEarned} moedas e ${xpEarned} XP!`,
            variant: "destructive"
        });
      }
      return;
    }

    // Check if round is complete
    if (newPlayerSequence.length === sequence.length) {
      setTimeout(() => {
          nextRound();
      }, 1000);
    }
  };
  
  const score = Math.max(0, sequence.length - 1);

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
      <div className="mx-auto max-w-2xl w-full">
        <Link href="/home/minigames" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" />
          Voltar para os Minigames
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Siga o Mestre</CardTitle>
            <CardDescription className="text-lg">
              Repita a sequência de sons para testar sua memória.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-6">
            <div className="text-2xl font-bold flex items-center gap-2">
                <Star className="text-yellow-400" />
                <span>Pontuação: {score}</span>
            </div>
            <div className="flex gap-4">
              {(Object.keys(SOUNDS) as SoundKey[]).map(key => {
                const sound = SOUNDS[key];
                return (
                  <Button
                    key={key}
                    onClick={() => handlePlayerInput(key)}
                    disabled={gameState !== 'player_turn'}
                    className={cn("w-32 h-32 rounded-full text-white text-4xl shadow-lg transition-all", sound.color, sound.hover, { 'animate-pulse': activeButton === key, 'opacity-50 cursor-not-allowed': gameState !== 'player_turn' })}
                  >
                    <sound.icon className="w-16 h-16" />
                  </Button>
                )
              })}
            </div>
             <p className='h-6 font-semibold text-primary'>
                {gameState === 'playing' && 'Observe a sequência...'}
                {gameState === 'player_turn' && 'Sua vez!'}
                {gameState === 'finished' && 'Fim de Jogo!'}
             </p>
          </CardContent>
           <CardFooter className="flex-col gap-4 justify-center">
                {gameState === 'idle' && <Button onClick={startGame} size="lg"><Play className="mr-2" />Começar</Button>}
                {gameState === 'finished' && (
                     <Button onClick={startGame} size="lg"><RotateCw className="mr-2" />Jogar Novamente</Button>
                )}
            </CardFooter>
        </Card>
      </div>
    </main>
  );
}
