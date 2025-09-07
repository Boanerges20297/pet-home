
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Stethoscope, HeartPulse, CheckCircle2, Lightbulb, AlertTriangle } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { DiagnosePetOutput } from '@/ai/flows/diagnose-pet-flow';
import { diagnosePet } from '@/ai/flows/diagnose-pet-flow';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const symptoms = [
    { id: 'dor-pata', label: 'Dor na pata' },
    { id: 'vomitando', label: 'Vomitando' },
    { id: 'nao-come', label: 'Não come' },
];

export default function ExamesPage() {
    const { ownedPets, addXp } = usePlayer();
    const { toast } = useToast();
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
    const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
    const [healthReport, setHealthReport] = useState<DiagnosePetOutput | null>(null);
    const [isExamining, setIsExamining] = useState(false);

    const handleExam = async () => {
        if (!selectedPetId) return;
        
        const pet = ownedPets.find(p => p.id === selectedPetId);
        if(!pet) return;

        setIsExamining(true);
        setHealthReport(null);

        try {
            // Simulate examination time
            await new Promise(resolve => setTimeout(resolve, 2500));

            const report = await diagnosePet({
                petName: pet.name,
                petBreed: pet.breed,
                petImageUrl: pet.imageUrl,
                symptom: selectedSymptom ?? 'Nenhum sintoma aparente',
            });
            
            addXp(20);
            setHealthReport(report);
            toast({
                title: 'Exame Realizado!',
                description: 'Você ganhou 20 XP por cuidar da saúde do seu filhote.',
            });

        } catch (error) {
            console.error("Error during diagnosis:", error);
            toast({
                title: 'Erro no Diagnóstico',
                description: 'Não foi possível contatar o veterinário de IA.',
                variant: 'destructive',
            });
        } finally {
            setIsExamining(false);
        }
    }

    const selectedPet = ownedPets.find(p => p.id === selectedPetId);

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-blue-50">
      <div className="mx-auto max-w-2xl">
        <Link href="/home" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Voltar
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl text-primary flex items-center justify-center gap-3">
                <Stethoscope className="h-10 w-10" />
                Check-up do Filhote
            </CardTitle>
            <CardDescription className="text-lg">
                Selecione um filhote para um check-up com nosso veterinário de IA e ganhe XP.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
             <div className="w-full max-w-sm">
                {ownedPets.length > 0 ? (
                    <Select 
                        onValueChange={(value) => {
                            setSelectedPetId(value);
                            setHealthReport(null);
                        }} 
                        value={selectedPetId ?? ""}
                        disabled={isExamining}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um filhote para examinar" />
                        </SelectTrigger>
                        <SelectContent>
                        {ownedPets.map(pet => (
                            <SelectItem key={pet.id} value={pet.id}>{pet.name}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                ) : (
                    <p className="text-center text-muted-foreground">Você ainda não tem filhotes. <Link href="/home" className="text-primary underline">Adote um agora!</Link></p>
                )}
             </div>

            <div className="relative w-full h-60 flex items-center justify-center overflow-hidden">
                {selectedPet && (
                    <div className="relative z-10 w-48 h-48">
                        <Image 
                            src={selectedPet.imageUrl}
                            alt={selectedPet.name}
                            fill
                            className={cn("object-contain drop-shadow-2xl transition-opacity duration-300", isExamining && "opacity-50")}
                        />
                         {isExamining && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center">
                                <div className="absolute w-full h-1 bg-cyan-400/80 shadow-[0_0_10px_2px_#0ff]" style={{ animation: 'scan 2.5s ease-in-out infinite' }} />
                            </div>
                        )}
                    </div>
                )}
                 {!selectedPet && !isExamining && (
                    <div className="text-center text-muted-foreground">
                        <p>Selecione um filhote para começar.</p>
                    </div>
                 )}
            </div>

            {selectedPet && (
                <div className="w-full max-w-sm space-y-4">
                    <Label className="font-semibold text-center block">O que seu pet está sentindo?</Label>
                    <RadioGroup 
                        onValueChange={setSelectedSymptom} 
                        value={selectedSymptom ?? ""}
                        className="flex justify-center gap-4"
                        disabled={isExamining}
                    >
                        {symptoms.map((symptom) => (
                             <div key={symptom.id} className="flex items-center space-x-2">
                                <RadioGroupItem value={symptom.label} id={symptom.id} />
                                <Label htmlFor={symptom.id}>{symptom.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            )}

            <Button onClick={handleExam} disabled={!selectedPetId || isExamining} size="lg">
                {isExamining ? (
                    <>
                        <Stethoscope className="mr-2 h-5 w-5 animate-pulse" />
                        Examinando com IA...
                    </>
                ) : (
                    <>
                        <HeartPulse className="mr-2 h-5 w-5" />
                        Realizar Exame (20 XP)
                    </>
                )}
            </Button>
          </CardContent>
          {healthReport && !isExamining && (
            <>
              <Separator />
              <CardFooter className="flex-col p-6 gap-4">
                <div className="text-center">
                  <h3 className="font-headline text-2xl text-primary">Boletim de Saúde</h3>
                </div>
                <div
                  className={cn(
                    "w-full space-y-3 rounded-lg border p-4",
                    healthReport.isHealthy
                      ? "border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-900/50 dark:text-green-200"
                      : "border-yellow-200 bg-yellow-100 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                  )}
                >
                  <div className="flex items-center gap-3 font-bold">
                    {healthReport.isHealthy ? (
                      <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
                    )}
                    <span>Status: {healthReport.isHealthy ? "Saudável e Brincalhão!" : "Precisa de Atenção Especial!"}</span>
                  </div>

                  <Separator className={cn(healthReport.isHealthy ? "bg-green-200 dark:bg-green-800" : "bg-yellow-200 dark:bg-yellow-800")} />

                  <div className="flex items-start gap-3">
                    <Stethoscope className="mt-1 h-8 w-8 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Diagnóstico:</h4>
                      <p>{healthReport.diagnosis}</p>
                    </div>
                  </div>
                  <Separator className={cn(healthReport.isHealthy ? "bg-green-200 dark:bg-green-800" : "bg-yellow-200 dark:bg-yellow-800")} />
                  <div className="flex items-start gap-3">
                    <Lightbulb className="mt-1 h-8 w-8 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Recomendação:</h4>
                      <p>{healthReport.recommendation}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex justify-center gap-4 text-sm font-semibold">
                  <span className={cn("rounded-full px-3 py-1", healthReport.isHealthy ? "bg-green-500 text-white" : "bg-muted text-muted-foreground")}>
                    Bem
                  </span>
                  <span className={cn("rounded-full px-3 py-1", !healthReport.isHealthy ? "bg-yellow-500 text-white" : "bg-muted text-muted-foreground")}>
                    Doente
                  </span>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </main>
  );
}
