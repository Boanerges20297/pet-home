"use client";

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import * as Tone from 'tone';
import { Button } from '@/components/ui/button';

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const synth = useRef<Tone.Synth | null>(null);
  const loop = useRef<Tone.Loop | null>(null);

  useEffect(() => {
    // Initialize synth on the client side
    synth.current = new Tone.Synth({
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    }).toDestination();
    
    // A simple, calm arpeggio
    const notes = ['C4', 'E4', 'G4', 'B4'];
    let noteIndex = 0;

    loop.current = new Tone.Loop(time => {
      if (synth.current) {
        const note = notes[noteIndex % notes.length];
        synth.current.triggerAttackRelease(note, '8n', time);
        noteIndex++;
      }
    }, '2n').start(0);

    // Mute by default
    Tone.Destination.mute = true;

    return () => {
      // Cleanup on unmount
      loop.current?.dispose();
      synth.current?.dispose();
    };
  }, []);

  const toggleMute = async () => {
    if (Tone.context.state !== 'running') {
      await Tone.start();
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
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
    </Button>
  );
}
