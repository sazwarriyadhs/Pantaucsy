
"use client"

import { useState, useEffect } from "react"
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { wasteManagementSchedule, residents, iplManagement } from "@/lib/data"
import { useI18n } from "@/context/i18n-provider"
import { useAuth } from "@/context/auth-provider"
import { CheckCircle, XCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WasteManagementPage() {
  const { t } = useI18n()
  const { user, role } = useAuth()
  const [collectionStatus, setCollectionStatus] = useState<'active' | 'suspended' | 'loading'>('loading')

  useEffect(() => {
    // Only check for residents, not for admin/superadmin
    if (user && role === 'warga') {
      const resident = residents.find(r => r.email === user.email);
      if (resident) {
        // A resident's service is suspended if they have ANY unpaid dues.
        const hasUnpaidDues = iplManagement.some(
          payment => payment.residentName === resident.name && payment.status === 'unpaid'
        );
        setCollectionStatus(hasUnpaidDues ? 'suspended' : 'active');
      } else {
        // Resident logged in but not in directory, treat as active for now.
        setCollectionStatus('active');
      }
    } else if (user) {
      // For admin/superadmin, the personal status is not applicable, so we can just set to loading to hide the card
      setCollectionStatus('loading');
    }
  }, [user, role]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start gap-4 md:items-center">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <Trash2 className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">{t('wasteManagement.title')}</h1>
          <p className="text-muted-foreground">
            {t('wasteManagement.description')}
          </p>
        </div>
      </div>
      
      {role === 'warga' && collectionStatus !== 'loading' && (
        <Card>
          <CardHeader>
            <CardTitle>{t('wasteManagement.statusTitle')}</CardTitle>
            <CardDescription>{t('wasteManagement.statusCheckDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            {collectionStatus === 'active' && (
              <Alert>
                <CheckCircle className="w-4 h-4" />
                <AlertTitle>{t('wasteManagement.statusActive.title')}</AlertTitle>
                <AlertDescription>{t('wasteManagement.statusActive.description')}</AlertDescription>
              </Alert>
            )}
            {collectionStatus === 'suspended' && (
              <Alert variant="destructive">
                <XCircle className="w-4 h-4" />
                <AlertTitle>{t('wasteManagement.statusSuspended.title')}</AlertTitle>
                <AlertDescription>
                  {t('wasteManagement.statusSuspended.description')}{' '}
                  <Button asChild variant="link" className="p-0 h-auto font-semibold text-destructive underline">
                    <Link href="/main/payment-confirmation">{t('wasteManagement.confirmPaymentButton')}</Link>
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

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
                  <TableCell className="font-medium">{t(`wasteManagement.days.${schedule.dayKey}`)}</TableCell>
                  <TableCell>{t(`wasteManagement.areas.${schedule.areaKey}`)}</TableCell>
                  <TableCell>{t(`wasteManagement.types.${schedule.typeKey}`)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
