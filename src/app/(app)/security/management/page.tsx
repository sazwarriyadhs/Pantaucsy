
"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { securityPersonnel, incidentReports } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useI18n } from "@/context/i18n-provider"

export default function SecurityManagementPage() {
  const { t } = useI18n()

  const getStatusVariant = (status: string): "default" | "secondary" | "outline" | "destructive" | null | undefined => {
    switch (status) {
      case 'resolved':
      case 'closed':
        return 'default'
      case 'investigation':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('security.management.title')}</h1>
        <p className="text-muted-foreground">
          {t('security.management.description')}
        </p>
      </div>

      <Tabs defaultValue="personnel" className="w-full">
        <TabsList>
          <TabsTrigger value="personnel">{t('security.management.personnel')}</TabsTrigger>
          <TabsTrigger value="incidents">{t('security.management.incidents')}</TabsTrigger>
        </TabsList>
        <TabsContent value="personnel" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>{t('security.management.personnelTitle')}</CardTitle>
                  <CardDescription>
                    {t('security.management.personnelDescription')}
                  </CardDescription>
                </div>
                <Button className="w-full sm:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {t('security.management.addPersonnel')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('security.management.id')}</TableHead>
                    <TableHead>{t('security.management.name')}</TableHead>
                    <TableHead>{t('security.management.phone')}</TableHead>
                    <TableHead>{t('security.management.shift')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityPersonnel.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-mono">{person.id}</TableCell>
                      <TableCell className="font-medium">{person.name}</TableCell>
                      <TableCell>{person.phone}</TableCell>
                      <TableCell>{t(`security.shifts.${person.shift.toLowerCase()}`)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="incidents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('security.management.incidentsTitle')}</CardTitle>
              <CardDescription>
                {t('security.management.incidentsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('security.management.id')}</TableHead>
                    <TableHead>{t('security.management.date')}</TableHead>
                    <TableHead>{t('security.management.type')}</TableHead>
                    <TableHead>{t('security.management.summary')}</TableHead>
                    <TableHead>{t('security.management.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidentReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-mono">{report.id}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{t(`security.incidents.${report.typeKey}`)}</TableCell>
                      <TableCell className="max-w-sm truncate">{t(`security.incidents.${report.summaryKey}`)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(report.status)}>{t('security.status.' + report.status)}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
