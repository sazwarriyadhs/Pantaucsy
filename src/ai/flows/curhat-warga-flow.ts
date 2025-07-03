'use server';
/**
 * @fileOverview An AI agent that provides empathetic responses to resident vents.
 *
 * - curhatWarga - A function that handles the resident's message.
 * - CurhatWargaInput - The input type for the curhatWarga function.
 * - CurhatWargaOutput - The return type for the curhatWarga function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CurhatWargaInputSchema = z.object({
  curhatText: z.string().describe('The text content of the resident\'s vent.'),
});
export type CurhatWargaInput = z.infer<typeof CurhatWargaInputSchema>;

const CurhatWargaOutputSchema = z.object({
  response: z.string().describe('A supportive and empathetic response.'),
});
export type CurhatWargaOutput = z.infer<typeof CurhatWargaOutputSchema>;

export async function curhatWarga(input: CurhatWargaInput): Promise<CurhatWargaOutput> {
  return curhatWargaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'curhatWargaPrompt',
  input: {schema: CurhatWargaInputSchema},
  output: {schema: CurhatWargaOutputSchema},
  prompt: `Anda adalah teman curhat AI yang bijak dan suportif dari paguyuban warga "Cimahpar Stoneyard".
  Peran Anda adalah mendengarkan curhatan warga dengan empati dan memberikan tanggapan yang menenangkan, membesarkan hati, dan positif.
  Anda BUKAN terapis atau profesional kesehatan mental, jadi JANGAN memberikan nasihat medis, diagnosis, atau solusi profesional.
  Fokuslah untuk membuat warga merasa didengar, dipahami, dan tidak sendirian.
  Gunakan bahasa yang hangat, ramah, dan seperti tetangga yang baik hati.

  Curhatan Warga:
  {{curhatText}}
  `,
});

const curhatWargaFlow = ai.defineFlow(
  {
    name: 'curhatWargaFlow',
    inputSchema: CurhatWargaInputSchema,
    outputSchema: CurhatWargaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
