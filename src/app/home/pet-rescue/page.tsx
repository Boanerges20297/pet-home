
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LifeBuoy, FlaskConical, TestTube2, Gem, Droplets, Beaker, Bot, Wand2, Sparkles, Star, Atom, CircleDashed, Dna, Eye, Baby } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { useToast } from '@/hooks/use-toast';
import type { Pet } from '@/components/PetCard';

const potionItems = [
    {
        id: 'potion_xp_50',
        name: 'par cachorros doents',
        description: 'Concede 50 XP. Perfeito para um pequeno empurrão.',
        price: 5,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1561629518-31f818a70e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8cG9yYW8lMjBtYWdpY2F8ZW58MHx8fHwxNzU3MjcwNjcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'blue potion',
        icon: Droplets,
        reward: { type: 'item', id: 'potion_xp_50', name: 'par cachorros doents', quantity: 1 },
    },
    {
        id: 'potion_coin_100',
        name: 'ração',
        description: 'Concede 100 moedas para pequenas compras.',
        price: 5,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1598285375273-cb65e990aacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyYSVDMyVBNyVDMyVBM298ZW58MHx8fHwxNzU3MjcwNTAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'green potion',
        icon: TestTube2,
        reward: { type: 'item', id: 'potion_coin_100', name: 'ração', quantity: 1 },
    },
    {
        id: 'potion_xp_200',
        name: 'Poção de Super Pulo de XP',
        description: 'Concede instantaneamente 200 XP para o seu progresso geral.',
        price: 15,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBwb3Rpb258ZW58MHx8fHwxNzU5NjAxNjYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'purple potion',
        icon: FlaskConical,
        reward: { type: 'item', id: 'potion_xp_200', name: 'Poção de Super Pulo de XP', quantity: 1 },
    },
    {
        id: 'potion_stork',
        name: 'Poção da Cegonha',
        description: 'Dê para um dos seus pets para que ele tenha uma ninhada de filhotinhos!',
        price: 50,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1718488978779-df2a39884775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxmaWxob3RlcyUyMHJlY2VtJTIwbmFjaWRvc3xlbnwwfHx8fDE3NTcyNzEzODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'stork potion',
        icon: Baby,
        reward: { type: 'item', id: 'potion_stork', name: 'Poção da Cegonha', quantity: 1 },
    },
    {
        id: 'potion_xp_500',
        name: 'Frasco de Gênio',
        description: 'Um grande impulso de 500 XP. Use com sabedoria!',
        price: 30,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyZWQlMjBwb3Rpb258ZW58MHx8fHwxNzU5NjAxNjYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'red potion',
        icon: Bot,
        reward: { type: 'item', id: 'potion_xp_500', name: 'Frasco de Gênio', quantity: 1 },
    },
    {
        id: 'potion_coin_2500',
        name: 'Caldeirão de Ganhos',
        description: 'Uma fortuna de 2500 moedas para gastar como quiser.',
        price: 45,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBwb3Rpb258ZW58MHx8fHwxNzU5NjAxNjYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'orange potion',
        icon: Wand2,
        reward: { type: 'item', id: 'potion_coin_2500', name: 'Caldeirão de Ganhos', quantity: 1 },
    },
    {
        id: 'potion_xp_1000',
        name: 'Néctar dos Sábios',
        description: 'Um salto quântico de 1000 XP. Acelera seu nível!',
        price: 55,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiTGFjayUyMHBvdGlvbnxlbnwwfHx8fDE3NTk2MDE2NjF8MA&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'black potion',
        icon: Sparkles,
        reward: { type: 'item', id: 'potion_xp_1000', name: 'Néctar dos Sábios', quantity: 1 },
    },
    {
        id: 'potion_coin_5000',
        name: 'Chifre da Abundância',
        description: 'Um prêmio incrível de 5000 moedas!',
        price: 80,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHBvdGlvbnxlbnwwfHx8fDE3NTk2MDE2NjF8MA&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'white potion',
        icon: Star,
        reward: { type: 'item', id: 'potion_coin_5000', name: 'Chifre da Abundância', quantity: 1 },
    },
    {
        id: 'potion_xp_2500',
        name: 'Dádiva Estelar',
        description: 'Concede 2500 XP. Apenas para os mais dedicados.',
        price: 100,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiXNUMzJUIyJUMzJUIzJUMzJUIyJUMzJUI0JUMzJUI1JUMzJUI2JUMzJUI3JUMzJUI4JUMzJUI5JUMzJUIwJUMzJUExJUMzJUExJUMzJUExJUMzJUExJUMzJUExJUMzJUExJTIwcG90aW9ufGVufDB8fHx8MTc1OTYwMTY2MXww&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'brown potion',
        icon: Atom,
        reward: { type: 'item', id: 'potion_xp_2500', name: 'Dádiva Estelar', quantity: 1 },
    },
    {
        id: 'potion_coin_10000',
        name: 'Baú do Tesouro Líquido',
        description: 'Uma fortuna lendária de 10.000 moedas!',
        price: 150,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwaW5rJTIwcG90aW9ufGVufDB8fHx8fDE3NTk2MDE2NjF8MA&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'pink potion',
        icon: CircleDashed,
        reward: { type: 'item', id: 'potion_coin_10000', name: 'Baú do Tesouro Líquido', quantity: 1 },
    },
    {
        id: 'potion_xp_120',
        name: 'Pílula de Conhecimento',
        description: 'Um pequeno extra de 120 XP.',
        price: 8,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjeWFuJTIwcG90aW9ufGVufDB8fHx8MTc1OTYwMTY2MXww&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'cyan potion',
        icon: FlaskConical,
        reward: { type: 'item', id: 'potion_xp_120', name: 'Pílula de Conhecimento', quantity: 1 },
    },
    {
        id: 'potion_coin_300',
        name: 'Moeda da Sorte',
        description: 'Um bônus de 300 moedas.',
        price: 8,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxncmF5JTIwcG90aW9ufGVufDB8fHx8fDE3NTk2MDE2NjF8MA&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'gray potion',
        icon: TestTube2,
        reward: { type: 'item', id: 'potion_coin_300', name: 'Moeda da Sorte', quantity: 1 },
    },
    {
        id: 'potion_xp_350',
        name: 'Tônico de Crescimento',
        description: 'Concede 350 XP para seu pet.',
        price: 22,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyYWluYm93JTIwcG90aW9ufGVufDB8fHx8MTc1OTYwMTY2MXww&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'rainbow potion',
        icon: Dna,
        reward: { type: 'item', id: 'potion_xp_350', name: 'Tônico de Crescimento', quantity: 1 },
    },
    {
        id: 'potion_coin_1500',
        name: 'Pote de Ouro',
        description: 'Um belo prêmio de 1500 moedas.',
        price: 35,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYXJvb24lMjBwb3Rpb258ZW58MHx8fHwxNzU5NjAxNjYxfDA&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'maroon potion',
        icon: Beaker,
        reward: { type: 'item', id: 'potion_coin_1500', name: 'Pote de Ouro', quantity: 1 },
    },
    {
        id: 'potion_xp_750',
        name: 'Infusão Iluminada',
        description: 'Uma dose de 750 XP para acelerar.',
        price: 48,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsZW1vbiUyMHBvdGlvbnxlbnwwfHx8fDE3NTk2MDE2NjF8MA&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'lemon potion',
        icon: Eye,
        reward: { type: 'item', id: 'potion_xp_750', name: 'Infusão Iluminada', quantity: 1 },
    },
    {
        id: 'potion_coin_3500',
        name: 'Soro da Prosperidade',
        description: 'Um ótimo valor de 3500 moedas.',
        price: 60,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiZXJyeSUyMHBvdGlvbnxlbnwwfHx8fDE3NTk2MDE2NjF8MA&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'berry potion',
        icon: Wand2,
        reward: { type: 'item', id: 'potion_coin_3500', name: 'Soro da Prosperidade', quantity: 1 },
    },
    {
        id: 'potion_xp_1500',
        name: 'Orbe da Experiência',
        description: 'Um ganho massivo de 1500 XP.',
        price: 75,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkb3VibGUlMjBoZWxpeCUyMHBvdGlvbnxlbnwwfHx8fDE3NTk2MDE2NjF8MA&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'double helix potion',
        icon: Sparkles,
        reward: { type: 'item', id: 'potion_xp_1500', name: 'Orbe da Experiência', quantity: 1 },
    },
    {
        id: 'potion_coin_7500',
        name: 'Gema Líquida',
        description: 'Um tesouro de 7500 moedas.',
        price: 120,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwcG90aW9ufGVufDB8fHx8fDE3NTk2MDE2NjF8MA&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'diamond potion',
        icon: Star,
        reward: { type: 'item', id: 'potion_coin_7500', name: 'Gema Líquida', quantity: 1 },
    },
    {
        id: 'potion_xp_4000',
        name: 'Essência Cósmica',
        description: 'Uma recompensa divina de 4000 XP.',
        price: 180,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxnYWxheHklMjBwb3Rpb258ZW58MHx8fHwxNzU5NjAxNjYxfDA&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'galaxy potion',
        icon: Atom,
        reward: { type: 'item', id: 'potion_xp_4000', name: 'Essência Cósmica', quantity: 1 },
    },
    {
        id: 'potion_coin_15000',
        name: 'Desejo do Dragão',
        description: 'Um prêmio lendário de 15.000 moedas!',
        price: 250,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyYWlualMjBwb3Rpb258ZW58MHx8fHwxNzU5NjAxNjYxfDA&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'rainy potion',
        icon: CircleDashed,
        reward: { type: 'item', id: 'potion_coin_15000', name: 'Desejo do Dragão', quantity: 1 },
    },
    {
        id: 'potion_xp_5000',
        name: 'Lágrima de Fênix',
        description: 'A recompensa final: 5000 XP!',
        price: 300,
        currency: 'gems',
        imageUrl: 'https://images.unsplash.com/photo-1555118228-6951335a8f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmYWxsaW5nJTIwcG90aW9ufGVufDB8fHx8fDE3NTk2MDE2NjF8MA&ixlib-rb-4.1.0&q=80&w=1080',
        aiHint: 'phoenix potion',
        icon: Sparkles,
        reward: { type: 'item', id: 'potion_xp_5000', name: 'Lágrima de Fênix', quantity: 1 },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
