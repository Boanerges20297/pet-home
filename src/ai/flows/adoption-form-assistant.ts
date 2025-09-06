'use server';

/**
 * @fileOverview This file defines a Genkit flow for assisting users in filling out an adoption form.
 *
 * It includes:
 * - `adoptionFormAssistant`: The main function to start the adoption form assistant flow.
 * - `AdoptionFormAssistantInput`: The input type for the `adoptionFormAssistant` function.
 * - `AdoptionFormAssistantOutput`: The output type for the `adoptionFormAssistant` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdoptionFormAssistantInputSchema = z.object({
  userInput: z.string().describe('The user input to process.'),
  formState: z.record(z.any()).optional().describe('The current state of the form as a key-value object.'),
});
export type AdoptionFormAssistantInput = z.infer<typeof AdoptionFormAssistantInputSchema>;

const AdoptionFormAssistantOutputSchema = z.object({
  nextQuestion: z.string().describe('The next question to ask the user, or a confirmation message if the form is complete.'),
  updatedFormState: z.record(z.any()).describe('The updated state of the form with any new information provided by the user.'),
  isFormComplete: z.boolean().describe('Whether the adoption form is complete.'),
});
export type AdoptionFormAssistantOutput = z.infer<typeof AdoptionFormAssistantOutputSchema>;

export async function adoptionFormAssistant(input: AdoptionFormAssistantInput): Promise<AdoptionFormAssistantOutput> {
  return adoptionFormAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adoptionFormAssistantPrompt',
  input: {
    schema: AdoptionFormAssistantInputSchema,
  },
  output: {
    schema: AdoptionFormAssistantOutputSchema,
  },
  prompt: `Você é um agente virtual de adoção de animais de estimação. Sua tarefa é ajudar os usuários a preencher um formulário de adoção fazendo perguntas de forma conversacional.

  Analise a entrada do usuário e o estado atual do formulário para determinar a próxima pergunta a ser feita.
  Se o formulário estiver completo, forneça uma mensagem de confirmação e defina isFormComplete como true.
  Sempre retorne o updatedFormState, preenchendo-o com a resposta do usuário.

  Entrada do usuário: {{{userInput}}}
  Estado atual do formulário: {{{formState}}}

  Siga esta ordem de perguntas:
  1. Informações básicas (nome, contato).
  2. Preferências de animal (espécie, raça, idade).
  3. Situação de moradia (casa, apartamento, quintal).
  4. Rotina e estilo de vida.
`,
});

const adoptionFormAssistantFlow = ai.defineFlow(
  {
    name: 'adoptionFormAssistantFlow',
    inputSchema: AdoptionFormAssistantInputSchema,
    outputSchema: AdoptionFormAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
