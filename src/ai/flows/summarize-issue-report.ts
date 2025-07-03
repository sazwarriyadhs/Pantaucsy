'use server';

/**
 * @fileOverview Summarizes issue reports to assist in categorization and routing.
 *
 * - summarizeIssueReport - A function that summarizes the content of an issue report.
 * - SummarizeIssueReportInput - The input type for the summarizeIssueReport function.
 * - SummarizeIssueReportOutput - The return type for the summarizeIssueReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIssueReportInputSchema = z.object({
  reportText: z.string().describe('The text content of the issue report.'),
});
export type SummarizeIssueReportInput = z.infer<typeof SummarizeIssueReportInputSchema>;

const SummarizeIssueReportOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the issue report.'),
});
export type SummarizeIssueReportOutput = z.infer<typeof SummarizeIssueReportOutputSchema>;

export async function summarizeIssueReport(input: SummarizeIssueReportInput): Promise<SummarizeIssueReportOutput> {
  return summarizeIssueReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeIssueReportPrompt',
  input: {schema: SummarizeIssueReportInputSchema},
  output: {schema: SummarizeIssueReportOutputSchema},
  prompt: `You are an AI assistant helping security managers quickly understand issue reports.
  Summarize the following issue report in a concise manner, highlighting the key problem and any important details:

  Issue Report:
  {{reportText}}
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
