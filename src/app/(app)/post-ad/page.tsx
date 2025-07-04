
"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Camera, Trash2, Upload, Loader2, Info } from "lucide-react"
import { handlePostAd } from "./actions"

import { Button } from "@/components/ui/button"
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
import { useI18n } from "@/context/i18n-provider"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const postAdSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce.number().min(0),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  image: z.string().optional(),
})

type AdFormValues = z.infer<typeof postAdSchema>

export default function PostAdPage() {
  const { t, formatCurrency } = useI18n()
  const { toast } = useToast()
  
  const [isLoading, setIsLoading] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  type ImageMode = "idle" | "camera";
  const [imageMode, setImageMode] = useState<ImageMode>("idle");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const translatedSchema = postAdSchema.extend({
    title: z.string().min(3, { message: t('postAd.validation.title') }),
    description: z.string().min(10, { message: t('postAd.validation.description') }),
    price: z.coerce.number().min(0, { message: t('postAd.validation.price') }),
    phone: z.string().min(10, { message: t('postAd.validation.phone') }),
  });

  const form = useForm<AdFormValues>({
    resolver: zodResolver(translatedSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      phone: "",
      image: "",
    },
  })

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

    if (imageMode === 'camera') {
      enableStream();
    } else {
      disableStream();
    }

    return () => {
      disableStream();
    };
  }, [imageMode, t, toast]);

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

  async function onSubmit(values: AdFormValues) {
    setIsLoading(true);
    try {
      const result = await handlePostAd(values);
      if (result.success) {
        toast({
          title: t('postAd.toast.success.title'),
          description: t('postAd.toast.success.description'),
        })
        form.reset({
          title: "",
          description: "",
          price: 0,
          phone: "",
          image: "",
        });
        handleRemoveImage();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('postAd.toast.error.title'),
        description: t('postAd.toast.error.description'),
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('postAd.title')}</h1>
        <p className="text-muted-foreground">{t('postAd.description')}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('postAd.form.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            <Input placeholder="628123456789" {...field} />
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
                            <div className="w-full bg-muted rounded-md overflow-hidden flex items-center justify-center relative aspect-video">
                                {imagePreview ? (
                                  <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                                ) : imageMode === 'camera' ? (
                                  <>
                                    <video ref={videoRef} className="object-cover w-full h-full" autoPlay muted playsInline />
                                    {hasCameraPermission === false && (
                                      <div className="absolute flex flex-col items-center text-muted-foreground">
                                        <Camera className="w-12 h-12" />
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
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    {t('classifiedsManagement.form.removePicture')}
                                  </Button>
                                ) : imageMode === 'camera' ? (
                                  <>
                                    <Button type="button" onClick={handleCapture} disabled={hasCameraPermission === false}>
                                      <Camera className="w-4 h-4 mr-2" />
                                      {t('classifiedsManagement.form.capture')}
                                    </Button>
                                    <Button type="button" variant="secondary" onClick={() => setImageMode('idle')}>
                                      {t('classifiedsManagement.form.cancel')}
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button type="button" onClick={() => setImageMode('camera')}>
                                      <Camera className="w-4 h-4 mr-2" />
                                      {t('classifiedsManagement.form.takePicture')}
                                    </Button>
                                    <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()}>
                                      <Upload className="w-4 h-4 mr-2" />
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

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t('postAd.form.submitting')}
                      </>
                    ) : (
                      t('postAd.form.submit')
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle>{t('postAd.pricing.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle className="text-2xl font-bold text-primary">{formatCurrency(20000)}</AlertTitle>
                <AlertDescription>
                  {t('postAd.pricing.description')}
                </AlertDescription>
              </Alert>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p>{t('postAd.pricing.note1')}</p>
                  <p>{t('postAd.pricing.note2')}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
