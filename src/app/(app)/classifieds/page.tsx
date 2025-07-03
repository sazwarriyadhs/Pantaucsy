"use client"

import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { classifieds } from "@/lib/data"
import { useI18n } from '@/context/i18n-provider'

export default function ClassifiedsPage() {
  const { t, formatCurrency } = useI18n();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('classifieds.title')}</h1>
        <p className="text-muted-foreground">
          {t('classifieds.description')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {classifieds.map((item) => (
          <Card key={item.id} className="flex flex-col transition-all duration-300 hover:shadow-lg">
            <CardHeader className="p-0">
              <Image
                src={item.image}
                alt={t(`classifieds.items.${item.title.toLowerCase().replace(/ /g, '_')}.title`)}
                width={600}
                height={400}
                className="object-cover w-full rounded-t-lg aspect-video"
                data-ai-hint={item.imageHint}
              />
            </CardHeader>
            <CardContent className="flex-1 pt-6">
              <CardTitle className="text-xl font-headline">{t(`classifieds.items.${item.title.toLowerCase().replace(/ /g, '_')}.title`)}</CardTitle>
              <p className="mt-2 text-2xl font-semibold text-primary">{formatCurrency(item.price)}</p>
              <CardDescription className="mt-4">{t(`classifieds.items.${item.title.toLowerCase().replace(/ /g, '_')}.description`)}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{t('classifieds.contactSeller')}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
