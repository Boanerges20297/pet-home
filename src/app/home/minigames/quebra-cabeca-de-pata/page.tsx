
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Award, RotateCw } from 'lucide-react';
import Link from 'next/link';
import { usePlayer } from '@/context/PlayerContext';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const GRID_SIZE = 3; // 3x3 grid

const shuffle = (array: number[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const isSolvable = (tiles: number[]) => {
    let inversions = 0;
    for (let i = 0; i < tiles.length - 1; i++) {
        for (let j = i + 1; j < tiles.length; j++) {
            if (tiles[i] > tiles[j] && tiles[i] !== 0 && tiles[j] !== 0) {
                inversions++;
            }
        }
    }
    return inversions % 2 === 0;
};

const getShuffledTiles = () => {
    let tiles: number[];
    do {
        tiles = shuffle(Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i));
    } while (!isSolvable(tiles));
    return tiles;
}


export default function PuzzlePage() {
  const { addXp, addCoins, ownedPets } = usePlayer();
  const { toast } = useToast();

  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [puzzleImage, setPuzzleImage] = useState('https://images.unsplash.com/photo-1546419359-2dfb78498a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwdXp6bGUlMjBkb2d8ZW58MHx8fHwxNzU4MjIxODM2fDA&ixlib=rb-4.1.0&q=80&w=1080');

  useEffect(() => {
    if (ownedPets.length > 0) {
      setPuzzleImage(ownedPets[Math.floor(Math.random() * ownedPets.length)].imageUrl);
    }
    resetGame();
  }, []);

  const resetGame = useCallback(() => {
    setTiles(getShuffledTiles());
    setMoves(0);
    setIsFinished(false);
  }, []);

  const checkWin = (currentTiles: number[]) => {
    for (let i = 0; i < currentTiles.length; i++) {
      if (currentTiles[i] !== i) return false;
    }
    return true;
  };

  const handleTileClick = (index: number) => {
    if (isFinished) return;

    const emptyIndex = tiles.indexOf(GRID_SIZE * GRID_SIZE - 1);
    const validMoves = [
      emptyIndex - 1, // left
      emptyIndex + 1, // right
      emptyIndex - GRID_SIZE, // top
      emptyIndex + GRID_SIZE, // bottom
    ];

    // Check for valid horizontal moves
    if ((emptyIndex % GRID_SIZE === 0 && index === emptyIndex - 1) || (emptyIndex % GRID_SIZE === GRID_SIZE - 1 && index === emptyIndex + 1)) {
       // invalid move
    } else if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves(m => m + 1);

      if (checkWin(newTiles)) {
        setIsFinished(true);
        const coinsEarned = Math.max(10, 50 - moves);
        const xpEarned = Math.max(20, 100 - moves * 2);
        addCoins(coinsEarned);
        addXp(xpEarned);
        toast({
            title: "Você conseguiu!",
            description: `Você resolveu o quebra-cabeça em ${moves + 1} movimentos e ganhou ${coinsEarned} moedas e ${xpEarned} XP!`,
        });
      }
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
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Quebra-Cabeça de Pata</CardTitle>
            <CardDescription className="text-lg">
              Deslize as peças para montar a imagem do filhote!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col items-center">
             <div 
                className="grid gap-1 bg-muted p-2 rounded-lg"
                style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`}}
              >
                {tiles.map((tile, index) => {
                    const isEmpty = tile === GRID_SIZE * GRID_SIZE - 1;
                    const top = -Math.floor(tile / GRID_SIZE) * (100);
                    const left = - (tile % GRID_SIZE) * (100);

                    return (
                        <div key={index} onClick={() => handleTileClick(index)} className="w-24 h-24 border-2 border-background cursor-pointer overflow-hidden relative bg-card">
                           {!isEmpty && (
                             <div 
                                className="absolute w-[300%] h-[300%]"
                                style={{
                                    backgroundImage: `url(${puzzleImage})`,
                                    backgroundSize: '100% 100%',
                                    top: `${top}%`,
                                    left: `${left}%`,
                                    transition: 'top 0.3s, left 0.3s'
                                }}
                            />
                           )}
                        </div>
                    )
                })}
             </div>
             <div className="text-xl font-bold">Movimentos: {moves}</div>
          </CardContent>
           <CardFooter className="flex-col gap-4 justify-center">
                {isFinished ? (
                    <div className="text-center flex flex-col items-center gap-4">
                        <p className="text-2xl font-bold"><Award className="inline h-8 w-8 text-yellow-500" /> Quebra-Cabeça Resolvido!</p>
                        <Button onClick={resetGame} size="lg"><RotateCw className="mr-2" />Jogar Novamente</Button>
                    </div>
                ) : (
                   <Button onClick={resetGame} size="lg" variant="outline"><RotateCw className="mr-2" />Reiniciar</Button>
                )}
            </CardFooter>
        </Card>
      </div>
    </main>
  );
}
