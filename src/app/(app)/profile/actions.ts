
"use server"

import { z } from "zod"
import { i18n } from "@/lib/i18n"

export const profileFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  block: z.string().length(1, { message: "Block must be a single letter." }).regex(/^[A-Z]$/i, "Block must be a single letter."),
  number: z.string().min(1, { message: "Number is required." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  photo: z.string().optional(),
  familyMembers: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})

export type UpdateProfileOutput = {
  success: boolean;
  message: string;
}

export async function updateUserProfile(
  input: z.infer<typeof profileFormSchema>
): Promise<UpdateProfileOutput> {
  const validation = profileFormSchema.safeParse(input)
  if (!validation.success) {
    console.error("Invalid input:", validation.error.flatten().fieldErrors);
    throw new Error("Invalid input")
  }

  // In a real application, you would save this to a database (e.g., Firestore)
  // and update Firebase Auth profile for photoURL and displayName if needed.
  console.log("Updating user profile with new data:", validation.data)
  
  // For this prototype, we'll just return a success message.
  const { t } = i18n('id'); // Or get from user session
  return {
    success: true,
    message: t('profile.toast.success.description'),
  }
}
