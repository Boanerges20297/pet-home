
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePlayer } from '@/context/PlayerContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PawPrint, FolderHeart } from 'lucide-react';

export default function MyCollectionPage() {
  const { ownedPets } = usePlayer();

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12">
          <div className="text-center">
            <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4 flex items-center justify-center gap-4">
              <FolderHeart className="h-10 w-10" />
              Minha Coleção de Filhotes
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aqui estão todos os amigos que você já adotou. Cuide bem deles!
            </p>
          </div>
        </section>

        <section>
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
        </section>
      </div>
    </main>
  );
}
