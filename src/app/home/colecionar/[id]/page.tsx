
'use client';

import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { houses } from '@/lib/houses';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Home, PawPrint, Star, Bath, Utensils, Bed, Sofa, Bone, Gem } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePlayer } from '@/context/PlayerContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';
import type { Pet } from '@/components/PetCard';
import { cn } from '@/lib/utils';


export default function HousePage() {
  const params = useParams();
  const id = params.id as string;
  const house = houses.find((h) => h.id === id);
  const { level, xp, xpToNextLevel, ownedPets, addXp, gems } = usePlayer();

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [petLocations, setPetLocations] = useState<Record<string, string | null>>({});

  if (!house) {
    notFound();
  }

  const xpPercentage = (xp / xpToNextLevel) * 100;

  const rooms = [
    { name: 'Sala de Estar', id: 'living-room', icon: Sofa, hint: 'living room', imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzYWxhJTIwZGUlMjBlc3RhcnxlbnwwfHx8fDE3NTY5MDM5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080', petPosition: 'bottom-8 left-12', animation: 'animate-pulse-slow' },
    { name: 'Cozinha', id: 'kitchen', icon: Utensils, hint: 'kitchen', imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjb3ppbmhhJTIwfGVufDB8fHx8MTc1NjkwNDA1Mnww&ixlib=rb-4.1.0&q=80&w=1080', petPosition: 'bottom-10 right-1/4', animation: 'animate-wiggle' },
    { name: 'Quarto', id: 'bedroom', icon: Bed, hint: 'bedroom', imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8cXVhcnRvJTIwfGVufDB8fHx8MTc1NjkwNDEzMXww&ixlib=rb-4.1.0&q=80&w=1080', petPosition: 'bottom-5 right-10', animation: 'animate-bounce-slow' },
    { name: 'Banheiro', id: 'bathroom', icon: Bath, hint: 'bathroom', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiYW5oZWlybyUyMHxlbnwwfHx8fDE3NTY5MDQxODl8MA&ixlib=rb-4.1.0&q=80&w=1080', petPosition: 'bottom-1/4 left-1/3', animation: 'animate-side-to-side' },
  ];

  const selectedPet = ownedPets.find(p => p.id === selectedPetId);

  const handlePlacePet = (roomId: string) => {
    if (selectedPetId) {
      setPetLocations(prev => {
        const newLocations = { ...prev };
        // Remove pet from previous room if it exists
        Object.keys(newLocations).forEach(key => {
          if (newLocations[key] === selectedPetId) {
            newLocations[key] = null;
          }
        });
        // Place pet in new room
        newLocations[roomId] = selectedPetId;
        return newLocations;
      });
      addXp(10); // Ganha 10 XP por mover um filhote
    }
  }
  
  const petInRoom = (roomId: string): Pet | undefined => {
    const petId = petLocations[roomId];
    if (!petId) return undefined;
    return ownedPets.find(p => p.id === petId);
  }

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex justify-between items-center">
          <Link href="/home/colecionar" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Voltar para a seleção de lares
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-amber-600">
                <Utensils className="h-6 w-6" />
                <span className="font-headline text-2xl text-foreground">{xp.toFixed(0)}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-500">
                <Gem className="h-6 w-6" />
                <span className="font-headline text-2xl text-foreground">{gems}</span>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-3">
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <Star className="h-6 w-6 text-primary" />
                      <span className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary font-bold text-xs text-primary-foreground">
                          {level}
                      </span>
                      </div>
                      <div className="w-32">
                          <p className="text-sm font-medium text-foreground">Nível {level}</p>
                          <Progress value={xpPercentage} className="h-2" />
                      </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{xp.toFixed(0)} / {xpToNextLevel.toFixed(0)} XP para o próximo nível</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <Card className="overflow-hidden shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Home className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="font-headline text-4xl text-foreground">
                  Bem-vindo à sua {house.name}
                </CardTitle>
                <CardDescription className="text-lg">
                  Explore os cômodos e coloque seus filhotes para brincar.
                </CardDescription>
              </div>
            </div>
             {ownedPets.length > 0 && (
              <div className="mt-4 flex items-center gap-4">
                  <Select onValueChange={setSelectedPetId} value={selectedPetId ?? ""}>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecione um filhote para mover" />
                    </SelectTrigger>
                    <SelectContent>
                      {ownedPets.map(pet => (
                        <SelectItem key={pet.id} value={pet.id}>{pet.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedPet && (
                    <div className='flex items-center gap-2'>
                        <Image src={selectedPet.imageUrl} alt={selectedPet.name} width={40} height={40} className="rounded-full object-cover" />
                        <span className="font-medium">Você selecionou {selectedPet.name}!</span>
                    </div>
                  )}
              </div>
            )}
          </CardHeader>
          <CardContent className="p-4 md:p-6">
             <Tabs defaultValue="living-room" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                 {rooms.map((room) => (
                  <TabsTrigger key={room.id} value={room.id} className="flex gap-2 items-center text-xs md:text-sm">
                    <room.icon className="h-4 w-4" />
                    {room.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {rooms.map((room) => (
                <TabsContent key={room.id} value={room.id}>
                    <div className="relative aspect-video w-full mt-4 rounded-lg overflow-hidden border">
                      <Image
                        src={room.imageUrl}
                        alt={`Interior da ${house.name} - ${room.name}`}
                        fill
                        className="object-cover"
                        data-ai-hint={`${house.aiHint} ${room.hint}`}
                      />
                      {petInRoom(room.id) && (
                        <div className={cn("absolute w-24 h-24 drop-shadow-lg", room.petPosition, room.animation)}>
                           <Image 
                            src={petInRoom(room.id)!.imageUrl} 
                            alt={petInRoom(room.id)!.name} 
                            fill
                            style={{objectFit:"contain"}}
                           />
                        </div>
                      )}
                      <Button onClick={() => handlePlacePet(room.id)} disabled={!selectedPetId} className="absolute top-2 right-2">
                        <Bone className="mr-2 h-4 w-4" />
                        Colocar Filhote Aqui
                      </Button>
                    </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center bg-muted/20 p-6">
            <Button asChild size="lg">
              <Link href="/home">
                <PawPrint className="mr-2 h-5 w-5" />
                Encontrar mais filhotes
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

