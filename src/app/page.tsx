
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import * as Tone from 'tone';


function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const isInitialized = useRef(false);
  const synth = useRef<Tone.Synth | null>(null);
  const loop = useRef<Tone.Loop | null>(null);

  const initializeAudio = useCallback(async () => {
    if (isInitialized.current) return;
    
    await Tone.start();
    isInitialized.current = true;
    
    synth.current = new Tone.Synth({
      oscillator: { type: 'triangle8' },
      envelope: { attack: 0.02, decay: 0.1, sustain: 0.2, release: 0.9 }
    }).toDestination();
    
    const notes = ['C4', 'E4', 'G4', 'C5', 'A4', 'G4', 'E4', 'D4', 'F4', 'A4', 'C5', 'F5', 'E5', 'C5', 'A4', 'G4'];
    let noteIndex = 0;

    loop.current = new Tone.Loop(time => {
      if (synth.current) {
        const note = notes[noteIndex % notes.length];
        synth.current.triggerAttackRelease(note, '8n', time);
        noteIndex++;
      }
    }, '4n').start(0);

    Tone.Transport.start();
    setIsMuted(false);
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isInitialized.current) {
        initializeAudio();
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      if (isInitialized.current) {
        loop.current?.stop(0).dispose();
        synth.current?.dispose();
        Tone.Transport.stop();
        Tone.Transport.cancel();
        isInitialized.current = false;
      }
    };
  }, [initializeAudio]);

  useEffect(() => {
    if (isInitialized.current) {
      Tone.Destination.mute = isMuted;
    }
  }, [isMuted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInitialized.current) {
      initializeAudio();
    } else {
      setIsMuted(prevState => !prevState);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMute}
      className="absolute top-4 right-4 z-20 text-accent"
      aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
    >
      {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
    </Button>
  );
}


export default function WelcomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground p-4 overflow-hidden">
      <AudioPlayer />
      <div className="w-full max-w-md z-10">
        <Card className="shadow-2xl bg-card/80 backdrop-blur-sm border-0">
          <CardHeader className="items-center text-center">
             <div className="relative mb-4 h-32 w-32">
                <Image
                    src="https://images.unsplash.com/photo-1730226929939-cac08913f641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYWNob3JybyUyMGZlbGl6fGVufDB8fHx8MTc1NjkwODQ3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Logo do jogo Pequenos Grandes Filhotes"
                    fill
                    className="rounded-full object-cover border-4 border-primary"
                    data-ai-hint="happy dog"
                />
            </div>
            <CardTitle className="font-headline text-5xl text-accent">Pequenos Grandes Filhotes</CardTitle>
            <CardDescription className="text-xl">Sua aventura de colecionador começa aqui!</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild className="w-auto rounded-full" size="lg">
                <Link href="/login">
                    Começar
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
