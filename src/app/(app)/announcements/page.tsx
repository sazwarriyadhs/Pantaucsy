
"use client"

import { Bell, MapPin, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { announcements, classifieds } from '@/lib/data';
import { useI18n } from '@/context/i18n-provider';

export default function AnnouncementsPage() {
  const { t, locale, formatCurrency } = useI18n();

  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const generateWhatsAppLink = (phone: string, titleKey: string) => {
    const title = t(`classifieds.items.${titleKey}.title`);
    const message = encodeURIComponent(`Halo, saya tertarik dengan "${title}" yang Anda iklankan.`);
    return `https://wa.me/${phone}?text=${message}`;
  }
  
  const activeClassifieds = classifieds.filter(ad => ad.status === 'active');

  return (
    <div className="flex flex-col gap-8">
      <div className="pb-8 mb-8 border-b">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold md:text-4xl font-headline">
                {t('landing.marketplace.title')}
            </h2>
        </div>
        <Carousel
            opts={{
            align: "start",
            loop: true,
            }}
            plugins={[autoplayPlugin.current]}
            className="w-full"
        >
            <CarouselContent>
            {activeClassifieds.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="p-1">
                    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg">
                      <CardHeader className="p-0">
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
        <div className="mt-12 text-center">
            <Button asChild variant="outline">
            <Link href="/classifieds">{t('landing.marketplace.cta')}</Link>
            </Button>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('announcements.title')}</h1>
        <p className="text-muted-foreground">
          {t('announcements.description')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement: any, index: number) => {
          const addressText = t(`announcements.items.${announcement.titleKey}.address`);
          const hasAddress = addressText !== `announcements.items.${announcement.titleKey}.address`;

          return (
            <Card key={index} className="flex flex-col transition-all duration-300 hover:shadow-lg">
              {announcement.image ? (
                <CardHeader className="p-0">
                  <Image
                    src={announcement.image}
                    alt={t(`announcements.items.${announcement.titleKey}.title`)}
                    width={600}
                    height={400}
                    className="object-cover w-full rounded-t-lg aspect-video"
                    data-ai-hint={announcement.imageHint}
                  />
                </CardHeader>
              ) : (
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-headline">{t(`announcements.items.${announcement.titleKey}.title`)}</CardTitle>
                    <CardDescription>{new Date(announcement.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                  </div>
                </CardHeader>
              )}
              <CardContent className={`flex-1 flex flex-col ${announcement.image ? 'pt-6' : ''}`}>
                 {announcement.image && (
                   <>
                     <CardTitle className="text-xl font-headline">{t(`announcements.items.${announcement.titleKey}.title`)}</CardTitle>
                     <CardDescription className='mb-4'>{new Date(announcement.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                   </>
                 )}
                <p className="flex-1 text-muted-foreground">{t(`announcements.items.${announcement.titleKey}.content`)}</p>
                {hasAddress && (
                   <div className="flex items-start gap-2 pt-4 mt-4 text-sm border-t text-muted-foreground">
                     <MapPin className="w-4 h-4 mt-1 shrink-0" />
                     <span>{addressText}</span>
                   </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
