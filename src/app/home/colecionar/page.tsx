
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { houses } from '@/lib/houses';

export default function ColecionarPage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <section className="mb-12 text-center">
          <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4">
            Escolha um Lar para seu Novo Filhote
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada filhote precisa de um lugar especial para chamar de lar. Navegue pelas opções e escolha a casa perfeita.
          </p>
        </section>

        <section className="flex justify-center">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-xl"
          >
            <CarouselContent>
              {houses.map((house) => (
                <CarouselItem key={house.id} className="md:basis-1/2 lg:basis-1/1">
                  <div className="p-1">
                    <Card className="overflow-hidden">
                       <CardContent className="relative aspect-video p-0">
                        <Image
                          src={house.imageUrl}
                          alt={`Foto de ${house.name}`}
                          fill
                          className="object-cover"
                          data-ai-hint={house.aiHint}
                        />
                      </CardContent>
                      <CardFooter className="flex-col items-start gap-2 p-4">
                        <CardTitle className="font-headline text-2xl text-foreground">{house.name}</CardTitle>
                        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                          <Link href={`/home/colecionar/${house.id}`}>
                            Escolher esta Casa
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </div>
    </main>
  );
}
