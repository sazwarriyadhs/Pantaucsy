
"use client"

import Link from 'next/link'
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
import { iplManagement } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { PlusCircleIcon, ReceiptPercentIcon } from "@heroicons/react/24/outline"
import { useI18n } from "@/context/i18n-provider"

export default function IplManagementPage() {
  const { t, formatCurrency } = useI18n()

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default'
      case 'unpaid':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('ipl.title')}</h1>
        <p className="text-muted-foreground">
          {t('ipl.description')}
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>{t('ipl.tableTitle')}</CardTitle>
              <CardDescription>{t('ipl.tableDescription')}</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Link href="/payment-confirmation" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full">
                  <ReceiptPercentIcon className="mr-2 h-4 w-4" />
                  {t('ipl.confirmPayment')}
                </Button>
              </Link>
              <Button className="w-full sm:w-auto">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                {t('ipl.addPayment')}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('ipl.residentName')}</TableHead>
                <TableHead>{t('ipl.address')}</TableHead>
                <TableHead>{t('ipl.period')}</TableHead>
                <TableHead className="text-right">{t('ipl.amount')}</TableHead>
                <TableHead className="text-center">{t('ipl.status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {iplManagement.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{payment.residentName}</TableCell>
                  <TableCell>{payment.address}</TableCell>
                  <TableCell>{payment.month} {payment.year}</TableCell>
                  <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getStatusVariant(payment.status)}>{t('ipl.' + payment.status)}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
