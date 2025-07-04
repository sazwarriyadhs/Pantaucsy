
"use client"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { handleReportIssue, type SummarizeIssueReportOutput } from "./actions"
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
import { LoaderCircle, Sparkles, Camera, Trash2 } from "lucide-react"
import { useI18n } from "@/context/i18n-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function ReportIssuePage() {
  const { t } = useI18n()
  const [reportResult, setReportResult] = useState<SummarizeIssueReportOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formSchema = z.object({
    reportText: z.string().min(10, {
      message: t('reportIssue.form.validation'),
    }),
    photoDataUri: z.string().optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportText: "",
    },
  })

  useEffect(() => {
    const getCameraPermission = async () => {
      if (typeof window !== 'undefined' && navigator.mediaDevices) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error: any) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          
          let title = t('reportIssue.camera.toast.deniedTitle');
          let description = t('reportIssue.camera.toast.deniedDescription');

          if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
            title = t('reportIssue.camera.toast.notFoundTitle');
            description = t('reportIssue.camera.toast.notFoundDescription');
          }

          toast({
            variant: 'destructive',
            title: title,
            description: description,
          });
        }
      } else {
        setHasCameraPermission(false);
      }
    };
    getCameraPermission();
  }, [toast, t]);

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
        form.setValue('photoDataUri', dataUri);
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    form.setValue('photoDataUri', undefined);
  };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setReportResult(null)
    try {
      const result = await handleReportIssue(values)
      if (result) {
        setReportResult(result)
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t('reportIssue.form.title')}</CardTitle>
                  <CardDescription>
                    {t('reportIssue.form.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
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
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            {t('reportIssue.form.submitting')}
                          </>
                        ) : (
                          t('reportIssue.form.submit')
                        )}
                      </Button>
                    </div>
                </CardContent>
              </Card>

              {(isLoading || reportResult) && (
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="text-primary" /> {t('reportIssue.summary.title')}
                    </CardTitle>
                    <CardDescription>
                      {t('reportIssue.summary.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex items-center justify-center">
                    {isLoading && !reportResult ? (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
                        <p>{t('reportIssue.summary.loading')}</p>
                      </div>
                    ) : (
                      reportResult && (
                        <div className="text-sm p-4 bg-secondary rounded-lg w-full space-y-3">
                          <p className="italic">"{reportResult.summary}"</p>
                          {reportResult.category && (
                            <div className="flex items-center gap-2 pt-3 border-t">
                              <span className="font-semibold">{t('reportIssue.summary.category')}:</span>
                              <Badge variant="outline">{t(`reportIssue.category.${reportResult.category}`)}</Badge>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('reportIssue.form.addPhoto')}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-4">
                 <div className="w-full aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center relative">
                    {capturedImage ? (
                      <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                    ) : (
                      <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                    )}
                  </div>

                  {hasCameraPermission === false && (
                    <Alert variant="destructive">
                      <AlertTitle>{t('reportIssue.camera.accessRequired')}</AlertTitle>
                      <AlertDescription>
                        {t('reportIssue.camera.permissionDenied')}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-2">
                    {capturedImage ? (
                      <Button type="button" variant="outline" onClick={handleRetake}>
                         <Trash2 className="mr-2 h-4 w-4" />
                        {t('reportIssue.form.retakePicture')}
                      </Button>
                    ) : (
                      <Button type="button" onClick={handleCapture} disabled={!hasCameraPermission}>
                        <Camera className="mr-2 h-4 w-4" />
                        {t('reportIssue.form.takePicture')}
                      </Button>
                    )}
                  </div>
                  <canvas ref={canvasRef} className="hidden"></canvas>
              </CardContent>
            </Card>
        </form>
      </Form>
    </div>
  )
}
