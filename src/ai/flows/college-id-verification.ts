'use server';

/**
 * @fileOverview College ID verification flow.
 *
 * - verifyCollegeID - A function that verifies the college ID and extracts information.
 * - VerifyCollegeIDInput - The input type for the verifyCollegeID function.
 * - VerifyCollegeIDOutput - The return type for the verifyCollegeID function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyCollegeIDInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of the college ID, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'    ),
});
export type VerifyCollegeIDInput = z.infer<typeof VerifyCollegeIDInputSchema>;

const VerifyCollegeIDOutputSchema = z.object({
  isCollegeID: z.boolean().describe('Whether or not the uploaded document is a college ID.'),
  collegeName: z.string().describe('The name of the college.'),
  studentName: z.string().describe('The name of the student.'),
  expirationDate: z.string().describe('The expiration date of the ID.'),
});
export type VerifyCollegeIDOutput = z.infer<typeof VerifyCollegeIDOutputSchema>;

export async function verifyCollegeID(input: VerifyCollegeIDInput): Promise<VerifyCollegeIDOutput> {
  return verifyCollegeIDFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyCollegeIDPrompt',
  input: {schema: VerifyCollegeIDInputSchema},
  output: {schema: VerifyCollegeIDOutputSchema},
  prompt: `You are an expert at verifying college IDs.

You will use this information to extract information from the college ID, such as the college name, student name, and expiration date. You will also determine if the document is a college ID or not and set the isCollegeID output field appropriately.

Use the following as the primary source of information about the college ID.

Photo: {{media url=photoDataUri}}`,
});

const verifyCollegeIDFlow = ai.defineFlow(
  {
    name: 'verifyCollegeIDFlow',
    inputSchema: VerifyCollegeIDInputSchema,
    outputSchema: VerifyCollegeIDOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
