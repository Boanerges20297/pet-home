
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, PawPrint } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [petName, setPetName] = useState('');
  const router = useRouter();

  const handleCreateAccount = () => {
    if (typeof window !== 'undefined' && username && petName) {
        // Clear previous user data reliably
        localStorage.removeItem('coins');
        localStorage.removeItem('gems');
        localStorage.removeItem('level');
        localStorage.removeItem('xp');
        localStorage.removeItem('currentDay');
        localStorage.removeItem('collectedDays');
        localStorage.removeItem('ownedPets');
        localStorage.removeItem('inventory');
        localStorage.removeItem('username');
        localStorage.removeItem('initialPetName');


        // Set new user flag and username
        localStorage.setItem('isNewUser', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('initialPetName', petName);
    }
    router.push('/home');
  }

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
                src="https://images.unsplash.com/photo-1754490792184-b654a6fb360e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjYWNob3JybyUyQ2dhdG8lMjAlMkNjb2VsaG8lMkNjb3J1amElMjB8ZW58MHx8fHwxNzU2OTA4MTU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Logo do jogo Pequenos Grandes Filhotes"
                fill
                className="rounded-full object-cover"
                data-ai-hint="various pets logo"
              />
            </div>
            <CardTitle className="font-headline text-4xl text-accent">Crie sua Conta</CardTitle>
            <CardDescription>Junte-se à aventura e comece a colecionar!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Seu Nome de Usuário</Label>
              <Input id="username" type="text" placeholder="Seu nome de jogador" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seuemail@exemplo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="Crie uma senha forte" />
            </div>
             <Separator className="my-6" />
              <div className="space-y-2 text-center">
                 <Label htmlFor="petName" className="text-base flex items-center justify-center gap-2">
                  <PawPrint className="h-5 w-5 text-primary"/>
                  Dê um nome ao seu primeiro amigo!
                </Label>
                <p className="text-sm text-muted-foreground">
                  Ao criar sua conta, você receberá um cachorro como seu primeiro companheiro.
                </p>
                <Input id="petName" type="text" placeholder="Nome do seu filhote" value={petName} onChange={(e) => setPetName(e.target.value)} className="text-center" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button onClick={handleCreateAccount} className="w-full" size="lg" disabled={!username || !petName}>
              Criar Conta e Começar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
