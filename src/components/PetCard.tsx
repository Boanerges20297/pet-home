import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Coins } from 'lucide-react';
import Link from 'next/link';

export interface Pet {
  id: string;
  name: string;
  age: string;
  breed: string;
  imageUrl: string;
  aiHint: string;
  price: number;
}

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <Card className="overflow-hidden bg-card transition-shadow hover:shadow-xl flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full">
          <Image
            src={pet.imageUrl}
            alt={`Uma foto de ${pet.name}`}
            fill
            className="object-cover"
            data-ai-hint={pet.aiHint}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-start justify-between">
          <CardTitle className="font-headline text-2xl text-foreground">{pet.name}</CardTitle>
          <Button variant="ghost" size="icon" className="group -mt-1 -mr-2" aria-label={`Favoritar ${pet.name}`}>
            <Heart className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-red-500 group-hover:fill-red-500" />
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="secondary">{pet.age}</Badge>
          <Badge variant="secondary">{pet.breed}</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2 text-foreground font-headline text-lg">
            <Coins className="h-5 w-5 text-yellow-500" />
            <span>{pet.price}</span>
        </div>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href={`/pet/${pet.id}`}>Comprar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
