"use server"

import { z } from "zod"
import { summarizeIssueReport, type SummarizeIssueReportOutput as FlowOutput } from "@/ai/flows/summarize-issue-report"

const formSchema = z.object({
  reportText: z.string().min(10),
  photoDataUri: z.string().optional(),
})

// Re-export the type for use in the client component
export type SummarizeIssueReportOutput = FlowOutput

export async function handleReportIssue(
  input: z.infer<typeof formSchema>
): Promise<SummarizeIssueReportOutput> {
  const validation = formSchema.safeParse(input)
  if (!validation.success) {
    throw new Error("Invalid input")
  }

  try {
    const summary = await summarizeIssueReport(validation.data)
    return summary
  } catch (error) {
    console.error("Error summarizing issue report:", error)
    throw new Error("Failed to summarize issue report.")
  }
}
