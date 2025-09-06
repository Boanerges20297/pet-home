
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Award, RotateCw } from 'lucide-react';
import Link from 'next/link';
import { usePlayer } from '@/context/PlayerContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const cardImages = [
  'https://images.unsplash.com/photo-1574158622682-e40e69841006?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1583337130417-23460411751f?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=100&h=100&fit=crop',
];

const shuffleCards = () => {
    const doubledCards = [...cardImages, ...cardImages];
    return doubledCards
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

export default function MemoryGamePage() {
  const { addXp, addCoins } = usePlayer();
  const { toast } = useToast();

  const [cards, setCards] = useState(shuffleCards());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const resetGame = () => {
    setCards(shuffleCards());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsDisabled(false);
  };
  
  useEffect(() => {
    if(matched.length === cardImages.length) {
        const coinsEarned = Math.max(10, 50 - moves);
        const xpEarned = Math.max(20, 100 - moves * 2);
        addCoins(coinsEarned);
        addXp(xpEarned);
        toast({
            title: "Você Venceu!",
            description: `Você encontrou todos os pares em ${moves} jogadas e ganhou ${coinsEarned} moedas e ${xpEarned} XP!`,
        });
    }
  }, [matched]);


  useEffect(() => {
    if (flipped.length === 2) {
      setIsDisabled(true);
      const [firstIndex, secondIndex] = flipped;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatched(prev => [...prev, cards[firstIndex]]);
        setFlipped([]);
        setIsDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setIsDisabled(false);
        }, 1000);
      }
      setMoves(m => m + 1);
    }
  }, [flipped, cards]);

  const handleCardClick = (index: number) => {
    if (isDisabled || flipped.includes(index) || matched.includes(cards[index])) {
      return;
    }
    setFlipped(prev => [...prev, index]);
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
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Memória Animal</CardTitle>
            <CardDescription className="text-lg">
              Vire as cartas e encontre todos os pares de animais!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-4 gap-3">
              {cards.map((imageUrl, index) => {
                 const isFlipped = flipped.includes(index) || matched.includes(imageUrl);
                 return (
                    <div key={index} onClick={() => handleCardClick(index)} 
                        className={cn("w-20 h-20 rounded-md cursor-pointer transition-transform duration-500", { 'transform [transform:rotateY(180deg)]': isFlipped, '[transform-style:preserve-3d]': true })}>
                        <div className="absolute w-full h-full bg-secondary rounded-md backface-hidden flex items-center justify-center">
                            <span className="text-3xl text-secondary-foreground">?</span>
                        </div>
                         <div className="absolute w-full h-full bg-card rounded-md [transform:rotateY(180deg)] backface-hidden">
                            <Image src={imageUrl} alt="Animal" layout="fill" className="object-cover rounded-md"/>
                         </div>
                    </div>
                 )
              })}
            </div>
             <p className="text-xl font-bold">Jogadas: {moves}</p>
          </CardContent>
          <CardFooter className="flex-col gap-4 justify-center">
              {matched.length === cardImages.length ? (
                 <div className="text-center flex flex-col items-center gap-4">
                    <p className="text-2xl font-bold"><Award className="inline h-8 w-8 text-yellow-500" /> Parabéns!</p>
                    <Button onClick={resetGame} size="lg"><RotateCw className="mr-2" />Jogar Novamente</Button>
                </div>
              ) : (
                <Button onClick={resetGame} variant="outline" size="lg"><RotateCw className="mr-2" />Reiniciar</Button>
              )}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
