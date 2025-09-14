'use server';

/**
 * @fileOverview An AI-powered chatbot for mental health support.
 *
 * - mentalHealthChatbot - A function that handles the chatbot interaction.
 * - MentalHealthChatbotInput - The input type for the mentalHealthChatbot function.
 * - MentalHealthChatbotOutput - The return type for the mentalHealthChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MentalHealthChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
});
export type MentalHealthChatbotInput = z.infer<typeof MentalHealthChatbotInputSchema>;

const MentalHealthChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type MentalHealthChatbotOutput = z.infer<typeof MentalHealthChatbotOutputSchema>;

export async function mentalHealthChatbot(input: MentalHealthChatbotInput): Promise<MentalHealthChatbotOutput> {
  return mentalHealthChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mentalHealthChatbotPrompt',
  input: {schema: MentalHealthChatbotInputSchema},
  output: {schema: MentalHealthChatbotOutputSchema},
  prompt: `You are a mental health support chatbot designed to provide preliminary guidance and support to students.

  Respond to the following message from the student:
  {{{message}}}

  Please keep your responses concise and supportive. If the user indicates more serious issues such as suicidal thoughts, please suggest professional help and resources.`,
});

const mentalHealthChatbotFlow = ai.defineFlow(
  {
    name: 'mentalHealthChatbotFlow',
    inputSchema: MentalHealthChatbotInputSchema,
    outputSchema: MentalHealthChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
