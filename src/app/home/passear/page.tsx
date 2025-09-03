
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';


export default function PassearPage() {
    const { ownedPets, addXp } = usePlayer();
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

    const handleWalk = () => {
        if (selectedPetId) {
            addXp(15);
        }
    }

    const selectedPet = ownedPets.find(p => p.id === selectedPetId);


  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-green-50" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1444930694458-04babf7e5245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwYXJxdWUlMjBzb2xlaWx8ZW58MHx8fHwxNzU2OTA3MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}>
      <div className="mx-auto max-w-5xl">
        <Link href="/home" className="flex items-center gap-2 text-sm text-background bg-foreground/50 rounded-full px-3 py-1 w-fit hover:bg-foreground/75 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Voltar
        </Link>
        <Card className="bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl text-primary">Passeando com seu Filhote</CardTitle>
            <CardDescription className="text-lg">
                Escolha um filhote para levar para um passeio e ganhar um pouco de XP!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
             <div className="w-full max-w-sm">
                {ownedPets.length > 0 ? (
                    <Select onValueChange={setSelectedPetId} value={selectedPetId ?? ""}>
                        <SelectTrigger>
                        <SelectValue placeholder="Selecione um filhote para passear" />
                        </SelectTrigger>
                        <SelectContent>
                        {ownedPets.map(pet => (
                            <SelectItem key={pet.id} value={pet.id}>{pet.name}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                ) : (
                    <p className="text-center text-muted-foreground">Você ainda não tem filhotes para passear. <Link href="/home" className="text-primary underline">Adote um agora!</Link></p>
                )}
             </div>

            <div className="relative w-full h-96 flex items-end justify-center">
                <div className="absolute bottom-0 flex items-end">
                    <Image 
                        src="https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=500&h=800&fit=crop"
                        alt="Pessoa passeando"
                        width={200}
                        height={400}
                        className="object-contain drop-shadow-2xl"
                        data-ai-hint="person walking"
                    />
                    {selectedPet && (
                         <div className="relative -ml-16 mb-4">
                            <Image 
                                src={selectedPet.imageUrl}
                                alt={selectedPet.name}
                                width={120}
                                height={120}
                                className="object-contain drop-shadow-2xl"
                            />
                         </div>
                    )}
                </div>
            </div>

            <Button onClick={handleWalk} disabled={!selectedPetId} size="lg">
                Passear e ganhar 15 XP
            </Button>

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
