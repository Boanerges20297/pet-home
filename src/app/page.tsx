import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import AudioPlayer from '@/components/AudioPlayer';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground overflow-hidden">
      <AudioPlayer />
      <div className="flex flex-col items-center justify-center gap-8 text-center p-4">
        <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-primary/20 shadow-lg md:h-80 md:w-80">
          <div className="h-60 w-60 overflow-hidden rounded-full shadow-inner md:h-72 md:w-72">
            <Image
              src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYWNob3Jyb3xlbnwwfHx8fDE3NTY3MzY4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="A cute dog available for adoption"
              width={400}
              height={400}
              className="h-full w-full object-cover"
              data-ai-hint="cute dog"
              priority
            />
          </div>
        </div>
        <h1 className="font-headline text-5xl md:text-7xl text-accent">PetHome</h1>
        <p className="max-w-md font-body text-lg text-muted-foreground">
          Find your new best friend. Open your heart and home to a pet in need.
        </p>
      </div>
      <Link href="/home" className="absolute bottom-10 animate-bounce" aria-label="Go to home page">
        <ArrowDown className="h-10 w-10 text-accent" />
        <span className="sr-only">Go to next page</span>
      </Link>
    </div>
  );
}
