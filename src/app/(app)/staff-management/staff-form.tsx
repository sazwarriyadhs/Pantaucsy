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
import type { Staff } from "@/lib/data"
import { useI18n } from "@/context/i18n-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const staffFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  role: z.enum(['security', 'gardener'], { required_error: "Role is required." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  photo: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  salary: z.coerce.number().min(0, { message: "Salary must be a positive number." }),
  performanceSummary: z.string().min(10, { message: "Performance summary must be at least 10 characters." }),
})

type StaffFormValues = z.infer<typeof staffFormSchema>

interface StaffFormProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSubmit: (data: StaffFormValues) => void
  staff: Omit<Staff, "id"> | null
}

export function StaffForm({ isOpen, onOpenChange, onSubmit, staff }: StaffFormProps) {
  const { t } = useI18n()
  
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      name: "",
      role: "security",
      phone: "",
      photo: "",
      salary: 0,
      performanceSummary: "",
    },
  })

  useEffect(() => {
    if (isOpen) {
      if (staff) {
        form.reset(staff)
      } else {
        form.reset({
          name: "",
          role: "security",
          phone: "",
          photo: "",
          salary: 0,
          performanceSummary: "",
        })
      }
    }
  }, [staff, form, isOpen])

  const title = staff ? t('staffManagement.form.editTitle') : t('staffManagement.form.addTitle')
  const description = staff ? t('staffManagement.form.editDescription') : t('staffManagement.form.addDescription')
  const submitText = staff ? t('staffManagement.form.submitEdit') : t('staffManagement.form.submitAdd')

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
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
                  <FormLabel>{t('staffManagement.form.name')}</FormLabel>
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('staffManagement.form.role')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('staffManagement.form.rolePlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="security">{t('staffManagement.roles.security')}</SelectItem>
                        <SelectItem value="gardener">{t('staffManagement.roles.gardener')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('staffManagement.form.phone')}</FormLabel>
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
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('staffManagement.form.salary')}</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('staffManagement.form.photo')}</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/400x400.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="performanceSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('staffManagement.form.performanceSummary')}</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[120px]" {...field} />
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
