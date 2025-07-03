"use server"

import { z } from "zod"
import { summarizeIssueReport, type SummarizeIssueReportOutput } from "@/ai/flows/summarize-issue-report"

const formSchema = z.object({
  reportText: z.string().min(10),
})

export async function handleReportIssue(
  input: z.infer<typeof formSchema>
): Promise<SummarizeIssueReportOutput> {
  const validation = formSchema.safeParse(input)
  if (!validation.success) {
    throw new Error("Invalid input")
  }

  try {
    const summary = await summarizeIssueReport({ reportText: validation.data.reportText })
    return summary
  } catch (error) {
    console.error("Error summarizing issue report:", error)
    throw new Error("Failed to summarize issue report.")
  }
}
