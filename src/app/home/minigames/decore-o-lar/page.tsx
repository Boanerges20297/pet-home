
'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Sofa, Lamp, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { usePlayer } from '@/context/PlayerContext';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const furnitureItems = [
  { id: 'sofa1', name: 'Sofá Aconchegante', imageUrl: '/furniture/sofa1.png', icon: Sofa },
  { id: 'lamp1', name: 'Luminária Moderna', imageUrl: '/furniture/lamp1.png', icon: Lamp },
  { id: 'plant1', name: 'Planta de Vaso', imageUrl: '/furniture/plant1.png', icon: () => <span className='text-2xl'>🪴</span> },
];

type PlacedItem = {
    id: string;
    itemId: string;
    x: number;
    y: number;
}

export default function DecorateHomePage() {
  const { addXp } = usePlayer();
  const { toast } = useToast();
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const roomRef = useRef<HTMLDivElement>(null);

  const handlePlaceItem = (itemId: string) => {
    const newItem: PlacedItem = {
      id: `item-${Date.now()}`,
      itemId,
      x: 50,
      y: 150,
    };
    setPlacedItems([...placedItems, newItem]);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
      e.dataTransfer.setData("itemId", id);
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("itemId");
      const roomBounds = roomRef.current?.getBoundingClientRect();
      if (!id || !roomBounds) return;

      const x = e.clientX - roomBounds.left - 50; // a-50 to center the item
      const y = e.clientY - roomBounds.top - 50; // -50 to center the item

      setPlacedItems(items => items.map(item => item.id === id ? {...item, x, y} : item));
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
  }

  const handleSave = () => {
    addXp(20);
    toast({
      title: "Decoração Salva!",
      description: "Seu cômodo está lindo! Você ganhou 20 XP.",
    });
  };
  
  const handleClear = () => {
      setPlacedItems([]);
  }

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
      <div className="mx-auto max-w-4xl w-full">
        <Link href="/home/minigames" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" />
          Voltar para os Minigames
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Decore o Lar</CardTitle>
            <CardDescription className="text-lg">
              Arraste os móveis para decorar o cômodo do seu filhote.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative w-full aspect-video bg-blue-100 rounded-lg border-2 border-dashed" ref={roomRef} onDrop={handleDrop} onDragOver={handleDragOver}>
              <Image src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDB8fHx8MTc1ODIyMjA0MXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Room background" fill className="object-cover opacity-50"/>
               {placedItems.map(item => {
                   const furniture = furnitureItems.find(f => f.itemId === item.itemId);
                   if (!furniture) return null;
                   return (
                       <div key={item.id} draggable onDragStart={(e) => handleDragStart(e, item.id)} className='absolute w-24 h-24 cursor-grab active:cursor-grabbing' style={{ top: item.y, left: item.x }}>
                            <Image src={furniture.imageUrl} alt={furniture.name} fill className='object-contain pointer-events-none' />
                       </div>
                   )
               })}
            </div>
            <div className="space-y-4 bg-muted p-4 rounded-lg">
                <h3 className='font-bold text-lg'>Móveis</h3>
                {furnitureItems.map(item => (
                    <Button key={item.itemId} variant="outline" className='w-full justify-start' onClick={() => handlePlaceItem(item.itemId)}>
                        <item.icon className="mr-2 h-5 w-5" />
                        {item.name}
                    </Button>
                ))}
                <Button variant="destructive" className='w-full justify-start' onClick={handleClear}>
                    <Trash2 className="mr-2 h-5 w-5"/>
                    Limpar Tudo
                </Button>
            </div>
          </CardContent>
           <CardFooter className="flex-col gap-4 justify-center">
             <Button onClick={handleSave} size="lg"><Save className="mr-2"/>Salvar Decoração (20 XP)</Button>
           </CardFooter>
        </Card>
      </div>
    </main>
  );
}

// NOTE: This component needs furniture images in `public/furniture/`.
// For example:
// public/furniture/sofa1.png
// public/furniture/lamp1.png
// public/furniture/plant1.png
