"use client"

import { useState } from "react"
import { z } from "zod"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { classifieds as initialClassifieds, type ClassifiedAd } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AdForm, adFormSchema } from "./ad-form"
import { useI18n } from "@/context/i18n-provider"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function ClassifiedsManagementPage() {
  const { t, formatCurrency, locale } = useI18n()
  const { toast } = useToast()
  const [ads, setAds] = useState(initialClassifieds)
  const [selectedAd, setSelectedAd] = useState<ClassifiedAd | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [adToDelete, setAdToDelete] = useState<ClassifiedAd | null>(null)

  const handleAdd = () => {
    setSelectedAd(null)
    setIsFormOpen(true)
  }

  const handleEdit = (ad: ClassifiedAd) => {
    setSelectedAd(ad)
    setIsFormOpen(true)
  }

  const handleDeleteConfirm = (ad: ClassifiedAd) => {
    setAdToDelete(ad)
    setIsDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (adToDelete) {
      setAds(ads.filter(ad => ad.id !== adToDelete.id))
      setIsDeleteDialogOpen(false)
      setAdToDelete(null)
    }
  }

  const handleFormSubmit = (data: z.infer<typeof adFormSchema>) => {
    if (selectedAd) {
      // Update
      const updatedAd: ClassifiedAd = { 
        ...selectedAd,
        ...data,
        image: data.image || 'https://placehold.co/600x400.png'
      }
      setAds(ads.map(ad => ad.id === selectedAd.id ? updatedAd : ad))
    } else {
      // Create
      if (ads.some(ad => ad.title.toLowerCase() === data.title.toLowerCase())) {
        toast({
          variant: "destructive",
          title: "Error",
          description: t('classifiedsManagement.toast.error'),
        })
        return
      }
      const newAd: ClassifiedAd = {
        id: (ads.length + 1).toString(),
        status: 'active',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
        imageHint: "advertisement marketing",
        ...data,
        image: data.image || 'https://placehold.co/600x400.png',
      }
      setAds([...ads, newAd])
    }
    setIsFormOpen(false)
    setSelectedAd(null)
  }
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'expired':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <>
      <AdForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        ad={selectedAd}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('classifiedsManagement.delete.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('classifiedsManagement.delete.description', { title: adToDelete?.title || '' })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAdToDelete(null)}>{t('classifiedsManagement.delete.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">{t('classifiedsManagement.delete.confirm')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">{t('classifiedsManagement.title')}</h1>
          <p className="text-muted-foreground">
            {t('classifiedsManagement.description')}
          </p>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t('classifiedsManagement.tableTitle')}</CardTitle>
                <CardDescription>{t('classifiedsManagement.tableDescription')}</CardDescription>
              </div>
              <Button onClick={handleAdd}>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('classifiedsManagement.addAd')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('classifiedsManagement.titleColumn')}</TableHead>
                  <TableHead>{t('classifiedsManagement.price')}</TableHead>
                  <TableHead>{t('classifiedsManagement.status')}</TableHead>
                  <TableHead>{t('classifiedsManagement.expiryDate')}</TableHead>
                  <TableHead className="text-right">{t('classifiedsManagement.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ads.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell className="font-medium">{ad.title}</TableCell>
                    <TableCell>{formatCurrency(ad.price)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(ad.status)}>
                        {t(`classifiedsManagement.statuses.${ad.status}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(ad.expiryDate)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(ad)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>{t('classifiedsManagement.edit')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteConfirm(ad)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>{t('classifiedsManagement.delete.button')}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
