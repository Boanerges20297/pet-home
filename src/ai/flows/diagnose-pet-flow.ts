
'use server';

/**
 * @fileOverview A pet diagnosis AI agent.
 *
 * - diagnosePet - A function that handles the pet diagnosis process.
 * - DiagnosePetInput - The input type for the diagnosePet function.
 * - DiagnosePetOutput - The return type for the diagnosePet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnosePetInputSchema = z.object({
  petName: z.string().describe('The name of the pet.'),
  petBreed: z.string().describe('The breed of the pet.'),
  petImageUrl: z.string().describe("The URL of the pet's image."),
  symptom: z.string().optional().describe('The symptom reported by the user.'),
});
export type DiagnosePetInput = z.infer<typeof DiagnosePetInputSchema>;

const DiagnosePetOutputSchema = z.object({
  isHealthy: z.boolean().describe('Whether or not the pet is healthy. Should sometimes be false for creative diagnoses.'),
  diagnosis: z.string().describe("A creative and fun diagnosis of the pet's health. e.g., 'Acute case of the zoomies' or 'Terminal cuteness'."),
  recommendation: z.string().describe('A fun and lighthearted recommendation for the pet owner. e.g., "Administer 3 belly rubs daily" or "Prescription: more squeaky toys".'),
});
export type DiagnosePetOutput = z.infer<typeof DiagnosePetOutputSchema>;

export async function diagnosePet(input: DiagnosePetInput): Promise<DiagnosePetOutput> {
  return diagnosePetFlow(input);
}

const diagnosePetPrompt = ai.definePrompt({
  name: 'diagnosePetPrompt',
  input: {schema: DiagnosePetInputSchema},
  output: {schema: DiagnosePetOutputSchema},
  prompt: `Você é um veterinário de IA amigável e engraçado para um jogo de coleção de animais de estimação chamado "Pequenos Grandes Filhotes".

Sua tarefa é atuar como um veterinário e fornecer um diagnóstico de saúde para o animal de estimação de um usuário. O diagnóstico deve ser criativo, fofo e engraçado.

Na maioria das vezes, o animal deve estar saudável (isHealthy: true). No entanto, às vezes, você deve diagnosticar uma "doença" fictícia e divertida (isHealthy: false).
Exemplos de "doenças" divertidas:
- "Febre da preguiça aguda" (Recomendação: "Tratamento com 5 sessões de carinho na barriga e uma soneca prolongada.")
- "Surto de fofura excessiva" (Recomendação: "Quarentena imediata em uma cama macia.")

Incorpore o nome, a raça, a imagem e o sintoma relatado do animal para gerar um diagnóstico e uma recomendação.

Exemplos de diagnósticos saudáveis:
- Nome: Rex, Raça: Golden Retriever -> Diagnóstico: "Síndrome crônica de abanar o rabo.", Recomendação: "Prescrever sessões diárias de buscar e coçar extra as orelhas."
- Nome: Luna, Raça: Gato Siamês -> Diagnóstico: "Sofre de um caso extremo de elegância.", Recomendação: "É necessário tratamento imediato com banhos de sol e sonecas."

Detalhes do Animal:
- Nome: {{{petName}}}
- Raça: {{{petBreed}}}
- Foto: {{media url=petImageUrl}}
- Sintoma Relatado: {{{symptom}}}

Baseado no sintoma, gere um diagnóstico ainda mais criativo. Por exemplo, se o sintoma for "dor na pata", o diagnóstico poderia ser "Excesso de sapateado noturno".

Atue como um veterinário e gere o diagnóstico. Decida se o animal está "saudável" ou tem uma "doença" divertida. Seja criativo e faça o dono sorrir.
`,
});

const diagnosePetFlow = ai.defineFlow(
  {
    name: 'diagnosePetFlow',
    inputSchema: DiagnosePetInputSchema,
    outputSchema: DiagnosePetOutputSchema,
  },
  async input => {
    const {output} = await diagnosePetPrompt(input);
    if (!output) {
      throw new Error('AI diagnosis failed to generate a response.');
    }
    return output;
  }
);
