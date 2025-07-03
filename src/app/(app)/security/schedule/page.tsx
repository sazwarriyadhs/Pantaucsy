"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { securitySchedule } from "@/lib/data"
import { useI18n } from "@/context/i18n-provider"

export default function SecuritySchedulePage() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('security.schedule.title')}</h1>
        <p className="text-muted-foreground">
          {t('security.schedule.description')}
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('security.schedule.rosterTitle')}</CardTitle>
          <CardDescription>
            {t('security.schedule.rosterDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('security.schedule.shift')}</TableHead>
                <TableHead>{t('security.schedule.area')}</TableHead>
                <TableHead>{t('security.schedule.personnel')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {securitySchedule.map((patrol, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{patrol.shift}</TableCell>
                  <TableCell>{patrol.area}</TableCell>
                  <TableCell>{patrol.personnel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
