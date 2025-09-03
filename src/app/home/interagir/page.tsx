
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Hand, ToyBrick, Utensils, GlassWater, Beef, Bone, Apple } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';


export default function InteragirPage() {
    const { ownedPets, addXp, inventory, useItem } = usePlayer();
    const { toast } = useToast();
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const handleInteraction = useCallback((type: 'petting' | 'playing' | 'watering') => {
        if (!selectedPetId) {
            toast({ title: "Selecione um filhote primeiro!", variant: 'destructive' });
            return;
        }

        let xpAmount = 0;
        let message = '';

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

    const handleFeed = () => {
        if (!selectedPetId) {
            toast({ title: "Selecione um filhote primeiro!", variant: 'destructive' });
            return;
        }
        if (!selectedItemId) {
            toast({ title: "Selecione uma comidinha!", variant: 'destructive' });
            return;
        }

        const success = useItem(selectedItemId);
        if (success) {
            // Toast is handled inside useItem
            setSelectedItemId(null); // Reset selection
        }
    };


    const selectedPet = ownedPets.find(p => p.id === selectedPetId);

    const getIconForItem = (itemId: string) => {
        if (itemId.includes('food_premium')) return <Beef className="h-5 w-5" />;
        if (itemId.includes('food_biscuit')) return <Bone className="h-5 w-5" />;
        if (itemId.includes('food_fruits')) return <Apple className="h-5 w-5" />;
        return <Utensils className="h-5 w-5" />;
    };


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
                        <div className="relative z-10">
                            <Image 
                                src={selectedPet.imageUrl}
                                alt={selectedPet.name}
                                width={200}
                                height={200}
                                className="object-contain drop-shadow-2xl rounded-full"
                            />
                        </div>
                        <div className="absolute z-0 -top-4 -right-12 md:top-10 md:right-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-50">
                            <Hand className="h-48 w-48 text-primary/20" strokeWidth={1}/>
                        </div>
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
                <h3 className="font-headline text-2xl text-primary">Alimentar seu Filhote</h3>
                <p className="text-muted-foreground">Use itens do seu inventário para ganhar mais XP.</p>
            </div>
             {inventory.length > 0 ? (
                <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
                     <Select onValueChange={setSelectedItemId} value={selectedItemId ?? ""}>
                        <SelectTrigger className="w-full md:w-[280px]">
                            <SelectValue placeholder="Selecione uma comidinha" />
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
                    <Button onClick={handleFeed} disabled={!selectedPetId || !selectedItemId} size="lg">
                        <Utensils className="mr-2 h-5 w-5" />
                        Alimentar Filhote
                    </Button>
                </div>
            ) : (
                <p className="text-center text-muted-foreground">Você não tem comidinhas. <Link href="/home/loja" className="text-primary underline">Visite a loja!</Link></p>
            )}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
