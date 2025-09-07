
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LifeBuoy } from 'lucide-react';

export default function PetRescuePage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Link href="/home" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Voltar
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl text-primary flex items-center justify-center gap-3">
                <LifeBuoy className="h-10 w-10" />
                Resgate de Filhotes
            </CardTitle>
            <CardDescription className="text-lg">
                Esta área está em desenvolvimento. Em breve, você poderá embarcar em missões para resgatar filhotes necessitados!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-48">
             <p className="text-muted-foreground">Volte em breve para mais novidades!</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
