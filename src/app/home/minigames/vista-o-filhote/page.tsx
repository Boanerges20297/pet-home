
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shirt, Glasses, CircleUser, Save } from 'lucide-react';
import Link from 'next/link';
import { usePlayer } from '@/context/PlayerContext';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';

const accessories = {
  hats: [
    { id: 'hat1', name: 'Chapéu de Festa', imageUrl: '/accessories/hat1.png', style: { top: '-25%', left: '10%', width: '80%', height: '80%'} },
    { id: 'hat2', name: 'Coroa', imageUrl: '/accessories/hat2.png', style: { top: '-30%', left: '10%', width: '80%', height: '80%'} },
    { id: 'hat3', name: 'Boné', imageUrl: '/accessories/hat3.png', style: { top: '-20%', left: '5%', width: '90%', height: '90%'} },
  ],
  glasses: [
    { id: 'glasses1', name: 'Óculos de Sol', imageUrl: '/accessories/glasses1.png', style: { top: '20%', left: '10%', width: '80%', height: '80%'} },
    { id: 'glasses2', name: 'Óculos 3D', imageUrl: '/accessories/glasses2.png', style: { top: '20%', left: '10%', width: '80%', height: '80%'} },
    { id: 'glasses3', name: 'Monóculo', imageUrl: '/accessories/glasses3.png', style: { top: '15%', left: '10%', width: '80%', height: '80%'} },
  ],
};

export default function DressThePetPage() {
  const { ownedPets, addXp } = usePlayer();
  const { toast } = useToast();
  
  const [selectedPetId, setSelectedPetId] = useState<string | null>(ownedPets.length > 0 ? ownedPets[0].id : null);
  const [selectedHat, setSelectedHat] = useState<string | null>(null);
  const [selectedGlasses, setSelectedGlasses] = useState<string | null>(null);

  const selectedPet = ownedPets.find(p => p.id === selectedPetId);
  const hat = accessories.hats.find(h => h.id === selectedHat);
  const glasses = accessories.glasses.find(g => g.id === selectedGlasses);

  const handleSave = () => {
      addXp(15);
      toast({
          title: "Visual Salvo!",
          description: "Seu filhote está um arraso! Você ganhou 15 XP."
      })
  }

  // Create dummy public accessory files if they don't exist
  useEffect(() => {
    // This is a workaround for development to ensure accessory images are available.
    // In a real app, these would be part of your public assets.
    if(typeof window === 'undefined') return;
    const createPlaceholderAccessory = (path: string) => {
        const fullPath = `/accessories/${path.split('/').pop()}`;
        fetch(fullPath).then(res => {
            if(!res.ok) {
                // In a real scenario, we wouldn't do this client-side. This is for demo purposes.
                console.warn(`Accessory not found at ${fullPath}. This is expected in a dev environment without the public/accessories folder.`);
            }
        });
    }
    accessories.hats.forEach(h => createPlaceholderAccessory(h.imageUrl));
    accessories.glasses.forEach(g => createPlaceholderAccessory(g.imageUrl));
  }, []);

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
      <div className="mx-auto max-w-4xl w-full">
        <Link href="/home/minigames" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" />
          Voltar para os Minigames
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Vista o Filhote</CardTitle>
            <CardDescription className="text-lg">
              Escolha acessórios e deixe seu filhote super estiloso!
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative w-64 h-64 mx-auto bg-muted rounded-full flex items-center justify-center">
                {selectedPet ? (
                    <div className='relative w-48 h-48'>
                        <Image src={selectedPet.imageUrl} alt={selectedPet.name} fill className='object-contain drop-shadow-lg' />
                        {hat && (
                            <div className='absolute z-10' style={hat.style}>
                                <Image src={hat.imageUrl} alt={hat.name} fill className='object-contain' />
                            </div>
                        )}
                        {glasses && (
                             <div className='absolute z-10' style={glasses.style}>
                                <Image src={glasses.imageUrl} alt={glasses.name} fill className='object-contain' />
                            </div>
                        )}
                    </div>
                ) : (
                    <p className='text-muted-foreground text-center p-4'>Adote um filhote para começar a vestir!</p>
                )}
            </div>
            <div className='space-y-6'>
                <div>
                     <Label className="flex items-center gap-2 mb-2"><CircleUser /> Escolha seu Filhote</Label>
                    <Select onValueChange={setSelectedPetId} value={selectedPetId ?? ""}>
                        <SelectTrigger><SelectValue placeholder="Selecione um filhote" /></SelectTrigger>
                        <SelectContent>
                            {ownedPets.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                     <Label className="flex items-center gap-2 mb-2"><Shirt /> Chapéus</Label>
                    <Select onValueChange={setSelectedHat} value={selectedHat ?? "none"}>
                        <SelectTrigger><SelectValue placeholder="Selecione um chapéu" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">Nenhum</SelectItem>
                            {accessories.hats.map(h => <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                     <Label className="flex items-center gap-2 mb-2"><Glasses /> Óculos</Label>
                    <Select onValueChange={setSelectedGlasses} value={selectedGlasses ?? "none"}>
                        <SelectTrigger><SelectValue placeholder="Selecione um óculos" /></SelectTrigger>
                        <SelectContent>
                             <SelectItem value="none">Nenhum</SelectItem>
                            {accessories.glasses.map(g => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
          </CardContent>
           <CardFooter className="flex-col gap-4 justify-center">
                <Button onClick={handleSave} disabled={!selectedPet} size="lg"><Save className="mr-2"/>Salvar Visual (15 XP)</Button>
            </CardFooter>
        </Card>
      </div>
    </main>
  );
}

// NOTE: This component needs accessory images in `public/accessories/`.
// For example:
// public/accessories/hat1.png
// public/accessories/hat2.png
// public/accessories/hat3.png
// public/accessories/glasses1.png
// public/accessories/glasses2.png
// public/accessories/glasses3.png
// These are simple PNGs with transparent backgrounds.

