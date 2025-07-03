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
import { wasteManagementSchedule } from "@/lib/data"
import { useI18n } from "@/context/i18n-provider"

export default function WasteManagementPage() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('wasteManagement.title')}</h1>
        <p className="text-muted-foreground">
          {t('wasteManagement.description')}
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('wasteManagement.scheduleTitle')}</CardTitle>
          <CardDescription>
            {t('wasteManagement.scheduleDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('wasteManagement.day')}</TableHead>
                <TableHead>{t('wasteManagement.area')}</TableHead>
                <TableHead>{t('wasteManagement.type')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wasteManagementSchedule.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{schedule.day}</TableCell>
                  <TableCell>{schedule.area}</TableCell>
                  <TableCell>{schedule.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
