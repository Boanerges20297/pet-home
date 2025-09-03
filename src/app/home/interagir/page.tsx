
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Hand, ToyBrick } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';


export default function InteragirPage() {
    const { ownedPets, addXp } = usePlayer();
    const { toast } = useToast();
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

    const handleInteraction = (type: 'petting' | 'playing') => {
        if (selectedPetId) {
            const xpAmount = type === 'petting' ? 5 : 10;
            const message = type === 'petting' ? 'Você fez carinho no seu filhote!' : 'Você brincou com seu filhote!';
            
            addXp(xpAmount);

            toast({
                title: message,
                description: `Você ganhou ${xpAmount} XP!`,
            });
        }
    }

    const selectedPet = ownedPets.find(p => p.id === selectedPetId);


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
                Escolha um filhote e dê a ele um pouco de atenção para ganhar XP.
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

            <div className="relative w-full h-96 flex items-center justify-center">
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
                        <div className="absolute z-20 -top-4 -right-12 md:top-10 md:right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                            <Image 
                                src="https://images.unsplash.com/photo-1620371350543-51f7a8753958?w=500&h=500&fit=crop"
                                alt="Mão de uma pessoa"
                                width={150}
                                height={150}
                                className="object-contain drop-shadow-2xl opacity-90"
                                data-ai-hint="person hand"
                            />
                        </div>
                    </>
                )}
                 {!selectedPet && (
                    <div className="text-center text-muted-foreground">
                        <p>Selecione um filhote para começar a interagir.</p>
                    </div>
                )}
            </div>

            <div className="flex gap-4">
                <Button onClick={() => handleInteraction('petting')} disabled={!selectedPetId} size="lg">
                    <Hand className="mr-2 h-5 w-5" />
                    Fazer Carinho (5 XP)
                </Button>
                 <Button onClick={() => handleInteraction('playing')} disabled={!selectedPetId} size="lg" variant="secondary">
                    <ToyBrick className="mr-2 h-5 w-5" />
                    Brincar (10 XP)
                </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
