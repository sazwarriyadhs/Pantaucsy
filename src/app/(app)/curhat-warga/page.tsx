
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { handleCurhat } from "./actions"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { LoaderCircle, Heart } from "lucide-react"
import { useI18n } from "@/context/i18n-provider"

export default function CurhatWargaPage() {
  const { t } = useI18n();
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  
  const formSchema = z.object({
    curhatText: z.string().min(10, {
      message: t('curhatWarga.form.validation'),
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      curhatText: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setResponse("")
    try {
      const result = await handleCurhat(values)
      if (result.response) {
        setResponse(result.response)
        toast({
          title: t('curhatWarga.toast.success.title'),
          description: t('curhatWarga.toast.success.description'),
        })
      } else {
        throw new Error("Failed to get response.")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('curhatWarga.toast.error.title'),
        description: t('curhatWarga.toast.error.description'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('curhatWarga.title')}</h1>
        <p className="text-muted-foreground">
          {t('curhatWarga.description')}
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('curhatWarga.form.title')}</CardTitle>
            <CardDescription>
              {t('curhatWarga.form.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="curhatText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('curhatWarga.form.label')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('curhatWarga.form.placeholder')}
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      {t('curhatWarga.form.submitting')}
                    </>
                  ) : (
                    t('curhatWarga.form.submit')
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {(isLoading || response) && (
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="text-primary" /> {t('curhatWarga.response.title')}
              </CardTitle>
              <CardDescription>
                {t('curhatWarga.response.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
                  <p>{t('curhatWarga.response.loading')}</p>
                </div>
              ) : (
                <p className="text-sm p-4 bg-secondary rounded-lg whitespace-pre-wrap">{response}</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
