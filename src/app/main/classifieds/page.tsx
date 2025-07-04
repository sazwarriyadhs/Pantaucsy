
"use client"

import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { classifieds, type ClassifiedAd } from "@/lib/data"
import { useI18n } from '@/context/i18n-provider'
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { MessageSquare, PlusSquare } from 'lucide-react'

export default function ClassifiedsPage() {
  const { t, formatCurrency } = useI18n();

  const [selectedAd, setSelectedAd] = useState<ClassifiedAd | null>(null);
  const [isAdDetailOpen, setIsAdDetailOpen] = useState(false);

  const generateWhatsAppLink = (phone: string, titleKey: string) => {
    const title = t(`classifieds.items.${titleKey}.title`);
    const message = encodeURIComponent(`Halo, saya tertarik dengan "${title}" yang Anda iklankan.`);
    return `https://wa.me/${phone}?text=${message}`;
  }
  
  const activeClassifieds = classifieds.filter(ad => ad.status === 'active');

  const handleAdClick = (ad: ClassifiedAd) => {
    setSelectedAd(ad);
    setIsAdDetailOpen(true);
  };

  return (
    <>
      <Dialog open={isAdDetailOpen} onOpenChange={setIsAdDetailOpen}>
        <DialogContent className="max-w-lg">
          {selectedAd && (
            <>
              <DialogHeader>
                <DialogTitle>{t(`classifieds.items.${selectedAd.titleKey}.title`)}</DialogTitle>
                <DialogDescription className="text-xl font-bold text-primary">{formatCurrency(selectedAd.price)}</DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <Image
                  src={selectedAd.image}
                  alt={t(`classifieds.items.${selectedAd.titleKey}.title`)}
                  width={600}
                  height={400}
                  className="object-cover w-full rounded-lg aspect-video"
                  data-ai-hint={selectedAd.imageHint}
                />
                <p className="text-sm text-muted-foreground">{t(`classifieds.items.${selectedAd.titleKey}.description`).replace('{price}', formatCurrency(selectedAd.price))}</p>
              </div>
              <DialogFooter>
                <Button asChild className="w-full">
                  <Link href={generateWhatsAppLink(selectedAd.phone, selectedAd.titleKey)} target="_blank">
                    <MessageSquare className="mr-2" /> {t('classifieds.contactViaWhatsapp')}
                  </Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">{t('classifieds.title')}</h1>
            <p className="text-muted-foreground">
              {t('classifieds.description')}
            </p>
          </div>
          <Button asChild>
            <Link href="/main/post-ad">
              <PlusSquare className="mr-2" />
              {t('sidebar.postAd')}
            </Link>
          </Button>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {activeClassifieds.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="p-1">
                  <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="p-0 cursor-pointer" onClick={() => handleAdClick(item)}>
                      <Image
                        src={item.image}
                        alt={t(`classifieds.items.${item.titleKey}.title`)}
                        width={600}
                        height={400}
                        className="object-cover w-full rounded-t-lg aspect-video"
                        data-ai-hint={item.imageHint}
                      />
                    </CardHeader>
                    <CardContent className="flex-1 pt-6">
                      <CardTitle className="text-xl font-headline">{t(`classifieds.items.${item.titleKey}.title`)}</CardTitle>
                      <p className="mt-2 text-2xl font-semibold text-primary">{formatCurrency(item.price)}</p>
                      <CardDescription className="mt-4">{t(`classifieds.items.${item.titleKey}.description`).replace('{price}', formatCurrency(item.price))}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={generateWhatsAppLink(item.phone, item.titleKey)}>
                          <MessageSquare className="mr-2" /> {t('classifieds.contactViaWhatsapp')}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden ml-12 sm:flex" />
          <CarouselNext className="hidden mr-12 sm:flex" />
        </Carousel>
      </div>
    </>
  )
}
