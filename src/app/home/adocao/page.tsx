
'use client';

import { useEffect } from 'react';
import { useChat } from '@/hooks/use-chat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { adoptionFormAssistant } from '@/ai/flows/adoption-form-assistant';

function ChatMessage({ message }: { message: { role: 'user' | 'assistant'; content: string } }) {
  const isAssistant = message.role === 'assistant';
  return (
    <div className={cn('flex items-start gap-3', isAssistant ? 'justify-start' : 'justify-end')}>
      {isAssistant && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-xs rounded-lg p-3 text-sm',
          isAssistant ? 'bg-muted' : 'bg-primary text-primary-foreground'
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

export default function AdocaoPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: adoptionFormAssistant
  });

  useEffect(() => {
    // Iniciar a conversa quando o componente for montado
    if (messages.length === 0) {
      handleSubmit(new Event('submit'), {
        options: {
          body: {
            userInput: 'Olá, gostaria de iniciar o processo de adoção.'
          }
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Card className="flex h-[70vh] flex-col">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">
              Adoção com Assistente Virtual
            </CardTitle>
            <CardDescription>
              Converse com nosso agente virtual para preencher seu formulário de adoção.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((m, i) => (
                <ChatMessage key={i} message={m} />
              ))}
               {isLoading && messages.length > 0 && (
                <ChatMessage message={{ role: 'assistant', content: 'Digitando...' }} />
              )}
              {error && (
                <ChatMessage message={{ role: 'assistant', content: `Ocorreu um erro: ${error.message}` }} />
              )}
            </div>
          </CardContent>
            <ChatInput
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </Card>
      </div>
    </main>
  );
}
