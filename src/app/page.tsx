
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground p-4">
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
                <Link href="#" className="font-medium text-primary underline-offset-4 hover:underline">
                    Criar uma conta
                </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
