
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, Play, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const minigames = [
  {
    title: 'Pegue o Filhote!',
    description: 'Teste seus reflexos e pegue os filhotes que aparecem nos buracos.',
    href: '/home/minigames/pegue-o-filhote',
    imageUrl: 'https://images.unsplash.com/photo-1527778676396-eceba283ddfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYWNob3JybyUyMGZpbGhvdGUlMjB8ZW58MHx8fHwxNzU2ODE5NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'puppy cute',
    status: 'available',
  },
  {
    title: 'Corrida de Obstáculos',
    description: 'Guie seu filhote por uma pista cheia de desafios e colete prêmios.',
    href: '#',
    imageUrl: 'https://images.unsplash.com/photo-1558929996-da64ba858215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhZ2lsaXR5JTIwZG9nfGVufDB8fHx8MTc1ODIyMTc4NXww&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'dog agility',
    status: 'coming_soon',
  },
  {
    title: 'Quebra-Cabeça de Pata',
    description: 'Resolva quebra-cabeças divertidos com imagens dos seus filhotes.',
    href: '#',
    imageUrl: 'https://images.unsplash.com/photo-1546419359-2dfb78498a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwdXp6bGUlMjBkb2d8ZW58MHx8fHwxNzU4MjIxODM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'puzzle dog',
    status: 'coming_soon',
  },
  {
    title: 'Encontre o Petisco',
    description: 'Use seu faro para encontrar os petiscos escondidos no cenário.',
    href: '#',
    imageUrl: 'https://images.unsplash.com/photo-1578505779919-3a3c937795c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzZWFyY2hpbmclMjBkb2d8ZW58MHx8fHwxNzU4MjIxODYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'dog searching',
    status: 'coming_soon',
  },
  {
    title: 'Memória Animal',
    description: 'Combine os pares de cartas com imagens de animais fofos.',
    href: '#',
    imageUrl: 'https://images.unsplash.com/photo-1516575150278-77133a734612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtZW1vcnklMjBnYW1lJTIwYW5pbWFsfGVufDB8fHx8MTc1ODIyMTg5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'animal memory game',
    status: 'coming_soon',
  },
  {
    title: 'Vista o Filhote',
    description: 'Escolha roupas e acessórios divertidos para deixar seu pet estiloso.',
    href: '#',
    imageUrl: 'https://images.unsplash.com/photo-1554720460-904d23d34a12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8YnVsbGRvZ3VlJTIwZGUlMjBjaGFwZXV8ZW58MHx8fHwxNzU3MTYxOTU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'dog with hat',
    status: 'coming_soon',
  },
  {
    title: 'Siga o Mestre',
    description: 'Repita a sequência de latidos e miados para ganhar pontos.',
    href: '#',
    imageUrl: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYXQlMjB0YWxraW5nfGVufDB8fHx8MTc1ODIyMTk4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'cat talking',
    status: 'coming_soon',
  },
  {
    title: 'Banho Divertido',
    description: 'Ajude a dar um banho no seu filhote antes que o tempo acabe.',
    href: '#',
    imageUrl: 'https://images.unsplash.com/photo-1556872513-f69904c18596?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkb2clMjBiYXRofGVufDB8fHx8MTc1ODIyMjAxNHww&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'dog bath',
    status: 'coming_soon',
  },
  {
    title: 'Decore o Lar',
    description: 'Decore os cômodos da casa do seu filhote com móveis e brinquedos.',
    href: '#',
    imageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDB8fHx8MTc1ODIyMjA0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'living room furniture',
    status: 'coming_soon',
  },
  {
    title: 'Aventura no Parque',
    description: 'Explore o parque, encontre outros filhotes e descubra segredos.',
    href: '#',
    imageUrl: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwYXJrJTIwZG9nfGVufDB8fHx8MTc1ODIyMjA3M3ww&ixlibrb-4.1.0&q=80&w=1080',
    aiHint: 'dog park',
    status: 'coming_soon',
  },
];

export default function MinigamesHubPage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12 text-center">
          <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4 flex items-center justify-center gap-4">
            <Gamepad2 className="h-10 w-10" />
            Central de Minigames
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha um jogo para se divertir com seus filhotes e ganhar recompensas.
          </p>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {minigames.map((game) => {
              const isAvailable = game.status === 'available';
              return (
                <Card key={game.title} className={cn("overflow-hidden flex flex-col transition-all", !isAvailable && "bg-muted/50 opacity-70")}>
                  <CardHeader className="p-0">
                    <div className="relative aspect-video w-full">
                      <Image
                        src={game.imageUrl}
                        alt={`Imagem do jogo ${game.title}`}
                        fill
                        className="object-cover"
                        data-ai-hint={game.aiHint}
                      />
                      {!isAvailable && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">EM BREVE</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <CardTitle className="font-headline text-2xl text-foreground">{game.title}</CardTitle>
                    <CardDescription className="mt-1 flex-grow">{game.description}</CardDescription>
                  </CardContent>
                  <div className="p-4 pt-0 mt-auto">
                    <Button asChild className="w-full" disabled={!isAvailable}>
                      <Link href={isAvailable ? game.href : '#'}>
                        {isAvailable ? <Play className="mr-2" /> : <AlertTriangle className="mr-2" />}
                        {isAvailable ? 'Jogar Agora' : 'Em Breve'}
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
