
'use client';

import { useState, useCallback } from 'react';
import type { AdoptionFormAssistantInput, AdoptionFormAssistantOutput } from '@/ai/flows/adoption-form-assistant';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type UseChatOptions = {
  api: (input: AdoptionFormAssistantInput) => Promise<AdoptionFormAssistantOutput>;
  initialMessages?: Message[];
  initialInput?: string;
};

export const useChat = ({
  api,
  initialMessages = [],
  initialInput = '',
}: UseChatOptions) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>(initialInput);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement> | Event, options?: { options?: { body?: Record<string, any> } }) => {
      e.preventDefault();
      
      const userInput = options?.options?.body?.userInput || input;
      if (!userInput) return;

      setIsLoading(true);
      setError(null);
      
      const userMessage: Message = { role: 'user', content: userInput };
      // Do not add the initial "start" message to the chat history
      if (userInput !== 'Olá, gostaria de iniciar o processo de adoção.') {
        setMessages(prev => [...prev, userMessage]);
      }
      setInput('');

      try {
        const response = await api({
          userInput,
          formState,
        });

        if (response.nextQuestion) {
          const assistantMessage: Message = { role: 'assistant', content: response.nextQuestion };
          setMessages(prev => [...prev, assistantMessage]);
        }
        
        setFormState(response.updatedFormState);

        if(response.isFormComplete) {
            setIsFinished(true);
        }

      } catch (err: any) {
        setError(err);
        const errorMessage: Message = { role: 'assistant', content: 'Desculpe, ocorreu um erro ao processar sua solicitação.' };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, formState, api]
  );

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    formState,
    isFinished,
  };
};
