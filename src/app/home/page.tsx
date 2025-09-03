
"use client";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Coins, PawPrint } from 'lucide-react';
import { PetCard, type Pet } from '@/components/PetCard';
import { usePlayer } from '@/context/PlayerContext';

const featuredPets: Pet[] = [
  {
    id: '1',
    name: 'Blaze',
    age: 'Nível 5',
    breed: 'Husky Siberiano',
    imageUrl: 'https://images.unsplash.com/photo-1602936742009-0ef4d0ecf929?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjYWNob3JybyUyMGFkdWx0byUyMHxlbnwwfHx8fDE3NTY4MTk4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'siberian husky',
    price: 500,
  },
  {
    id: '2',
    name: 'Lup',
    age: 'Nível 1',
    breed: 'Labrador Retriever',
    imageUrl: 'https://images.unsplash.com/photo-1527778676396-eceba283ddfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYWNob3JybyUyMGZpbGhvdGUlMjB8ZW58MHx8fHwxNzU2ODE5NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'labrador retriever',
    price: 350,
  },
  {
    id: '3',
    name: 'Keylo',
    age: 'Nível 1',
    breed: 'Pug',
    imageUrl: 'https://images.unsplash.com/photo-1744907451349-c1ece07e6f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjYWNob3JybyUyMGRlJTIwNCUyMGFub3N8ZW58MHx8fHwxNzU2ODE5OTIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'pug dog',
    price: 800,
  },
  {
    id: '4',
    name: 'Fido',
    age: 'Nível 2',
    breed: 'Golden Retriever',
    imageUrl: 'https://images.unsplash.com/photo-1689723671115-3133f055ad33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8Y2FjaG9ycm8lMjBhZHVsdG98ZW58MHx8fHwxNzU2OTAwMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'golden retriever',
    price: 400,
  },
  {
    id: '5',
    name: 'Rocky',
    age: 'Nível 6',
    breed: 'Bulldog',
    imageUrl: 'https://images.unsplash.com/photo-1641069203366-12db9d0831d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxmaWxob3RlJTIwZGUlMjBjYWNob3JybyUyMGRlJTIwJTIwY2hhcGV1fGVufDB8fHx8MTc1NjkwMDMxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'bulldog puppy',
    price: 700,
  },
  {
    id: '6',
    name: 'Luna',
    age: 'Nível 1',
    breed: 'Gato Siamês',
    imageUrl: 'https://images.unsplash.com/photo-1578423723952-a3b50cfa5857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxnYXRpbmhvJTIwZmlsaG90ZXxlbnwwfHx8fDE3NTY5MDA0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'siamese kitten',
    price: 300,
  },
  {
    id: '7',
    name: 'Max',
    age: 'Nível 4',
    breed: 'Gato de Pelo Curto',
    imageUrl: 'https://images.unsplash.com/photo-1627486553308-e9051454680d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnYXRvJTIwbm8lMjBhcnJhbmhhZG9yfGVufDB8fHx8MTc1NjkwMDQ3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'cat scratching post',
    price: 550,
  },
  {
    id: '8',
    name: 'Bella',
    age: 'Nível 7',
    breed: 'gato de roupa',
    imageUrl: 'https://images.unsplash.com/photo-1724286014482-ca026cf24420?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnYXRvJTIwZGUlMjByb3VwYXxlbnwwfHx8fDE3NTY5MDA2MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'poodle puppy',
    price: 850,
  },
  {
    id: '9',
    name: 'Charlie',
    age: 'Nível 5',
    breed: 'Shih Tzu',
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb2VsaG98ZW58MHx8fHwxNzU2OTAwNzc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'shih tzu',
    price: 650,
  },
  {
    id: '10',
    name: 'Daisy',
    age: 'Nível 2',
    breed: 'Dachshund',
    imageUrl: 'https://images.unsplash.com/photo-1535241556859-780cb9f395f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjb2VsaG98ZW58MHx8fHwxNzU2OTAwNzc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'dachshund puppy',
    price: 450,
  },
  {
    id: '11',
    name: 'Milo',
    age: 'Nível 9',
    breed: 'Boxer',
    imageUrl: 'https://images.unsplash.com/photo-1558945657-484aa38065ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjb3J1amF8ZW58MHx8fHwxNzU2OTAwODY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'boxer dog',
    price: 900,
  },
  {
    id: '12',
    name: 'Zoe',
    age: 'Nível 3',
    breed: 'Rottweiler',
    imageUrl: 'https://images.unsplash.com/photo-1710892666816-306673646f25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjYWNob3Jyb3MlMjByZWNlbSUyMG5hc2NpZG98ZW58MHx8fHwxNzU2OTAwMTE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'rottweiler puppy',
    price: 500,
  },
];


export default function HomePage() {
  const { coins } = usePlayer();
  
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12">
          <div className="flex justify-end items-center gap-2 mb-4 text-yellow-500">
            <Coins className="h-10 w-10" />
            <span className="font-headline text-4xl text-foreground">{coins}</span>
          </div>
          <div className="text-center">
            <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4">
              Filhotes à Venda
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Navegue pelos filhotes colecionáveis disponíveis para compra. A sua jornada para se tornar um mestre de filhotes começa aqui.
            </p>
            <div className="relative mt-8 max-w-lg mx-auto">
              <Input
                placeholder="Pesquise por raça, nível ou nome..."
                className="h-12 pl-4 pr-12 text-base"
              />
              <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label="Pesquisar">
                <Search className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-headline text-3xl text-foreground mb-6">Filhotes para Colecionar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
