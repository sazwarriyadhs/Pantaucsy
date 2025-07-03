"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { handleReportIssue } from "./actions"
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
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Wand2 } from "lucide-react"
import { useI18n } from "@/context/i18n-provider"

export default function ReportIssuePage() {
  const { t } = useI18n()
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const formSchema = z.object({
    reportText: z.string().min(10, {
      message: t('reportIssue.form.validation'),
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportText: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setSummary("")
    try {
      const result = await handleReportIssue(values)
      if (result.summary) {
        setSummary(result.summary)
        toast({
          title: t('reportIssue.toast.success.title'),
          description: t('reportIssue.toast.success.description'),
        })
      } else {
        throw new Error("Failed to get summary.")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('reportIssue.toast.error.title'),
        description: t('reportIssue.toast.error.description'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('reportIssue.title')}</h1>
        <p className="text-muted-foreground">
          {t('reportIssue.description')}
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('reportIssue.form.title')}</CardTitle>
            <CardDescription>
              {t('reportIssue.form.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="reportText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('reportIssue.form.label')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('reportIssue.form.placeholder')}
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t('reportIssue.form.description2')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('reportIssue.form.submitting')}
                    </>
                  ) : (
                    t('reportIssue.form.submit')
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {(isLoading || summary) && (
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="text-primary" /> {t('reportIssue.summary.title')}
              </CardTitle>
              <CardDescription>
                {t('reportIssue.summary.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p>{t('reportIssue.summary.loading')}</p>
                </div>
              ) : (
                <p className="text-sm p-4 bg-secondary rounded-lg">{summary}</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
