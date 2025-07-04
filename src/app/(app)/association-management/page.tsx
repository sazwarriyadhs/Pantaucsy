
"use client"

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { associationManagement } from "@/lib/data"
import { useI18n } from "@/context/i18n-provider"
import { PhoneIcon, EnvelopeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function AssociationManagementPage() {
  const { t, formatCurrency } = useI18n();
  
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('associationManagement.title')}</h1>
        <p className="text-muted-foreground">
          {t('associationManagement.description')}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {associationManagement.map((person, index) => (
          <Card key={index} className="flex flex-col text-center transition-all duration-300 hover:shadow-lg">
            <CardHeader className="p-0">
              <Image
                src={person.photo}
                alt={person.name}
                width={400}
                height={400}
                className="object-cover w-full rounded-t-lg aspect-square"
                data-ai-hint={person.photoHint}
              />
            </CardHeader>
            <CardContent className="flex flex-col flex-1 p-6">
              <CardTitle className="text-xl font-headline">{person.name}</CardTitle>
              <CardDescription>{t(`associationManagement.positions.${person.position.toLowerCase()}`)}</CardDescription>
              <div className="flex-1 mt-4 space-y-2 text-sm text-left text-muted-foreground">
                <div className="flex items-center">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  <a href={`tel:${person.phone}`} className="hover:underline">{person.phone}</a>
                </div>
                <div className="flex items-center">
                  <EnvelopeIcon className="w-4 h-4 mr-2" />
                  <a href={`mailto:${person.email}`} className="hover:underline">{person.email}</a>
                </div>
                <div className="flex items-center">
                  <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                  <span>{formatCurrency(person.salary)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
