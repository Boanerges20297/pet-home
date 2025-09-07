
'use client';

import { useEffect, useState } from 'react';
import { useChat } from '@/hooks/use-chat';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, CheckCircle, User, Mail, PawPrint, Home, Activity, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';
import { adoptionFormAssistant } from '@/ai/flows/adoption-form-assistant';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import Link from 'next/link';
import { usePlayer } from '@/context/PlayerContext';
import { allPets } from '@/lib/allPets';


function ChatMessage({
  message,
}: {
  message: { role: 'user' | 'assistant'; content: string };
}) {
  const isAssistant = message.role === 'assistant';
  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isAssistant ? 'justify-start' : 'justify-end'
      )}
    >
      {isAssistant && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-md rounded-lg p-3 text-sm shadow',
          isAssistant
            ? 'bg-muted'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

function ChatInput({ input, handleInputChange, handleSubmit, isLoading }: any) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t p-4"
    >
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder="Digite sua resposta..."
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading || !input.trim()}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}

function SummaryItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | undefined }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-muted-foreground">{value || 'Ainda não informado'}</p>
      </div>
    </div>
  )
}

export default function AdocaoPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, formState, isFinished } =
    useChat({
      api: adoptionFormAssistant,
    });
  const { adoptPet, ownedPets } = usePlayer();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [petReceived, setPetReceived] = useState(false);


  useEffect(() => {
    // Iniciar a conversa quando o componente for montado
    if (messages.length === 0) {
      handleSubmit(new Event('submit'), {
        options: {
          body: {
            userInput: 'Olá, gostaria de iniciar o processo de adoção.',
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirmAdoption = () => {
    if (petReceived) return;

    // Pick a pet that the user doesn't own yet
    const availablePets = allPets.filter(p => !ownedPets.some(op => op.id === p.id));
    const petToAdopt = availablePets.length > 0 
      ? availablePets[Math.floor(Math.random() * availablePets.length)] 
      : allPets[Math.floor(Math.random() * allPets.length)]; // Fallback to any pet if all are owned
    
    if (petToAdopt) {
        adoptPet(petToAdopt);
        setPetReceived(true);
        setIsConfirmationOpen(true);
    }
  }

  return (
    <>
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card className="flex h-[80vh] flex-col">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl md:text-4xl text-primary">
                Adoção com Assistente Virtual
                </CardTitle>
                <CardDescription>
                Converse com nosso agente virtual para preencher seu formulário de
                adoção.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                {messages.map((m, i) => (
                    <ChatMessage key={i} message={m} />
                ))}
                {isLoading && messages.length > 0 && (
                    <ChatMessage
                    message={{ role: 'assistant', content: 'Digitando...' }}
                    />
                )}
                {error && (
                    <ChatMessage
                    message={{
                        role: 'assistant',
                        content: `Ocorreu um erro: ${error.message}`,
                    }}
                    />
                )}
                </div>
            </CardContent>
            {/* Oculta o input de chat quando o formulário é finalizado */}
            {!isFinished && (
                <ChatInput
                    input={input}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            )}
            </Card>
        </div>

        <div className="lg:col-span-1">
            <Card className="sticky top-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="text-green-500" />
                        Resumo da Adoção
                    </CardTitle>
                    <CardDescription>
                        Suas informações aparecerão aqui conforme você responde.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SummaryItem icon={<User />} label="Nome Completo" value={formState.nome} />
                  <Separator />
                  <SummaryItem icon={<Mail />} label="Contato" value={formState.contato} />
                  <Separator />
                  <SummaryItem icon={<PawPrint />} label="Preferências do Pet" value={formState.preferencias} />
                   <Separator />
                  <SummaryItem icon={<Home />} label="Moradia" value={formState.moradia} />
                   <Separator />
                  <SummaryItem icon={<Activity />} label="Estilo de Vida" value={formState.estiloDeVida} />
                </CardContent>
                {/* O botão aparece e é habilitado quando o formulário é finalizado */}
                {isFinished && (
                    <CardFooter>
                        <Button className='w-full' disabled={petReceived} onClick={handleConfirmAdoption}>
                            {petReceived ? 'Filhote Recebido!' : 'Confirmar Adoção e Receber Filhote'}
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
      </div>
    </main>
    <AlertDialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                    <PartyPopper className="h-6 w-6 text-primary" />
                    Adoção Confirmada!
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Parabéns! Você tem um novo amigo esperando por você. O que gostaria de fazer agora?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction asChild>
                    <Link href="/home/minha-colecao">
                        Ver meus filhotes
                    </Link>
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

    </>
  );
}
