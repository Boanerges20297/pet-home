import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { PetCard, type Pet } from '@/components/PetCard';

const featuredPets: Pet[] = [
  {
    id: '1',
    name: 'Buddy',
    age: '2 years',
    breed: 'Golden Retriever',
    imageUrl: 'https://picsum.photos/seed/buddy/400/400',
    aiHint: 'golden retriever'
  },
  {
    id: '2',
    name: 'Lucy',
    age: '1 year',
    breed: 'Tabby Cat',
    imageUrl: 'https://picsum.photos/seed/lucy/400/400',
    aiHint: 'tabby cat'
  },
  {
    id: '3',
    name: 'Max',
    age: '4 years',
    breed: 'German Shepherd',
    imageUrl: 'https://picsum.photos/seed/max/400/400',
    aiHint: 'german shepherd'
  },
  {
    id: '4',
    name: 'Daisy',
    age: '3 years',
    breed: 'Beagle',
    imageUrl: 'https://picsum.photos/seed/daisy/400/400',
    aiHint: 'beagle dog'
  },
  {
    id: '5',
    name: 'Charlie',
    age: '5 years',
    breed: 'Domestic Shorthair',
    imageUrl: 'https://picsum.photos/seed/charlie/400/400',
    aiHint: 'shorthair cat'
  },
  {
    id: '6',
    name: 'Sadie',
    age: '6 months',
    breed: 'Labrador Mix',
    imageUrl: 'https://picsum.photos/seed/sadie/400/400',
    aiHint: 'labrador puppy'
  },
];


export default function HomePage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-12 text-center">
          <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4">
            Find Your New Best Friend
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
