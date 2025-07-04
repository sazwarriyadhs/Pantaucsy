
"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Image from "next/image"
import { CameraIcon, ArrowUpTrayIcon, ArrowPathIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { useAuth } from "@/context/auth-provider"
import { useI18n } from "@/context/i18n-provider"
import { useToast } from "@/hooks/use-toast"
import { residents as initialResidents } from "@/lib/data"
import { updateUserProfile } from "./actions"

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const profileFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  block: z.string().length(1, { message: "Block must be a single letter." }).regex(/^[A-Z]$/i, "Block must be a single letter."),
  number: z.string().min(1, { message: "Number is required." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  photo: z.string().optional(),
  familyMembers: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfilePage() {
  const { user } = useAuth()
  const { t } = useI18n()
  const { toast } = useToast()
  
  const [isLoading, setIsLoading] = useState(false)
  const [isCapturingLocation, setIsCapturingLocation] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  type ImageMode = "idle" | "camera"
  const [imageMode, setImageMode] = useState<ImageMode>("idle")
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      block: "",
      number: "",
      phone: "",
      photo: "",
      familyMembers: "",
    },
  })
  
  useEffect(() => {
    if (user) {
      const residentData = initialResidents.find(r => r.email === user.email)
      const [blockPart, numberPart] = residentData?.address.split(" No. ") ?? ["", ""];
      const block = blockPart.replace("Blok ", "");
      
      form.reset({
        name: user.displayName || "",
        email: user.email || "",
        phone: residentData?.phone || "",
        block: block,
        number: numberPart,
        familyMembers: "Istri, Anak 1, Anak 2", // Dummy data
      })
      
      setImagePreview(user.photoURL)
    }
  }, [user, form])

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
        setHasCameraPermission(false);
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
  }, [imageMode]);
  
  const handleCaptureLocation = () => {
    if (!navigator.geolocation) {
      toast({ variant: 'destructive', title: t('profile.form.location.notSupported') });
      return;
    }
    setIsCapturingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.setValue('latitude', position.coords.latitude);
        form.setValue('longitude', position.coords.longitude);
        setIsCapturingLocation(false);
      },
      () => {
        toast({ variant: 'destructive', title: t('profile.form.location.denied') });
        setIsCapturingLocation(false);
      }
    );
  };

  const handleCapturePhoto = () => {
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
        form.setValue('photo', dataUri, { shouldValidate: true });
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
        form.setValue('photo', dataUri, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(values: ProfileFormValues) {
    setIsLoading(true);
    try {
      const result = await updateUserProfile(values);
      if (result.success) {
        toast({
          title: t('profile.toast.success.title'),
          description: result.message,
        })
        // Here you would typically re-fetch user data or update the auth state
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('profile.toast.error.title'),
        description: t('profile.toast.error.description'),
      })
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) {
    return (
        <div className="space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-6 w-1/2" />
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('profile.title')}</h1>
        <p className="text-muted-foreground">{t('profile.description')}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-3">

                {/* Photo Section */}
                <div className="flex flex-col items-center gap-4 md:col-span-1">
                   <FormLabel>{t('profile.form.photo.label')}</FormLabel>
                   <div className="relative">
                      {imageMode === 'camera' ? (
                        <div className="w-40 h-40 bg-muted rounded-full overflow-hidden flex items-center justify-center relative">
                           <video ref={videoRef} className="object-cover w-full h-full" autoPlay muted playsInline />
                        </div>
                      ) : (
                        <Image 
                           src={imagePreview || `https://placehold.co/160x160/A7D1AB/000000?text=${user.displayName?.charAt(0)}`}
                           alt="Profile picture"
                           width={160}
                           height={160}
                           className="object-cover rounded-full w-40 h-40"
                        />
                      )}
                    </div>
                    <div className="flex gap-2">
                       {imageMode === 'camera' ? (
                          <>
                           <Button type="button" size="sm" onClick={handleCapturePhoto} disabled={hasCameraPermission === false}>
                               <CameraIcon className="mr-2" /> {t('classifiedsManagement.form.capture')}
                           </Button>
                           <Button type="button" size="sm" variant="secondary" onClick={() => setImageMode('idle')}>
                               {t('classifiedsManagement.form.cancel')}
                           </Button>
                          </>
                       ) : (
                          <>
                           <Button type="button" size="sm" variant="outline" onClick={() => setImageMode('camera')}>
                               <CameraIcon className="mr-2" /> {t('profile.form.photo.change')}
                           </Button>
                           <Button type="button" size="sm" variant="ghost" onClick={() => fileInputRef.current?.click()}>
                               <ArrowUpTrayIcon className="mr-2" />
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
                </div>
                
                {/* Form Fields Section */}
                <div className="space-y-6 md:col-span-2">
                   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('profile.form.name.label')}</FormLabel>
                                <FormControl>
                                <Input {...field} readOnly className="bg-muted"/>
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
                                <FormLabel>{t('profile.form.email.label')}</FormLabel>
                                <FormControl>
                                <Input {...field} readOnly className="bg-muted"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                   </div>

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('profile.form.phone.label')}</FormLabel>
                            <FormControl>
                            <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                   <FormItem>
                     <FormLabel>{t('profile.form.address.label')}</FormLabel>
                     <div className="grid grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="block"
                            render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormControl>
                                <Input placeholder={t('residents.form.block')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormControl>
                                <Input placeholder={t('residents.form.number')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                     </div>
                   </FormItem>
                   
                   <FormField
                      control={form.control}
                      name="familyMembers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('profile.form.family.label')}</FormLabel>
                          <FormControl>
                            <Textarea placeholder={t('profile.form.family.placeholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.form.location.label')}</CardTitle>
              <CardDescription>{t('profile.form.location.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('profile.form.location.latitude')}</FormLabel>
                            <FormControl>
                            <Input {...field} readOnly placeholder="-" className="bg-muted"/>
                            </FormControl>
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('profile.form.location.longitude')}</FormLabel>
                            <FormControl>
                            <Input {...field} readOnly placeholder="-" className="bg-muted"/>
                            </FormControl>
                        </FormItem>
                        )}
                    />
                </div>
                <Button type="button" variant="outline" onClick={handleCaptureLocation} disabled={isCapturingLocation}>
                    {isCapturingLocation ? (
                        <>
                            <ArrowPathIcon className="mr-2 animate-spin" />
                            {t('profile.form.location.capturing')}
                        </>
                    ) : (
                        <>
                            <MapPinIcon className="mr-2" />
                            {t('profile.form.location.capture')}
                        </>
                    )}
                </Button>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                <>
                    <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                    {t('profile.form.submitting')}
                </>
                ) : (
                    t('profile.form.submit')
                )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
