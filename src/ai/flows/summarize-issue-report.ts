'use server';

/**
 * @fileOverview Summarizes and categorizes issue reports to assist in routing.
 *
 * - summarizeIssueReport - A function that summarizes and categorizes the content of an issue report.
 * - SummarizeIssueReportInput - The input type for the summarizeIssueReport function.
 * - SummarizeIssueReportOutput - The return type for the summarizeIssueReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIssueReportInputSchema = z.object({
  reportText: z.string().describe('The text content of the issue report.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo of the issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizeIssueReportInput = z.infer<typeof SummarizeIssueReportInputSchema>;

const SummarizeIssueReportOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the issue report.'),
  category: z.enum(['security', 'maintenance', 'waste', 'other']).describe("The category of the issue: 'security', 'maintenance', 'waste', or 'other'."),
});
export type SummarizeIssueReportOutput = z.infer<typeof SummarizeIssueReportOutputSchema>;

export async function summarizeIssueReport(input: SummarizeIssueReportInput): Promise<SummarizeIssueReportOutput> {
  return summarizeIssueReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeIssueReportPrompt',
  input: {schema: SummarizeIssueReportInputSchema},
  output: {schema: SummarizeIssueReportOutputSchema},
  prompt: `You are an AI assistant helping a community manager to quickly understand and categorize issue reports.
  1. Analyze the issue report text and any provided photo.
  2. Summarize the report concisely, highlighting the key problem.
  3. Categorize the report into one of the following categories: 'security', 'maintenance', 'waste', or 'other'.

  Issue Report:
  {{reportText}}
  
  {{#if photoDataUri}}
  Photo of the issue:
  {{media url=photoDataUri}}
  {{/if}}
  `,
});

const summarizeIssueReportFlow = ai.defineFlow(
  {
    name: 'summarizeIssueReportFlow',
    inputSchema: SummarizeIssueReportInputSchema,
    outputSchema: SummarizeIssueReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
