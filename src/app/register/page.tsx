
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="absolute top-4 left-4">
        <Button asChild variant="ghost">
          <Link href="/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Login
          </Link>
        </Button>
      </div>
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="items-center text-center">
            <div className="relative mb-4 h-24 w-24">
              <Image
                src="https://images.unsplash.com/photo-1599859556102-1833a691e8e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsb2dvJTIwY29tJTIwZmlsaG90ZXxlbnwwfHx8fDE3NTY5MDk4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Logo do jogo Pequenos Grandes Filhotes"
                fill
                className="rounded-full object-cover"
                data-ai-hint="cute puppy logo"
              />
            </div>
            <CardTitle className="font-headline text-4xl text-accent">Crie sua Conta</CardTitle>
            <CardDescription>Junte-se à aventura e comece a colecionar!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input id="username" type="text" placeholder="Seu nome de jogador" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seuemail@exemplo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="Crie uma senha forte" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button asChild className="w-full" size="lg">
              <Link href="/login">Criar Conta</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
