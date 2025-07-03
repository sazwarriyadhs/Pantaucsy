"use client"

import Image from 'next/image'
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { gallery } from "@/lib/data"
import { useI18n } from '@/context/i18n-provider'

export default function GalleryPage() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('gallery.title')}</h1>
        <p className="text-muted-foreground">
          {t('gallery.description')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {gallery.map((item) => (
          <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-0">
              <Image
                src={item.image}
                alt={t(`gallery.items.${item.titleKey}`)}
                width={600}
                height={400}
                className="object-cover w-full aspect-video"
                data-ai-hint={item.imageHint}
              />
            </CardContent>
            <CardFooter className="p-4">
              <CardTitle className="text-lg font-headline">{t(`gallery.items.${item.titleKey}`)}</CardTitle>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
