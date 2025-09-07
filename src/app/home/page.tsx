
"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Coins, PawPrint } from 'lucide-react';
import { PetCard, type Pet } from '@/components/PetCard';
import { usePlayer } from '@/context/PlayerContext';
import { allPets } from '@/lib/allPets';


export default function HomePage() {
  const { coins } = usePlayer();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPets = allPets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.age.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
