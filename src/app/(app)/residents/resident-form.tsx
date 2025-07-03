"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Resident } from "@/lib/data"
import { useI18n } from "@/context/i18n-provider"

export const residentFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  block: z.string().length(1, { message: "Block must be a single letter." }).regex(/^[A-Z]$/i, "Block must be a single letter."),
  number: z.string().min(1, { message: "Number is required." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  email: z.string().email({ message: "Invalid email address." }),
})

type ResidentFormValues = z.infer<typeof residentFormSchema>

interface ResidentFormProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSubmit: (data: ResidentFormValues) => void
  resident: Resident | null
}

export function ResidentForm({ isOpen, onOpenChange, onSubmit, resident }: ResidentFormProps) {
  const { t } = useI18n()
  
  const form = useForm<ResidentFormValues>({
    resolver: zodResolver(residentFormSchema),
    defaultValues: {
      name: "",
      block: "",
      number: "",
      phone: "",
      email: "",
    },
  })

  useEffect(() => {
    if (isOpen && resident) {
      const [blockPart, numberPart] = resident.address.split(" No. ")
      const block = blockPart.replace("Blok ", "")
      form.reset({
        name: resident.name,
        block: block,
        number: numberPart,
        phone: resident.phone,
        email: resident.email,
      })
    } else if (isOpen) {
      form.reset({
        name: "",
        block: "",
        number: "",
        phone: "",
        email: "",
      })
    }
  }, [resident, form, isOpen])

  const title = resident ? t('residents.form.editTitle') : t('residents.form.addTitle')
  const description = resident ? t('residents.form.editDescription') : t('residents.form.addDescription')
  const submitText = resident ? t('residents.form.submitEdit') : t('residents.form.submitAdd')

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('residents.form.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="block"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('residents.form.block')}</FormLabel>
                    <FormControl>
                      <Input placeholder="A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('residents.form.number')}</FormLabel>
                    <FormControl>
                      <Input placeholder="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('residents.form.phone')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('residents.form.email')}</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} readOnly={!!resident} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{submitText}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
