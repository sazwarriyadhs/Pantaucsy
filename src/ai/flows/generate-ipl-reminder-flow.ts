'use server';
/**
 * @fileOverview An AI agent that generates funny and engaging IPL payment reminders.
 *
 * - generateIplReminder - A function that generates a creative reminder message.
 * - GenerateIplReminderOutput - The return type for the generateIplReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIplReminderOutputSchema = z.object({
  reminderText: z.string().describe('A funny, engaging, and clear reminder text about paying monthly IPL dues.'),
});
export type GenerateIplReminderOutput = z.infer<typeof GenerateIplReminderOutputSchema>;

export async function generateIplReminder(): Promise<GenerateIplReminderOutput> {
  return generateIplReminderFlow();
}

const prompt = ai.definePrompt({
  name: 'generateIplReminderPrompt',
  output: {schema: GenerateIplReminderOutputSchema},
  prompt: `You are the friendly and slightly quirky admin of the "Cimahpar Stoneyard" neighborhood association.
  Your task is to create ONE short, funny, engaging, and friendly reminder for residents to pay their monthly IPL (Iuran Pemeliharaan Lingkungan) dues.
  The message should be in Indonesian.
  Make it clear that it's about the monthly dues, but do it with humor and charm. Avoid being nagging or threatening.
  Think like a friendly neighbor who uses humor to get things done.

  Here are some examples of the tone you should aim for:
  - "Dompet Anda terasa ringan? Mungkin belum bayar IPL! Yuk, ringankan beban bersama, bayar iuran bulan ini! 💸"
  - "Perhatian warga! Keamanan butuh kopi, taman butuh pupuk. Bantu mereka dengan membayar IPL Anda tepat waktu. Semangat!"
  - "Jangan biarkan rumput tetangga lebih hijau karena lampu jalan Anda padam! Bayar IPL, nyalakan kebersamaan kita. ✨"
  - "Bayar IPL bulan ini dan dapatkan... ucapan terima kasih tulus dari kami! Plus, lingkungan yang bersih dan aman. Promo terbatas!"

  Now, generate a new, original, and funny reminder message.
  `,
});

const generateIplReminderFlow = ai.defineFlow(
  {
    name: 'generateIplReminderFlow',
    outputSchema: GenerateIplReminderOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
