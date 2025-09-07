
'use client';

import { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePlayer } from '@/context/PlayerContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PawPrint, Backpack, Bone, Apple, Beef, FlaskConical, TestTube2, Droplets, Beaker, Bot, Wand2, Sparkles, Star, Atom, CircleDashed, Dna, Eye, Baby, Utensils } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const { ownedPets, inventory } = usePlayer();

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12">
          <div className="text-center">
            <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4 flex items-center justify-center gap-4">
              <Backpack className="h-10 w-10" />
              Inventário
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aqui estão todos os seus filhotes e itens. Cuide bem deles!
            </p>
          </div>
        </section>

        <Tabs defaultValue="pets" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pets"><PawPrint className="mr-2" />Filhotes ({ownedPets.length})</TabsTrigger>
                <TabsTrigger value="items"><Utensils className="mr-2" />Itens ({inventory.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="pets" className="mt-6">
                 {ownedPets.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {ownedPets.map((pet) => (
                        <Card key={pet.id} className="overflow-hidden bg-card transition-shadow hover:shadow-xl flex flex-col">
                        <CardHeader className="p-0">
                            <div className="relative aspect-square w-full">
                            <Image
                                src={pet.imageUrl}
                                alt={`Uma foto de ${pet.name}`}
                                fill
                                className="object-cover"
                                data-ai-hint={pet.aiHint}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 flex-grow">
                            <CardTitle className="font-headline text-2xl text-foreground">{pet.name}</CardTitle>
                            <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant="secondary">{pet.age}</Badge>
                            <Badge variant="secondary">{pet.breed}</Badge>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/home/interagir">
                                    Interagir
                                </Link>
                            </Button>
                        </CardFooter>
                        </Card>
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-16 px-6 border-2 border-dashed rounded-lg">
                    <PawPrint className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-xl font-semibold text-foreground">Sua coleção está vazia</h3>
                    <p className="mt-2 text-muted-foreground">
                        Você ainda não tem nenhum filhote. Que tal adotar um?
                    </p>
                    <Button asChild className="mt-6">
                        <Link href="/home">Ver Filhotes à Venda</Link>
                    </Button>
                    </div>
                )}
            </TabsContent>
            <TabsContent value="items" className="mt-6">
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
            </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
