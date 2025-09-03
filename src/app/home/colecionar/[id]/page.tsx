
'use client';

import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { houses } from '@/lib/houses';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Home, PawPrint } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function HousePage() {
  const params = useParams();
  const id = params.id as string;
  const house = houses.find((h) => h.id === id);

  if (!house) {
    notFound();
  }

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link href="/home/colecionar" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Voltar para a seleção de lares
          </Link>
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
                  Um lugar perfeito para seus filhotes.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative aspect-video w-full">
              <Image
                src={house.imageUrl.replace('600/400', '1280/720')}
                alt={`Interior da ${house.name}`}
                fill
                className="object-cover"
                data-ai-hint={house.aiHint + ' interior'}
              />
            </div>
            <div className="p-6 text-center">
              <p className="text-muted-foreground">
                Este é o seu novo lar! Seus filhotes vão adorar este espaço.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center bg-muted/20 p-6">
            <Button asChild size="lg">
              <Link href="/home">
                <PawPrint className="mr-2 h-5 w-5" />
                Encontrar um filhote para este lar
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
