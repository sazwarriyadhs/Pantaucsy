
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/context/i18n-provider"
import { residents } from "@/lib/data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/context/auth-provider"

export default function PaymentConfirmationPage() {
  const { t } = useI18n()
  const { toast } = useToast()
  const { user, role } = useAuth()
  
  const paymentFormSchema = z.object({
    residentEmail: z.string().email({ message: t('finance.confirmation.form.residentEmail.required') }),
    paymentMethod: z.enum(['transfer', 'cash'], {
      required_error: t('finance.confirmation.form.paymentMethod.required'),
    }),
    paymentMonth: z.string().min(1, { message: t('finance.confirmation.form.paymentMonth.required') }),
    paymentDate: z.date({ required_error: t('finance.confirmation.form.paymentDate.required') }),
    amount: z.coerce.number().min(1, { message: t('finance.confirmation.form.amount.required') }),
    proof: z.any().optional(),
    notes: z.string().optional(),
  }).refine((data) => {
    if (data.paymentMethod === 'transfer') {
      return data.proof && data.proof.length === 1;
    }
    return true;
  }, {
    message: t('finance.confirmation.form.proof.requiredTransfer'),
    path: ['proof'],
  });
  
  const form = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: 'transfer',
      residentEmail: '',
    }
  })

  useEffect(() => {
    if (role === 'warga' && user?.email) {
      form.setValue('residentEmail', user.email);
    }
  }, [role, user, form]);

  const paymentMethod = form.watch('paymentMethod');

  const onSubmit = (data: z.infer<typeof paymentFormSchema>) => {
    console.log(data)
    toast({
      title: t('finance.confirmation.toast.title'),
      description: t('finance.confirmation.toast.description'),
    })
    form.reset({
      paymentMethod: 'transfer',
      residentEmail: role === 'warga' ? user?.email : '',
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ description: t('finance.confirmation.copied') })
  }

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i).toLocaleString(t('locale'), { month: 'long' })
    return month.charAt(0).toUpperCase() + month.slice(1)
  })

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('finance.confirmation.title')}</h1>
        <p className="text-muted-foreground">{t('finance.confirmation.description')}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('finance.confirmation.form.title')}</CardTitle>
            <CardDescription>{t('finance.confirmation.form.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="residentEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('residents.name')}</FormLabel>
                      {role === 'warga' && user ? (
                        <FormControl>
                          <Input
                            readOnly
                            value={`${user.displayName || ''} (${user.email || ''})`}
                            className="bg-muted cursor-not-allowed"
                          />
                        </FormControl>
                      ) : (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('finance.confirmation.form.residentEmail.placeholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {residents.map(r => <SelectItem key={r.email} value={r.email}>{r.name} - {r.address}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{t('finance.confirmation.form.paymentMethod.label')}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center gap-x-6"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="transfer" />
                            </FormControl>
                            <FormLabel className="font-normal">{t('finance.confirmation.form.paymentMethod.transfer')}</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="cash" />
                            </FormControl>
                            <FormLabel className="font-normal">{t('finance.confirmation.form.paymentMethod.cash')}</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="paymentMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('finance.confirmation.form.paymentMonth.label')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('finance.confirmation.form.paymentMonth.placeholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="paymentDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>{t('finance.confirmation.form.paymentDate.label')}</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>{t('finance.confirmation.form.paymentDate.placeholder')}</span>
                                )}
                                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("2020-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('finance.confirmation.form.amount.label')}</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="125000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="proof"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>{t('finance.confirmation.form.proof.label')}</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*,.pdf" onChange={(e) => onChange(e.target.files)} {...field} />
                      </FormControl>
                      <FormDescription>
                        {paymentMethod === 'transfer' ? 
                          t('finance.confirmation.form.proof.description') :
                          t('finance.confirmation.form.proof.cashDescription')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('finance.confirmation.form.notes.label')}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={t('finance.confirmation.form.notes.placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">{t('finance.confirmation.form.submit')}</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {paymentMethod === 'transfer' && (
          <Card>
            <CardHeader>
              <CardTitle>{t('finance.confirmation.paymentInfo.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="font-semibold text-muted-foreground">BCA</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">123-456-7890</p>
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard('1234567890')}>
                    <ClipboardDocumentIcon className="w-4 h-4"/>
                  </Button>
                </div>
                <p className="text-sm">a/n Paguyuban Warga Cimahpar</p>
              </div>
               <div className="p-4 rounded-lg bg-muted">
                <p className="font-semibold text-muted-foreground">Mandiri</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">098-765-4321</p>
                   <Button variant="ghost" size="icon" onClick={() => copyToClipboard('0987654321')}>
                    <ClipboardDocumentIcon className="w-4 h-4"/>
                  </Button>
                </div>
                <p className="text-sm">a/n Paguyuban Warga Cimahpar</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
