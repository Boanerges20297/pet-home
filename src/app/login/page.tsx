
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground p-4">
       <div className="absolute top-4 left-4">
            <Button asChild variant="ghost">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                </Link>
            </Button>
        </div>
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="items-center text-center">
             <div className="relative mb-4 h-24 w-24">
                <Image
                    src="https://images.unsplash.com/photo-1754490792184-b654a6fb360e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjYWNob3JybyUyQ2NvZWxobyUyQ2dhdG8lMkNjb3J1amElMjB8ZW58MHx8fHwxNzU2OTA4MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Logo do jogo Pequenos Grandes Filhotes"
                    fill
                    className="rounded-full object-cover"
                    data-ai-hint="various pets logo"
                />
            </div>
            <CardTitle className="font-headline text-4xl text-accent">Bem-vindo de volta!</CardTitle>
            <CardDescription>Faça login para continuar sua aventura.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seuemail@exemplo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="Sua senha" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button asChild className="w-full" size="lg">
                <Link href="/home">Entrar</Link>
            </Button>
             <p className="text-sm text-muted-foreground">
                Não tem uma conta?{' '}
                <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
                    Criar uma conta
                </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
