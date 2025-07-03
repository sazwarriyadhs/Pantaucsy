"use client"

import { Bell, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { announcements } from '@/lib/data';
import { useI18n } from '@/context/i18n-provider';

export default function AnnouncementsPage() {
  const { t, locale } = useI18n();

  return (
    <div className="flex flex-col gap-8">
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
