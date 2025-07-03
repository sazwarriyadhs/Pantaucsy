
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, firebaseReady } from "@/lib/firebase"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useI18n } from "@/context/i18n-provider"
import { Loader2 } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useI18n()
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    if (!firebaseReady) {
      toast({
        variant: "destructive",
        title: "Error",
        description: t('auth.error.not_configured'),
      });
      setIsLoading(false)
      return
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth!, values.email, values.password)
      await updateProfile(userCredential.user, {
        displayName: values.name,
      });

      // In a real-world scenario, you would trigger a server-side function here
      // to set a custom claim for the user's role (e.g., 'warga').
      
      toast({
        title: "Success",
        description: t('auth.success.register'),
      });
      router.push('/login');

    } catch (error: any) {
      console.error("Registration error:", error)
      let description = t('auth.error.register');

      if (error.code === 'auth/invalid-api-key' || error.code === 'auth/api-key-not-valid') {
        description = t('auth.error.invalid_api_key');
      }

      toast({
        variant: "destructive",
        title: "Error",
        description: description,
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const firebaseNotConfigured = !firebaseReady;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{t('auth.register.title')}</CardTitle>
        <CardDescription>{t('auth.register.description')}</CardDescription>
        {firebaseNotConfigured && (
            <CardDescription className="text-destructive pt-2">
                {t('auth.error.not_configured')}
            </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.register.nameLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} disabled={firebaseNotConfigured}/>
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
                  <FormLabel>{t('auth.register.emailLabel')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@example.com" {...field} disabled={firebaseNotConfigured}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.register.passwordLabel')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={firebaseNotConfigured}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading || firebaseNotConfigured}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('auth.register.button')}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm">
        <p className="text-muted-foreground">
          {t('auth.register.haveAccount')}{" "}
          <Link href="/login" className={cn("font-medium text-primary hover:underline", firebaseNotConfigured && "pointer-events-none opacity-50")}>
            {t('auth.register.login')}
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
