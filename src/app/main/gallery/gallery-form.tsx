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
import type { GalleryItem } from "@/lib/data"
import { useI18n } from "@/context/i18n-provider"

export const galleryFormSchema = z.object({
  titleKey: z.string().min(3, { message: "Title key must be at least 3 characters." }),
  image: z.string().url({ message: "Please enter a valid URL." }),
  imageHint: z.string().min(2, { message: "Image hint must be at least 2 characters." }),
})

type GalleryFormValues = z.infer<typeof galleryFormSchema>

interface GalleryFormProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSubmit: (data: GalleryFormValues) => void
  photo: Omit<GalleryItem, "id"> | null
}

export function GalleryForm({ isOpen, onOpenChange, onSubmit, photo }: GalleryFormProps) {
  const { t } = useI18n()
  
  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      titleKey: "",
      image: "",
      imageHint: "",
    },
  })

  useEffect(() => {
    if (isOpen) {
      if (photo) {
        form.reset(photo)
      } else {
        form.reset({
          titleKey: "",
          image: "https://placehold.co/600x400.png",
          imageHint: "",
        })
      }
    }
  }, [photo, form, isOpen])

  const title = photo ? t('gallery.form.editTitle') : t('gallery.form.addTitle')
  const description = photo ? t('gallery.form.editDescription') : t('gallery.form.addDescription')
  const submitText = photo ? t('gallery.form.submitEdit') : t('gallery.form.submitAdd')

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
              name="titleKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('gallery.form.titleKey')}</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., independence_day_24" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('gallery.form.image')}</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/600x400.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="imageHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('gallery.form.imageHint')}</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., community celebration" {...field} />
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
