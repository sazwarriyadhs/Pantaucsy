
"use client"

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { staff } from "@/lib/data"
import { useI18n } from "@/context/i18n-provider"
import { Phone, Shield, Sprout, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StaffManagementPage() {
  const { t } = useI18n();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'security':
        return <Shield className="w-5 h-5 text-primary" />;
      case 'gardener':
        return <Sprout className="w-5 h-5 text-primary" />;
      default:
        return null;
    }
  }
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">{t('staffManagement.title')}</h1>
          <p className="text-muted-foreground">
            {t('staffManagement.description')}
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('staffManagement.addStaff')}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {staff.map((person) => (
          <Card key={person.id} className="flex flex-col text-center transition-all duration-300 hover:shadow-lg">
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
              <div className="flex items-center justify-center gap-2 mt-1">
                {getRoleIcon(person.role)}
                <CardDescription>{t(`staffManagement.roles.${person.role}`)}</CardDescription>
              </div>
              <div className="flex-1 mt-4 space-y-2 text-sm text-left text-muted-foreground">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <a href={`tel:${person.phone}`} className="hover:underline">{person.phone}</a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
