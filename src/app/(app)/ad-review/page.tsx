
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { classifieds as initialClassifieds, type ClassifiedAd } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/context/i18n-provider"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { SparklesIcon, ArrowPathIcon, CheckCircleIcon, XCircleIcon, HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/outline"
import { reviewAd, ReviewAdInput, ReviewAdOutput } from "@/ai/flows/review-ad-flow"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export default function AdReviewPage() {
  const { t } = useI18n()
  const { toast } = useToast()
  
  const [ads, setAds] = useState<ClassifiedAd[]>(initialClassifieds)
  const [pendingAds, setPendingAds] = useState<ClassifiedAd[]>([])
  const [selectedAd, setSelectedAd] = useState<ClassifiedAd | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const [aiResult, setAiResult] = useState<ReviewAdOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setPendingAds(ads.filter(ad => ad.status === 'pending_review'))
  }, [ads])

  const handleReviewClick = async (ad: ClassifiedAd) => {
    setSelectedAd(ad)
    setIsDialogOpen(true)
    setIsLoading(true)
    setAiResult(null)

    try {
      const adTitle = t(`classifieds.items.${ad.titleKey}.title`)
      const adDescription = t(`classifieds.items.${ad.titleKey}.description`)

      let image_data_uri : string|undefined = undefined;
      if (!ad.image.startsWith("https://placehold.co")) {
        // This is a simplified way to handle local images for the demo.
        // In a real app, you'd fetch the image and convert it to a data URI.
        // For now, we assume local /images/* are not sent to AI.
      }
      
      const input: ReviewAdInput = {
        title: adTitle,
        description: adDescription,
        photoDataUri: image_data_uri
      }
      
      const result = await reviewAd(input)
      setAiResult(result)
    } catch (error) {
      console.error("AI review failed:", error)
      toast({
        variant: "destructive",
        title: t('adReview.toast.error.title'),
        description: t('adReview.toast.error.description'),
      })
      setIsDialogOpen(false) // Close dialog on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = () => {
    if (!selectedAd) return
    const adTitle = t(`classifieds.items.${selectedAd.titleKey}.title`)
    setAds(ads.map(ad => ad.id === selectedAd.id ? { ...ad, status: 'active' } : ad))
    toast({
      title: t('adReview.toast.approved.title'),
      description: t('adReview.toast.approved.description', { title: adTitle }),
    })
    setIsDialogOpen(false)
  }

  const handleReject = () => {
    if (!selectedAd) return
    const adTitle = t(`classifieds.items.${selectedAd.titleKey}.title`)
    setAds(ads.filter(ad => ad.id !== selectedAd.id)) // Remove from list
    toast({
      variant: "destructive",
      title: t('adReview.toast.rejected.title'),
      description: t('adReview.toast.rejected.description', { title: adTitle }),
    })
    setIsDialogOpen(false)
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t('adReview.dialog.title')}</DialogTitle>
            <DialogDescription>{t('adReview.dialog.description')}</DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16">
              <ArrowPathIcon className="w-12 h-12 animate-spin text-primary" />
              <p className="text-muted-foreground">{t('adReview.dialog.loading')}</p>
            </div>
          ) : aiResult && selectedAd && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Original Ad */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">{t('adReview.dialog.originalTitle')}</h3>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <Image src={selectedAd.image} alt="Ad Image" width={400} height={250} className="w-full rounded-md object-cover aspect-video" data-ai-hint={selectedAd.imageHint}/>
                    <div>
                      <CardTitle className="text-xl">{t(`classifieds.items.${selectedAd.titleKey}.title`)}</CardTitle>
                      <p className="text-xl font-bold text-primary">{t(`classifieds.items.${selectedAd.titleKey}.price`)}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{t(`classifieds.items.${selectedAd.titleKey}.description`)}</p>
                  </CardContent>
                </Card>
              </div>

              {/* AI Review */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <SparklesIcon className="text-primary"/> 
                  {t('adReview.dialog.aiReviewTitle')}
                </h3>
                {aiResult.reviewStatus === 'approved' ? (
                  <Alert>
                    <HandThumbUpIcon className="h-4 w-4" />
                    <AlertTitle>{t('adReview.dialog.approvedMessage')}</AlertTitle>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <HandThumbDownIcon className="h-4 w-4" />
                    <AlertTitle>{t('adReview.dialog.rejectedMessage')}</AlertTitle>
                    <AlertDescription>{aiResult.rejectionReason}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-4 rounded-md border p-4">
                   <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">{t('adReview.dialog.suggestion')} {t('classifiedsManagement.titleColumn')}</p>
                      <p>{aiResult.suggestedTitle}</p>
                   </div>
                   <Separator />
                   <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">{t('adReview.dialog.suggestion')} {t('classifiedsManagement.form.description')}</p>
                      <p>{aiResult.suggestedDescription}</p>
                   </div>
                   <Separator />
                   <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">{t('adReview.dialog.category')}</p>
                      <Badge variant="outline">{t(`adReview.categories.${aiResult.suggestedCategory}`)}</Badge>
                   </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {aiResult?.reviewStatus === 'approved' ? (
              <Button onClick={handleApprove}><CheckCircleIcon className="mr-2"/>{t('adReview.dialog.approveButton')}</Button>
            ) : (
              <Button variant="destructive" onClick={handleReject}><XCircleIcon className="mr-2"/>{t('adReview.dialog.rejectButton')}</Button>
            )}
            <DialogClose asChild>
              <Button variant="outline">{t('adReview.dialog.closeButton')}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">{t('adReview.title')}</h1>
          <p className="text-muted-foreground">
            {t('adReview.description')}
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t('adReview.tableTitle')}</CardTitle>
            <CardDescription>{t('adReview.tableDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('adReview.columnTitle')}</TableHead>
                  <TableHead>{t('adReview.columnSubmittedBy')}</TableHead>
                  <TableHead className="text-right">{t('adReview.columnActions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingAds.length > 0 ? pendingAds.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell className="font-medium">{t(`classifieds.items.${ad.titleKey}.title`)}</TableCell>
                    <TableCell>{ad.submittedBy}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleReviewClick(ad)}>
                        <SparklesIcon className="mr-2 h-4 w-4" />
                        {t('adReview.reviewButton')}
                      </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                      No ads are currently pending review.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
