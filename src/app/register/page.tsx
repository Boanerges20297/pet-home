
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const initialPets = {
    dog: {
        id: 'initial_dog',
        name: 'Amigão',
        age: 'Nível 1',
        breed: 'Vira-lata Caramelo',
        imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxmaWxob3RlfGVufDB8fHx8MTc1NjkwMTEwNnww&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'caramel dog',
        price: 0,
    },
    cat: {
        id: 'initial_cat',
        name: 'Miau',
        age: 'Nível 1',
        breed: 'Gato de Pelo Curto',
        imageUrl: 'https://images.unsplash.com/photo-1578423723952-a3b50cfa5857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxnYXRpbmhvJTIwZmlsaG90ZXxlbnwwfHx8fDE3NTY5MDA0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'short hair cat',
        price: 0,
    }
}

export default function RegisterPage() {
  const [selectedPet, setSelectedPet] = useState<'dog' | 'cat' | null>(null);
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleCreateAccount = () => {
    if (typeof window !== 'undefined' && selectedPet) {
        localStorage.setItem('initialPet', selectedPet);
        localStorage.setItem('username', username);
    }
    router.push('/login');
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
              <Label htmlFor="username">Nome de Usuário</Label>
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
            <div className="space-y-4 pt-4">
                <Label className="text-center block">Escolha seu primeiro filhote!</Label>
                <div className="grid grid-cols-2 gap-4">
                    <Card onClick={() => setSelectedPet('dog')} className={cn("cursor-pointer transition-all", selectedPet === 'dog' ? 'ring-2 ring-primary' : 'hover:shadow-md')}>
                        <CardContent className="p-2 relative">
                             {selectedPet === 'dog' && <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />}
                            <Image src={initialPets.dog.imageUrl} alt="Cachorro" width={200} height={200} className="rounded-md object-cover aspect-square"/>
                        </CardContent>
                        <CardFooter className="p-2 justify-center">
                            <p className="font-medium">Cachorro</p>
                        </CardFooter>
                    </Card>
                     <Card onClick={() => setSelectedPet('cat')} className={cn("cursor-pointer transition-all", selectedPet === 'cat' ? 'ring-2 ring-primary' : 'hover:shadow-md')}>
                        <CardContent className="p-2 relative">
                             {selectedPet === 'cat' && <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />}
                            <Image src={initialPets.cat.imageUrl} alt="Gato" width={200} height={200} className="rounded-md object-cover aspect-square"/>
                        </CardContent>
                         <CardFooter className="p-2 justify-center">
                            <p className="font-medium">Gato</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button onClick={handleCreateAccount} className="w-full" size="lg" disabled={!selectedPet || !username}>
              Criar Conta e Começar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
