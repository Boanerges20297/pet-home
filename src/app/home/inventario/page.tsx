
'use client';

import { ReactElement } from 'react';
import Link from 'next/link';
import { usePlayer } from '@/context/PlayerContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Backpack, Bone, Apple, Beef, FlaskConical, TestTube2, Droplets, Beaker, Bot, Wand2, Sparkles, Star, Atom, CircleDashed, Dna, Eye, Baby, Utensils } from 'lucide-react';

const getIconForItem = (itemId: string): ReactElement => {
    if (itemId.includes('food_premium')) return <Beef className="h-8 w-8" />;
    if (itemId.includes('food_biscuit')) return <Bone className="h-8 w-8" />;
    if (itemId.includes('food_fruits')) return <Apple className="h-8 w-8" />;
    if (itemId.includes('potion_stork')) return <Baby className="h-8 w-8" />;
    if (itemId.includes('potion_coin_10000')) return <CircleDashed className="h-8 w-8" />;
    if (itemId.includes('potion_coin_1000')) return <Beaker className="h-8 w-8" />;
    if (itemId.includes('potion_coin_100')) return <TestTube2 className="h-8 w-8" />;
    if (itemId.includes('potion_coin')) return <Wand2 className="h-8 w-8" />;
    if (itemId.includes('potion_xp_5000')) return <Sparkles className="h-8 w-8" />;
    if (itemId.includes('potion_xp_4000')) return <Atom className="h-8 w-8" />;
    if (itemId.includes('potion_xp_2500')) return <Atom className="h-8 w-8" />;
    if (itemId.includes('potion_xp_1000')) return <Sparkles className="h-8 w-8" />;
    if (itemId.includes('potion_xp_750')) return <Eye className="h-8 w-8" />;
    if (itemId.includes('potion_xp_500')) return <Bot className="h-8 w-8" />;
    if (itemId.includes('potion_xp_350')) return <Dna className="h-8 w-8" />;
    if (itemId.includes('potion_xp_200')) return <FlaskConical className="h-8 w-8" />;
    if (itemId.includes('potion_xp')) return <Droplets className="h-8 w-8" />;
    return <Utensils className="h-8 w-8" />;
};


export default function InventoryPage() {
  const { inventory } = usePlayer();

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12">
          <div className="text-center">
            <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4 flex items-center justify-center gap-4">
              <Backpack className="h-10 w-10" />
              Inventário de Itens
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aqui estão todas as suas poções, comidas e outros tesouros.
            </p>
          </div>
        </section>

        {inventory.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {inventory.map((item) => (
                <Card key={item.id} className="flex flex-col items-center justify-center p-4 text-center">
                <CardHeader className="p-2">
                    <div className="text-primary">{getIconForItem(item.id)}</div>
                </CardHeader>
                <CardContent className="p-2 flex-grow flex flex-col items-center justify-center">
                    <CardTitle className="font-headline text-lg text-foreground">{item.name}</CardTitle>
                    <CardDescription className="font-bold text-xl">x{item.quantity}</CardDescription>
                </CardContent>
                </Card>
            ))}
            </div>
        ) : (
            <div className="text-center py-16 px-6 border-2 border-dashed rounded-lg">
            <Backpack className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold text-foreground">Seu inventário de itens está vazio</h3>
            <p className="mt-2 text-muted-foreground">
                Visite o Petshop ou a Loja de Poções para adquirir novos itens.
            </p>
            <div className="flex gap-4 justify-center mt-6">
                <Button asChild>
                    <Link href="/home/petshop">Ir para o Petshop</Link>
                </Button>
                <Button asChild variant="secondary">
                    <Link href="/home/pet-rescue">Ir para a Loja de Poções</Link>
                </Button>
            </div>
            </div>
        )}
      </div>
    </main>
  );
}
