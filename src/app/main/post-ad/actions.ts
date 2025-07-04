
"use server"

import { z } from "zod"
import { i18n } from "@/lib/i18n"

const postAdSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce.number().min(0),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  image: z.string().optional(),
})

export type PostAdOutput = {
  success: boolean;
  message: string;
}

export async function handlePostAd(
  input: z.infer<typeof postAdSchema>
): Promise<PostAdOutput> {
  const validation = postAdSchema.safeParse(input)
  if (!validation.success) {
    throw new Error("Invalid input")
  }

  // In a real application, you would save this to a database
  // with a 'pending_review' status and handle payment processing.
  console.log("New ad submitted for review:", validation.data)
  
  // For this prototype, we'll just return a success message.
  const { t } = i18n('id'); // Or get from user session
  return {
    success: true,
    message: t('postAd.toast.success.description'),
  }
}
