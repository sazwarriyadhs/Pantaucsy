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
import { associationManagement } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useI18n } from "@/context/i18n-provider"

export default function AssociationManagementPage() {
  const { t } = useI18n();
  
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('associationManagement.title')}</h1>
        <p className="text-muted-foreground">
          {t('associationManagement.description')}
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('associationManagement.tableTitle')}</CardTitle>
              <CardDescription>{t('associationManagement.tableDescription')}</CardDescription>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('associationManagement.addManager')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('associationManagement.name')}</TableHead>
                <TableHead>{t('associationManagement.position')}</TableHead>
                <TableHead>{t('associationManagement.phone')}</TableHead>
                <TableHead>{t('associationManagement.email')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {associationManagement.map((person, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{person.name}</TableCell>
                  <TableCell>{person.position}</TableCell>
                  <TableCell>{person.phone}</TableCell>
                  <TableCell>{person.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
