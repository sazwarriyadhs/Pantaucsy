
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Vehicle } from "@/lib/data"
import { residents } from "@/lib/data"
import { useI18n } from "@/context/i18n-provider"

export const vehicleFormSchema = z.object({
  residentName: z.string().min(1, { message: "Resident is required." }),
  type: z.enum(['car', 'motorcycle'], { required_error: "Vehicle type is required." }),
  brand: z.string().min(2, { message: "Brand must be at least 2 characters." }),
  model: z.string().min(1, { message: "Model is required." }),
  color: z.string().min(2, { message: "Color must be at least 2 characters." }),
  licensePlate: z.string().min(3, { message: "License plate is required." }),
})

type VehicleFormValues = z.infer<typeof vehicleFormSchema>

interface VehicleFormProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSubmit: (data: VehicleFormValues) => void
  vehicle: Omit<Vehicle, "id"> | null
}

export function VehicleForm({ isOpen, onOpenChange, onSubmit, vehicle }: VehicleFormProps) {
  const { t } = useI18n()
  
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      residentName: "",
      type: "car",
      brand: "",
      model: "",
      color: "",
      licensePlate: "",
    },
  })

  useEffect(() => {
    if (isOpen) {
      if (vehicle) {
        form.reset(vehicle)
      } else {
        form.reset({
          residentName: "",
          type: "car",
          brand: "",
          model: "",
          color: "",
          licensePlate: "",
        })
      }
    }
  }, [vehicle, form, isOpen])

  const dialogTitle = vehicle ? t('vehicleManagement.form.editTitle') : t('vehicleManagement.form.addTitle')
  const dialogDescription = vehicle ? t('vehicleManagement.form.editDescription') : t('vehicleManagement.form.addDescription')
  const submitText = vehicle ? t('vehicleManagement.form.submitEdit') : t('vehicleManagement.form.submitAdd')

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="residentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('vehicleManagement.form.resident')}</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('vehicleManagement.form.residentPlaceholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {residents.map(r => (
                        <SelectItem key={r.email} value={r.name}>{r.name} ({r.address})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{t('vehicleManagement.form.type')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-x-6"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="car" /></FormControl>
                        <FormLabel className="font-normal">{t('vehicleManagement.types.car')}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="motorcycle" /></FormControl>
                        <FormLabel className="font-normal">{t('vehicleManagement.types.motorcycle')}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('vehicleManagement.form.brand')}</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('vehicleManagement.form.model')}</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('vehicleManagement.form.color')}</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="licensePlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('vehicleManagement.form.licensePlate')}</FormLabel>
                  <FormControl><Input {...field} className="uppercase" /></FormControl>
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
