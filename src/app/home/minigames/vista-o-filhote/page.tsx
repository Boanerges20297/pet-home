
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction } from 'lucide-react';
import Link from 'next/link';

export default function ComingSoonPage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
      <div className="mx-auto max-w-lg w-full">
        <Link href="/home/minigames" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Voltar para os Minigames
        </Link>
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto bg-primary/20 p-4 rounded-full w-fit">
                <Construction className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary mt-4">Vista o Filhote</CardTitle>
            <CardDescription className="text-lg">
                Este minigame está em construção!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
                Nossos melhores desenvolvedores de filhotes estão trabalhando duro para trazer esta aventura até você. Volte em breve para escolher roupas e acessórios divertidos para deixar seu pet estiloso!
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
