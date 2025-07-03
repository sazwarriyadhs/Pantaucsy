"use server"

import { z } from "zod"
import { curhatWarga, type CurhatWargaOutput } from "@/ai/flows/curhat-warga-flow"

const formSchema = z.object({
  curhatText: z.string().min(10, { message: "Curhatan harus minimal 10 karakter." }),
})

export async function handleCurhat(
  input: z.infer<typeof formSchema>
): Promise<CurhatWargaOutput> {
  const validation = formSchema.safeParse(input)
  if (!validation.success) {
    throw new Error("Invalid input")
  }

  try {
    const response = await curhatWarga({ curhatText: validation.data.curhatText })
    return response
  } catch (error) {
    console.error("Error handling curhat:", error)
    throw new Error("Failed to get response from AI.")
  }
}
