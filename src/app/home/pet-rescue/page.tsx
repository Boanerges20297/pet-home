
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LifeBuoy, FlaskConical, TestTube2, Gem } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { useToast } from '@/hooks/use-toast';

const potionItems = [
  {
    id: 'potion_xp_boost',
    name: 'Poção de Super Pulo de XP',
    description: 'Concede instantaneamente 200 XP para o seu progresso geral.',
    price: 30,
    currency: 'gems',
    imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBwb3Rpb258ZW58MHx8fHwxNzU5NjAxNjYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'purple potion',
    icon: FlaskConical,
    reward: { type: 'item', id: 'potion_xp_boost', name: 'Poção de Super Pulo de XP', quantity: 1 },
  },
  {
    id: 'potion_coin_elixir',
    name: 'Elixir da Riqueza Súbita',
    description: 'Adiciona 1000 moedas diretamente à sua carteira.',
    price: 50,
    currency: 'gems',
    imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx5ZWxsb3clMjBwb3Rpb258ZW58MHx8fHwxNzU5NjAxNjYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'yellow potion',
    icon: TestTube2,
    reward: { type: 'item', id: 'potion_coin_elixir', name: 'Elixir da Riqueza Súbita', quantity: 1 },
  },
];

type PotionItem = typeof potionItems[0];

export default function PetRescuePage() {
  const { gems, removeGems, addItemToInventory } = usePlayer();
  const { toast } = useToast();

  const handlePurchase = (item: PotionItem) => {
    if (gems >= item.price) {
      removeGems(item.price);
      if (item.reward.type === 'item') {
        addItemToInventory(item.reward.id, item.reward.name, item.reward.quantity);
      }
      toast({
        title: 'Poção Adquirida!',
        description: `Você comprou: ${item.name}`,
      });
    } else {
      toast({
        title: 'Gemas Insuficientes!',
        description: `Você precisa de mais ${item.price - gems} gemas.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/home" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        <section className="mb-12 text-center">
          <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4 flex items-center justify-center gap-4">
            <LifeBuoy className="h-10 w-10" />
            Loja de Poções Mágicas
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use suas gemas para comprar poções poderosas e acelerar sua jornada!
          </p>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {potionItems.map((item) => (
              <Card key={item.id} className="overflow-hidden flex flex-col bg-card/80 backdrop-blur-sm border-purple-500/20">
                <CardHeader className="p-0">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={item.imageUrl}
                      alt={`Imagem de ${item.name}`}
                      fill
                      className="object-cover"
                      data-ai-hint={item.aiHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline text-2xl text-foreground">{item.name}</CardTitle>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto">
                  <Button onClick={() => handlePurchase(item)} className="w-full bg-purple-600 text-white hover:bg-purple-700 text-lg font-bold">
                    <div className="flex items-center gap-2">
                      <Gem className="h-5 w-5" />
                      <span>{item.price}</span>
                    </div>
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
