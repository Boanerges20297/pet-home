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
  prompt: `You are an AI assistant helping a user fill out an adoption form.

  Your goal is to guide the user through the form by asking relevant questions and providing helpful suggestions.

  Here's the user's input: {{{userInput}}}
  Here's the current state of the form: {{{formState}}}

  Based on the user's input and the current form state, determine the next question to ask the user.
  If the form is complete, provide a confirmation message and set isFormComplete to true.
  Always return updatedFormState, populating with the user's repsonse.

  Consider these factors when determining the next question:
  - Ask questions in a logical order, starting with basic information (e.g., name, contact information) and then moving on to more specific questions (e.g., pet preferences, living situation).
  - If the user has already provided some information, avoid asking for it again.
  - If the user expresses interest in a particular pet, ask questions related to that pet's needs.
  - Infer when it would be most relevant to mention specific details based on user input and form state.
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
