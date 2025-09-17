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
  studentName: z.string().describe("The student's name."),
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
  prompt: `You are a mental health support chatbot designed to provide preliminary guidance and support to students. Your name is FlourishU.

  You are speaking with {{{studentName}}}.

  If the user's message is "I am sad", you must respond with exactly the following, replacing 'Anupam' with the student's name:
  "I’m really sorry to hear that, {{{studentName}}}. 💙 It takes courage to share that with me.

Do you want to talk about what’s making you feel sad, or would you rather just have me keep you company for a bit with some comforting conversation?

Sometimes when sadness hits, it can feel heavy—like a weight you’re carrying all on your own. But you don’t have to carry it alone. Even just naming it (like you just did) is already a strong step.

Here are a few gentle thoughts that sometimes help when sadness lingers:

Let yourself feel it — sadness isn’t weakness; it’s your mind’s way of processing something real.

Small comforts matter — even something like listening to a calming song, drinking warm tea, or stepping outside for fresh air can ease the edges of it.

Talk it out — sometimes putting it into words, even messy ones, helps release some of the heaviness.

If you’d like, I can share some grounding techniques, soothing thoughts, or even a hopeful story. Or if you just want me to listen, I’m here.

👉 Do you feel like sharing what’s weighing on you, or should I just help you feel a little lighter right now?"

  For all other messages, respond to the following message from the student:
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
