import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { PetCard, type Pet } from '@/components/PetCard';

const featuredPets: Pet[] = [
  {
    id: '1',
    name: 'Blaze',
    age: '3 years',
    breed: 'Siberian Husky',
    imageUrl: 'https://images.unsplash.com/photo-1602936742009-0ef4d0ecf929?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjYWNob3JybyUyMGFkdWx0byUyMHxlbnwwfHx8fDE3NTY4MTk4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'siberian husky'
  },
  {
    id: '2',
    name: 'Lup',
    age: '2 years',
    breed: 'Labrador Retriever',
    imageUrl: 'https://images.unsplash.com/photo-1527778676396-eceba283ddfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYWNob3JybyUyMGZpbGhvdGUlMjB8ZW58MHx8fHwxNzU2ODE5NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'labrador retriever'
  },
  {
    id: '3',
    name: 'Keylo',
    age: '1 year',
    breed: 'Pug',
    imageUrl: 'https://images.unsplash.com/photo-1744907451349-c1ece07e6f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjYWNob3JybyUyMGRlJTIwNCUyMGFub3N8ZW58MHx8fHwxNzU2ODE5OTIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'pug dog'
  },
];


export default function HomePage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12 text-center">
          <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4">
            Abrigo de Adoção
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through profiles of lovable pets waiting for a forever home. Your journey to unconditional love starts here.
          </p>
          <div className="relative mt-8 max-w-lg mx-auto">
            <Input
              placeholder="Search by breed, age, or species..."
              className="h-12 pl-4 pr-12 text-base"
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label="Search">
              <Search className="h-6 w-6" />
            </Button>
          </div>
        </section>

        <section>
          <h2 className="font-headline text-3xl text-foreground mb-6">Featured Pets</h2>
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
