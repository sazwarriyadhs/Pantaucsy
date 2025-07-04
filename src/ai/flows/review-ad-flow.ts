'use server';
/**
 * @fileOverview An AI agent that reviews classified ads for appropriateness and quality.
 *
 * - reviewAd - A function that handles the ad review process.
 * - ReviewAdInput - The input type for the reviewAd function.
 * - ReviewAdOutput - The return type for the reviewAd function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ReviewAdInputSchema = z.object({
  title: z.string().describe('The original title of the ad.'),
  description: z.string().describe('The original description of the ad.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo for the ad, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ReviewAdInput = z.infer<typeof ReviewAdInputSchema>;

export const ReviewAdOutputSchema = z.object({
  reviewStatus: z
    .enum(['approved', 'rejected'])
    .describe(
      "The overall assessment of the ad. 'approved' if it's acceptable, 'rejected' if it violates policies."
    ),
  rejectionReason: z
    .string()
    .optional()
    .describe('A brief, clear reason for the rejection if reviewStatus is "rejected".'),
  suggestedTitle: z.string().describe('An improved, clear, and concise title for the ad.'),
  suggestedDescription: z
    .string()
    .describe('An improved, clear, and concise description for the ad.'),
  suggestedCategory: z
    .enum(['electronics', 'furniture', 'vehicles', 'clothing', 'household', 'services', 'other'])
    .describe('The most relevant category for the ad item.'),
});
export type ReviewAdOutput = z.infer<typeof ReviewAdOutputSchema>;

export async function reviewAd(input: ReviewAdInput): Promise<ReviewAdOutput> {
  return reviewAdFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reviewAdPrompt',
  input: {schema: ReviewAdInputSchema},
  output: {schema: ReviewAdOutputSchema},
  prompt: `You are a content moderator for a family-friendly community marketplace. Your task is to review a new classified ad submitted by a resident.

Your review has two parts:
1.  **Safety & Policy Check:** Determine if the ad is appropriate. Reject ads that are for illegal items, services, weapons, alcohol, tobacco, or anything not suitable for a general audience. If you reject it, provide a brief, polite reason.
2.  **Quality Improvement:** If the ad is acceptable, improve its quality. Create a clear, concise, and appealing title and description. Suggest the best category for the item.

Analyze the following ad:
Original Title: {{{title}}}
Original Description: {{{description}}}

{{#if photoDataUri}}
Photo:
{{media url=photoDataUri}}
{{/if}}

Based on your analysis, provide your full review in the required JSON format.
`,
});

const reviewAdFlow = ai.defineFlow(
  {
    name: 'reviewAdFlow',
    inputSchema: ReviewAdInputSchema,
    outputSchema: ReviewAdOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
