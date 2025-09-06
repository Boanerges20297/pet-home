
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Stethoscope, HeartPulse, CheckCircle2 } from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';

export default function ExamesPage() {
    const { ownedPets, addXp } = usePlayer();
    const { toast } = useToast();
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
    const [healthReport, setHealthReport] = useState<string | null>(null);

    const handleExam = () => {
        if (selectedPetId) {
            const pet = ownedPets.find(p => p.id === selectedPetId);
            if(!pet) return;

            addXp(20);
            setHealthReport(`O exame em ${pet.name} foi um sucesso! Todos os sinais vitais estão ótimos. O filhote está saudável e feliz!`);
            toast({
                title: 'Exame Realizado!',
                description: 'Você ganhou 20 XP por cuidar da saúde do seu filhote.',
            });
        }
    }

    const selectedPet = ownedPets.find(p => p.id === selectedPetId);

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-blue-50">
      <div className="mx-auto max-w-2xl">
        <Link href="/home" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Voltar
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl text-primary flex items-center justify-center gap-3">
                <Stethoscope className="h-10 w-10" />
                Check-up do Filhote
            </CardTitle>
            <CardDescription className="text-lg">
                Selecione um filhote para realizar um check-up de saúde e ganhar XP.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
             <div className="w-full max-w-sm">
                {ownedPets.length > 0 ? (
                    <Select 
                        onValueChange={(value) => {
                            setSelectedPetId(value);
                            setHealthReport(null);
                        }} 
                        value={selectedPetId ?? ""}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um filhote para examinar" />
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

            <div className="relative w-full h-60 flex items-center justify-center">
                {selectedPet && (
                    <div className="relative z-10 w-48 h-48">
                        <Image 
                            src={selectedPet.imageUrl}
                            alt={selectedPet.name}
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>
                )}
                 {!selectedPet && (
                    <div className="text-center text-muted-foreground">
                        <p>Selecione um filhote para começar.</p>
                    </div>
                )}
            </div>

            <Button onClick={handleExam} disabled={!selectedPetId} size="lg">
                <HeartPulse className="mr-2 h-5 w-5" />
                Realizar Exame (20 XP)
            </Button>
          </CardContent>
          {healthReport && (
            <>
              <Separator className="my-6" />
              <CardFooter className="flex flex-col gap-4">
                <div className="text-center">
                    <h3 className="font-headline text-2xl text-primary">Boletim de Saúde</h3>
                </div>
                <div className="w-full p-4 bg-green-100 dark:bg-green-900/50 rounded-lg text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                        <p className="flex-1">{healthReport}</p>
                    </div>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </main>
  );
}
