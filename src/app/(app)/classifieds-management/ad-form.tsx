
"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Camera, Trash2, Upload } from "lucide-react"

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  type ImageMode = "idle" | "camera";
  const [imageMode, setImageMode] = useState<ImageMode>("idle");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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
        const adTitle = t(`classifieds.items.${ad.titleKey}.title`);
        const adDescription = t(`classifieds.items.${ad.titleKey}.description`);
        form.reset({
          title: adTitle,
          description: adDescription,
          price: ad.price,
          phone: ad.phone,
          image: ad.image,
        })
        if (ad.image && !ad.image.startsWith('https://placehold.co')) {
          setImagePreview(ad.image)
        } else {
          setImagePreview(null)
        }
      } else {
        form.reset({
          title: "",
          description: "",
          price: 0,
          phone: "",
          image: "",
        })
        setImagePreview(null)
      }
      setImageMode("idle");
    }
  }, [ad, form, isOpen, t])

  useEffect(() => {
    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error: any) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        
        let title = t('classifiedsManagement.camera.toast.deniedTitle');
        let description = t('classifiedsManagement.camera.toast.deniedDescription');

        if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          title = t('classifiedsManagement.camera.toast.notFoundTitle');
          description = t('classifiedsManagement.camera.toast.notFoundDescription');
        }

        toast({
          variant: 'destructive',
          title: title,
          description: description,
        });
        setImageMode('idle');
      }
    };

    const disableStream = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };

    if (imageMode === 'camera' && isOpen) {
      enableStream();
    } else {
      disableStream();
    }

    return () => {
      disableStream();
    };
  }, [imageMode, isOpen, t, toast]);

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
        setImagePreview(dataUri);
        form.setValue('image', dataUri, { shouldValidate: true });
        setImageMode('idle');
      }
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImagePreview(dataUri);
        form.setValue('image', dataUri, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    form.setValue('image', undefined, { shouldValidate: true });
    setImageMode('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
                  <FormLabel>{t('classifiedsManagement.form.adPhoto')}</FormLabel>
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center gap-4 p-4">
                       <div className="w-full aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center relative">
                          {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                          ) : imageMode === 'camera' ? (
                            <>
                              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                              {hasCameraPermission === false && (
                                <div className="absolute flex flex-col items-center text-muted-foreground">
                                   <Camera className="h-12 w-12" />
                                   <p>{t('classifiedsManagement.form.noImagePlaceholder')}</p>
                                </div>
                              )}
                            </>
                          ) : (
                             <div className="flex flex-col items-center p-4 text-center text-muted-foreground">
                               <Upload className="w-12 h-12 mb-2" />
                               <p>{t('classifiedsManagement.form.uploadOrCapture')}</p>
                             </div>
                          )}
                        </div>

                        {hasCameraPermission === false && imageMode === 'camera' && (
                          <Alert variant="destructive">
                            <AlertTitle>{t('classifiedsManagement.camera.accessRequired')}</AlertTitle>
                            <AlertDescription>
                              {t('classifiedsManagement.camera.permissionDenied')}
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="flex gap-2">
                          {imagePreview ? (
                            <Button type="button" variant="outline" onClick={handleRemoveImage}>
                               <Trash2 className="mr-2 h-4 w-4" />
                              {t('classifiedsManagement.form.removePicture')}
                            </Button>
                          ) : imageMode === 'camera' ? (
                            <>
                              <Button type="button" onClick={handleCapture} disabled={hasCameraPermission === false}>
                                <Camera className="mr-2 h-4 w-4" />
                                {t('classifiedsManagement.form.capture')}
                              </Button>
                              <Button type="button" variant="secondary" onClick={() => setImageMode('idle')}>
                                {t('classifiedsManagement.form.cancel')}
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button type="button" onClick={() => setImageMode('camera')}>
                                <Camera className="mr-2 h-4 w-4" />
                                {t('classifiedsManagement.form.takePicture')}
                              </Button>
                              <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()}>
                                <Upload className="mr-2 h-4 w-4" />
                                {t('classifiedsManagement.form.uploadFile')}
                              </Button>
                            </>
                          )}
                        </div>
                        <canvas ref={canvasRef} className="hidden"></canvas>
                        <Input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleFileChange}
                        />
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
