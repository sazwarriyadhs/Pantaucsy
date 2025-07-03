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
import { Textarea } from "@/components/ui/textarea"
import type { ClassifiedAd } from "@/lib/data"
import { useI18n } from "@/context/i18n-provider"

export const adFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce.number().min(0),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  image: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
})

type AdFormValues = z.infer<typeof adFormSchema>

interface AdFormProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSubmit: (data: AdFormValues) => void
  ad: Omit<ClassifiedAd, 'id' | 'status' | 'expiryDate' | 'imageHint' | 'titleKey'> | null
}

export function AdForm({ isOpen, onOpenChange, onSubmit, ad }: AdFormProps) {
  const { t } = useI18n()
  
  const form = useForm<AdFormValues>({
    resolver: zodResolver(adFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      phone: "",
      image: "",
    },
  })

  useEffect(() => {
    if (isOpen && ad) {
      form.reset({
        title: ad.title,
        description: ad.description,
        price: ad.price,
        phone: ad.phone,
        image: ad.image,
      })
    } else if (isOpen) {
      form.reset({
        title: "",
        description: "",
        price: 0,
        phone: "",
        image: "",
      })
    }
  }, [ad, form, isOpen])

  const title = ad ? t('classifiedsManagement.form.editTitle') : t('classifiedsManagement.form.addTitle')
  const description = ad ? t('classifiedsManagement.form.editDescription') : t('classifiedsManagement.form.addDescription')
  const submitText = ad ? t('classifiedsManagement.form.submitEdit') : t('classifiedsManagement.form.submitAdd')

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('classifiedsManagement.form.title')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('classifiedsManagement.form.description')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('classifiedsManagement.form.price')}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('classifiedsManagement.form.phone')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('classifiedsManagement.form.image')}</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/600x400.png" {...field} />
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
