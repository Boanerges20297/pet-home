
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import AudioPlayer from '@/components/AudioPlayer';

export default function WelcomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground p-4 overflow-hidden">
        <AudioPlayer />
        <div className="absolute inset-0 z-0 opacity-20">
             <Image
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxmaWxob3RlfGVufDB8fHx8MTc1NjkwMTEwNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fundo com filhotes"
                fill
                className="object-cover"
                data-ai-hint="cute puppies background"
            />
        </div>
      <div className="w-full max-w-md z-10">
        <Card className="shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="items-center text-center">
             <div className="relative mb-4 h-32 w-32">
                <Image
                    src="https://images.unsplash.com/photo-1599859556102-1833a691e8e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsb2dvJTIwY29tJTIwZmlsaG90ZXxlbnwwfHx8fDE3NTY5MDk4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Logo do jogo Pequenos Grandes Filhotes"
                    fill
                    className="rounded-full object-cover border-4 border-primary"
                    data-ai-hint="cute puppy logo"
                />
            </div>
            <CardTitle className="font-headline text-5xl text-accent">Pequenos Grandes Filhotes</CardTitle>
            <CardDescription className="text-xl">Sua aventura de colecionador começa aqui!</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild className="w-auto rounded-full" size="lg">
                <Link href="/login">
                    Começar
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
