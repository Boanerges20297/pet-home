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
  formState: z
    .object({
      nome: z.string().optional(),
      contato: z.string().optional(),
      preferencias: z.string().optional(),
      moradia: z.string().optional(),
      estiloDeVida: z.string().optional(),
    })
    .optional()
    .describe('The current state of the form as a key-value object.'),
});
export type AdoptionFormAssistantInput = z.infer<typeof AdoptionFormAssistantInputSchema>;

const AdoptionFormAssistantOutputSchema = z.object({
  nextQuestion: z
    .string()
    .describe(
      'The next question to ask the user, or a confirmation message if the form is complete.'
    ),
  updatedFormState: z
    .object({
      nome: z.string().optional(),
      contato: z.string().optional(),
      preferencias: z.string().optional(),
      moradia: z.string().optional(),
      estiloDeVida: z.string().optional(),
    })
    .describe(
      'The updated state of the form with any new information provided by the user.'
    ),
  isFormComplete: z
    .boolean()
    .describe('Whether the adoption form is complete.'),
});
export type AdoptionFormAssistantOutput = z.infer<typeof AdoptionFormAssistantOutputSchema>;

export async function adoptionFormAssistant(
  input: AdoptionFormAssistantInput
): Promise<AdoptionFormAssistantOutput> {
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
Atualize o campo correspondente em 'updatedFormState' com a resposta do usuário.
Siga estritamente esta ordem de perguntas, preenchendo os campos do formulário um por um:

1.  **Nome e Contato**:
    - Se 'nome' não estiver preenchido, pergunte: "Para começar, qual é o seu nome completo?"
    - Se 'contato' não estiver preenchido, pergunte: "Ótimo! Agora, qual é o seu melhor e-mail ou telefone para contato?"

2.  **Preferências do Animal**:
    - Se 'preferencias' não estiverem preenchidas, pergunte: "Que tipo de animal você gostaria de adotar? (Ex: cachorro de porte pequeno, gato filhote, etc.)"

3.  **Moradia**:
    - Se 'moradia' não estiver preenchida, pergunte: "Como é a sua casa? (Ex: apartamento, casa com quintal grande, etc.)"

4.  **Estilo de Vida**:
    - Se 'estiloDeVida' não estiver preenchido, pergunte: "Para finalizar, conte um pouco sobre sua rotina. Você é mais caseiro ou aventureiro?"

5.  **Finalização**:
    - Se todos os campos estiverem preenchidos, defina 'isFormComplete' como true.
    - A 'nextQuestion' deve ser uma mensagem de confirmação, como: "Tudo pronto! Revisamos suas informações. Se estiver tudo certo, pode confirmar a adoção. Muito obrigado!"
    - O 'updatedFormState' deve conter todos os dados preenchidos.

Entrada do usuário: {{{userInput}}}
Estado atual do formulário: {{{json formState}}}

Sempre retorne o 'updatedFormState' completo e o 'isFormComplete' correto.
`,
});

const adoptionFormAssistantFlow = ai.defineFlow(
  {
    name: 'adoptionFormAssistantFlow',
    inputSchema: AdoptionFormAssistantInputSchema,
    outputSchema: AdoptionFormAssistantOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
