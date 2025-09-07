
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Hand, ToyBrick, Utensils, GlassWater, Beef, Bone, Apple, FlaskConical, TestTube2, Droplets, Beaker, Bot, Wand2, Sparkles, Star, Atom, CircleDashed, Dna, Eye, Baby } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useCallback, ReactElement } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import React from 'react';


export default function InteragirPage() {
    const { ownedPets, addXp, inventory, useItem } = usePlayer();
    const { toast } = useToast();
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [interactionEffect, setInteractionEffect] = useState<'petting' | 'playing' | 'watering' | 'feeding' | 'potion' | null>(null);

    const triggerInteractionEffect = (effect: 'petting' | 'playing' | 'watering' | 'feeding' | 'potion') => {
        setInteractionEffect(effect);
        setTimeout(() => {
            setInteractionEffect(null);
        }, 1500); // Animation duration
    };

    const handleInteraction = useCallback((type: 'petting' | 'playing' | 'watering') => {
        if (!selectedPetId) {
            toast({ title: "Selecione um filhote primeiro!", variant: 'destructive' });
            return;
        }

        let xpAmount = 0;
        let message = '';
        triggerInteractionEffect(type);

        switch (type) {
            case 'petting':
                xpAmount = 5;
                message = 'Você fez carinho no seu filhote!';
                break;
            case 'playing':
                xpAmount = 10;
                message = 'Você brincou com seu filhote!';
                break;
            case 'watering':
                xpAmount = 7;
                message = 'Você deu água para seu filhote!';
                break;
        }
        
        addXp(xpAmount);

        toast({
            title: message,
            description: `Você ganhou ${xpAmount} XP!`,
        });
    }, [selectedPetId, addXp, toast]);

    const handleUseItem = () => {
        if (!selectedItemId) {
            toast({ title: "Selecione um item!", variant: 'destructive' });
            return;
        }
        
        const item = inventory.find(i => i.id === selectedItemId);
        if (!item) return;

        // Potions can be used without a pet, unless it's the stork potion
        if (item.id.startsWith('potion_') && item.id !== 'potion_stork') {
            const success = useItem(selectedItemId);
             if (success) {
                triggerInteractionEffect('potion');
                setSelectedItemId(null);
            }
            return;
        }

        // Other items need a pet
        if (!selectedPetId) {
            toast({ title: "Selecione um filhote primeiro!", variant: 'destructive' });
            return;
        }

        const success = useItem(selectedItemId, selectedPetId);
        if (success) {
            const effect = item.id.startsWith('food') ? 'feeding' : 'potion';
            triggerInteractionEffect(effect);
            setSelectedItemId(null); // Reset selection
        }
    };


    const selectedPet = ownedPets.find(p => p.id === selectedPetId);

    const getIconForItem = (itemId: string): ReactElement => {
        if (itemId.includes('food_premium')) return <Beef className="h-5 w-5" />;
        if (itemId.includes('food_biscuit')) return <Bone className="h-5 w-5" />;
        if (itemId.includes('food_fruits')) return <Apple className="h-5 w-5" />;
        if (itemId.includes('potion_stork')) return <Baby className="h-5 w-5" />;
        if (itemId.includes('potion_coin_10000')) return <CircleDashed className="h-5 w-5" />;
        if (itemId.includes('potion_coin_1000')) return <Beaker className="h-5 w-5" />;
        if (itemId.includes('potion_coin_100')) return <TestTube2 className="h-5 w-5" />;
        if (itemId.includes('potion_coin')) return <Wand2 className="h-5 w-5" />;
        if (itemId.includes('potion_xp_5000')) return <Sparkles className="h-5 w-5" />;
        if (itemId.includes('potion_xp_4000')) return <Atom className="h-5 w-5" />;
        if (itemId.includes('potion_xp_2500')) return <Atom className="h-5 w-5" />;
        if (itemId.includes('potion_xp_1000')) return <Sparkles className="h-5 w-5" />;
        if (itemId.includes('potion_xp_750')) return <Eye className="h-5 w-5" />;
        if (itemId.includes('potion_xp_500')) return <Bot className="h-5 w-5" />;
        if (itemId.includes('potion_xp_350')) return <Dna className="h-5 w-5" />;
        if (itemId.includes('potion_xp_200')) return <FlaskConical className="h-5 w-5" />;
        if (itemId.includes('potion_xp')) return <Droplets className="h-5 w-5" />;
        return <Utensils className="h-5 w-5" />;
    };

    const InteractionIcon = () => {
        if (!interactionEffect) return null;

        let icon;
        switch (interactionEffect) {
            case 'petting': icon = <Hand className="h-16 w-16 text-primary/80" />; break;
            case 'playing': icon = <ToyBrick className="h-16 w-16 text-secondary-foreground/80" />; break;
            case 'watering': icon = <GlassWater className="h-16 w-16 text-blue-400/80" />; break;
            case 'potion': icon = <FlaskConical className="h-16 w-16 text-purple-500/80" />; break;
            case 'feeding': 
                const feedingIcon = getIconForItem(selectedItemId ?? 'food_biscuit');
                icon = <div className="h-16 w-16 text-yellow-600/80">{React.cloneElement(feedingIcon, { className: 'h-16 w-16' })}</div>;
                break;
            default: return null;
        }

        return (
            <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping">
                {icon}
            </div>
        );
    }


  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-background">
      <div className="mx-auto max-w-5xl">
        <Link href="/home" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Voltar
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl text-primary">Interagindo com seu Filhote</CardTitle>
            <CardDescription className="text-lg">
                Escolha um filhote, dê atenção, alimente-o e ganhe XP.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
             <div className="w-full max-w-sm">
                {ownedPets.length > 0 ? (
                    <Select onValueChange={setSelectedPetId} value={selectedPetId ?? ""}>
                        <SelectTrigger>
                        <SelectValue placeholder="Selecione um filhote para interagir" />
                        </SelectTrigger>
                        <SelectContent>
                        {ownedPets.map(pet => (
                            <SelectItem key={pet.id} value={pet.id}>{pet.name}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                ) : (
                    <p className="text-center text-muted-foreground">Você ainda não tem filhotes. <Link href="/home" className="text-primary underline">Adote um agora!</Link></p>
                )}
             </div>

            <div className="relative w-full h-80 flex items-center justify-center">
                {selectedPet && (
                    <>
                        <div className="relative z-10 w-52 h-52">
                            <Image 
                                src={selectedPet.imageUrl}
                                alt={selectedPet.name}
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                        <div className="absolute z-0 top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
                            <Hand className="h-64 w-64 text-primary" strokeWidth={1}/>
                        </div>
                        <InteractionIcon />
                    </>
                )}
                 {!selectedPet && (
                    <div className="text-center text-muted-foreground">
                        <p>Selecione um filhote para começar a interagir.</p>
                    </div>
                 )}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                <Button onClick={() => handleInteraction('petting')} disabled={!selectedPetId} size="lg">
                    <Hand className="mr-2 h-5 w-5" />
                    Fazer Carinho (5 XP)
                </Button>
                 <Button onClick={() => handleInteraction('playing')} disabled={!selectedPetId} size="lg" variant="secondary">
                    <ToyBrick className="mr-2 h-5 w-5" />
                    Brincar (10 XP)
                </Button>
                <Button onClick={() => handleInteraction('watering')} disabled={!selectedPetId} size="lg" variant="outline">
                    <GlassWater className="mr-2 h-5 w-5" />
                    Dar Água (7 XP)
                </Button>
            </div>
          </CardContent>
          <Separator className="my-6" />
          <CardFooter className="flex flex-col gap-4">
            <div className="text-center">
                <h3 className="font-headline text-2xl text-primary">Usar Itens do Inventário</h3>
                <p className="text-muted-foreground">Use comidinhas ou poções para ganhar bônus.</p>
            </div>
             {inventory.length > 0 ? (
                <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
                     <Select onValueChange={setSelectedItemId} value={selectedItemId ?? ""}>
                        <SelectTrigger className="w-full md:w-[280px]">
                            <SelectValue placeholder="Selecione um item" />
                        </SelectTrigger>
                        <SelectContent>
                        {inventory.map(item => (
                            <SelectItem key={item.id} value={item.id}>
                                <div className="flex items-center gap-2">
                                    {getIconForItem(item.id)}
                                    <span>{item.name} (x{item.quantity})</span>
                                </div>
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={handleUseItem} disabled={!selectedItemId}>
                        <Utensils className="mr-2 h-5 w-5" />
                        Usar Item
                    </Button>
                </div>
            ) : (
                <p className="text-center text-muted-foreground">Seu inventário está vazio. Visite o <Link href="/home/petshop" className="text-primary underline">Petshop</Link> ou o <Link href="/home/pet-rescue" className="text-primary underline">Resgate de Filhotes</Link>!</p>
            )}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

    
