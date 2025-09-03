
"use client";

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import * as Tone from 'tone';
import { Button } from '@/components/ui/button';

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const synth = useRef<Tone.Synth | null>(null);
  const loop = useRef<Tone.Loop | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      loop.current?.dispose();
      synth.current?.dispose();
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, []);

  const initializeAudio = async () => {
    if (isInitialized.current) return;
    
    await Tone.start();
    
    synth.current = new Tone.Synth({
      oscillator: {
        type: 'triangle8'
      },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.2,
        release: 0.9
      }
    }).toDestination();
    
    const notes = [
      'C4', 'E4', 'G4', 'C5', 
      'A4', 'G4', 'E4', 'D4',
      'F4', 'A4', 'C5', 'F5',
      'E5', 'C5', 'A4', 'G4'
    ];
    let noteIndex = 0;

    loop.current = new Tone.Loop(time => {
      if (synth.current) {
        const note = notes[noteIndex % notes.length];
        synth.current.triggerAttackRelease(note, '8n', time);
        noteIndex++;
      }
    }, '4n');

    Tone.Transport.start();
    loop.current.start(0);
    isInitialized.current = true;
  };

  const toggleMute = async () => {
    if (!isInitialized.current) {
      await initializeAudio();
    }
    
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    Tone.Destination.mute = newMutedState;
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMute}
      className="absolute top-4 right-4 z-10 text-accent"
      aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
    >
      {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
    </Button>
  );
}
