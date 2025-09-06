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

export const DiagnosePetInputSchema = z.object({
  petName: z.string().describe('The name of the pet.'),
  petBreed: z.string().describe('The breed of the pet.'),
  petImageUrl: z.string().describe('The URL of the pet\'s image.'),
});
export type DiagnosePetInput = z.infer<typeof DiagnosePetInputSchema>;

export const DiagnosePetOutputSchema = z.object({
  isHealthy: z.boolean().describe('Whether or not the pet is healthy. Should always be true.'),
  diagnosis: z.string().describe("A creative and fun diagnosis of the pet's health. e.g., 'Acute case of the zoomies' or 'Terminal cuteness'."),
  recommendation: z.string().describe('A fun and lighthearted recommendation for the pet owner. e.g., "Administer 3 belly rubs daily" or "Prescription: more squeaky toys".'),
});
export type DiagnosePetOutput = z.infer<typeof DiagnosePetOutputSchema>;

export async function diagnosePet(input: DiagnosePetInput): Promise<DiagnosePetOutput> {
  return diagnosePetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnosePetPrompt',
  input: {schema: DiagnosePetInputSchema},
  output: {schema: DiagnosePetOutputSchema},
  prompt: `You are a friendly and funny AI veterinarian for a pet collection game called "Pequenos Grandes Filhotes".

Your task is to provide a health diagnosis for a user's pet. The diagnosis should always be positive and lighthearted. The pet is always healthy.

Use the pet's name and breed to generate a creative, cute, and funny diagnosis and a recommendation for the owner.

Examples:
- Name: Rex, Breed: Golden Retriever -> Diagnosis: "Chronic tail-wagging syndrome.", Recommendation: "Prescribe daily fetch sessions and extra ear scratches."
- Name: Luna, Breed: Siamese Cat -> Diagnosis: "Suffers from an extreme case of elegance.", Recommendation: "Immediate treatment with sunbathing and naps is required."

Pet Details:
- Name: {{{petName}}}
- Breed: {{{petBreed}}}
- Photo: {{media url=petImageUrl}}

Generate the diagnosis. The pet must always be healthy (isHealthy: true). Be creative and make the owner smile.
`,
});

const diagnosePetFlow = ai.defineFlow(
  {
    name: 'diagnosePetFlow',
    inputSchema: DiagnosePetInputSchema,
    outputSchema: DiagnosePetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
