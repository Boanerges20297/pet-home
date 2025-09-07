
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import * as Tone from 'tone';
import { Button } from '@/components/ui/button';

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const synth = useRef<Tone.Synth | null>(null);
  const loop = useRef<Tone.Loop | null>(null);
  const isInitialized = useRef(false);

  const initializeAudio = useCallback(async () => {
    if (isInitialized.current) return;
    
    await Tone.start();
    isInitialized.current = true;
    
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
    }, '4n').start(0);

    Tone.Transport.start();
    setIsMuted(false); // Unmute after initialization
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
        initializeAudio();
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      if (isInitialized.current) {
        loop.current?.stop(0);
        loop.current?.dispose();
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


  const toggleMute = () => {
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
      className="absolute top-4 right-4 z-10 text-accent"
      aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
    >
      {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
    </Button>
  );
}
