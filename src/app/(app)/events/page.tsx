"use client"

import { Calendar, MapPin } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { events } from '@/lib/data'
import { useI18n } from '@/context/i18n-provider'

export default function EventsPage() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('events.title')}</h1>
        <p className="text-muted-foreground">
          {t('events.description')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => (
          <Card key={index} className="flex flex-col transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-headline">{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
