"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Camera, Trash2 } from "lucide-react"

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
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"

export const adFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce.number().min(0),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  image: z.string().optional(),
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
  const { toast } = useToast()

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    if (isOpen) {
      if (ad) {
        form.reset({
          title: ad.title,
          description: ad.description,
          price: ad.price,
          phone: ad.phone,
          image: ad.image,
        })
        if (ad.image && !ad.image.startsWith('https://placehold.co')) {
          setCapturedImage(ad.image)
        } else {
          setCapturedImage(null)
        }
      } else {
        form.reset({
          title: "",
          description: "",
          price: 0,
          phone: "",
          image: "",
        })
        setCapturedImage(null)
      }
    }
  }, [ad, form, isOpen])

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isOpen) {
      const getCameraPermission = async () => {
        if (typeof window !== 'undefined' && navigator.mediaDevices) {
          try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setHasCameraPermission(true);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
              variant: 'destructive',
              title: t('classifiedsManagement.camera.toast.deniedTitle'),
              description: t('classifiedsManagement.camera.toast.deniedDescription'),
            });
          }
        } else {
          setHasCameraPermission(false);
        }
      };
      getCameraPermission();
    }
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [isOpen, t, toast]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUri);
        form.setValue('image', dataUri, { shouldValidate: true });
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    form.setValue('image', undefined, { shouldValidate: true });
  };


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
                  <FormLabel>{t('classifiedsManagement.form.addPhoto')}</FormLabel>
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center gap-4 p-4">
                       <div className="w-full aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center relative">
                          {capturedImage ? (
                            <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                          ) : (
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                          )}
                        </div>

                        {hasCameraPermission === false && (
                          <Alert variant="destructive">
                            <AlertTitle>{t('classifiedsManagement.camera.accessRequired')}</AlertTitle>
                            <AlertDescription>
                              {t('classifiedsManagement.camera.permissionDenied')}
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="flex gap-2">
                          {capturedImage ? (
                            <Button type="button" variant="outline" onClick={handleRetake}>
                               <Trash2 className="mr-2 h-4 w-4" />
                              {t('classifiedsManagement.form.retakePicture')}
                            </Button>
                          ) : (
                            <Button type="button" onClick={handleCapture} disabled={!hasCameraPermission}>
                              <Camera className="mr-2 h-4 w-4" />
                              {t('classifiedsManagement.form.takePicture')}
                            </Button>
                          )}
                        </div>
                        <canvas ref={canvasRef} className="hidden"></canvas>
                    </CardContent>
                  </Card>
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
