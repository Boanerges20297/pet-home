
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, Wrench } from 'lucide-react';
import Link from 'next/link';

export default function MinigamesPage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <section className="mb-12 text-center">
          <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4 flex items-center justify-center gap-4">
            <Gamepad2 className="h-10 w-10" />
            Minigames Interativos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Prepare-se para se divertir! Novos jogos estão a caminho para você e seus filhotes.
          </p>
        </section>

        <section>
          <Card className="text-center py-16 px-6 border-2 border-dashed rounded-lg">
            <CardHeader>
                <Wrench className="mx-auto h-12 w-12 text-muted-foreground" />
                <CardTitle className="text-2xl font-semibold text-foreground mt-4">Em Construção</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Nossa equipe de desenvolvedores (e seus filhotes assistentes) está trabalhando duro para trazer jogos incríveis para você. Volte em breve!
              </CardDescription>
            </CardContent>
             <div className="mt-6">
                <Button asChild>
                    <Link href="/home">
                        Voltar para a Loja de Filhotes
                    </Link>
                </Button>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
