
"use client"

import { useState } from "react"
import { z } from "zod"
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { staff as initialStaff, type Staff } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle, Pencil, Trash2, FileText } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { StaffForm, staffFormSchema } from "./staff-form"
import { useI18n } from "@/context/i18n-provider"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function StaffManagementPage() {
  const { t, formatCurrency } = useI18n()
  const { toast } = useToast()
  
  const [staff, setStaff] = useState(initialStaff)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isReportOpen, setIsReportOpen] = useState(false)
  
  const [staffToDelete, setStaffToDelete] = useState<Staff | null>(null)

  const handleAdd = () => {
    setSelectedStaff(null)
    setIsFormOpen(true)
  }

  const handleEdit = (staffMember: Staff) => {
    setSelectedStaff(staffMember)
    setIsFormOpen(true)
  }

  const handleViewReport = (staffMember: Staff) => {
    setSelectedStaff(staffMember)
    setIsReportOpen(true)
  }

  const handleDeleteConfirm = (staffMember: Staff) => {
    setStaffToDelete(staffMember)
    setIsDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (staffToDelete) {
      setStaff(staff.filter(s => s.id !== staffToDelete.id))
      setIsDeleteDialogOpen(false)
      setStaffToDelete(null)
      toast({
        title: t('staffManagement.delete.toastSuccessTitle'),
        description: t('staffManagement.delete.toastSuccessDescription', { name: staffToDelete.name }),
      })
    }
  }

  const handleFormSubmit = (data: z.infer<typeof staffFormSchema>) => {
    const staffData = {
        ...data,
        photo: data.photo || 'https://placehold.co/400x400.png',
        photoHint: data.role === 'security' ? 'security guard' : 'gardener',
    };

    if (selectedStaff) {
      // Update
      setStaff(staff.map(s => s.id === selectedStaff.id ? { ...s, ...staffData } : s));
       toast({
        title: t('staffManagement.form.toastEditSuccessTitle'),
        description: t('staffManagement.form.toastEditSuccessDescription', { name: data.name }),
      })
    } else {
      // Create
      const newStaff: Staff = {
        id: `S${(Math.random() * 1000).toFixed(0).padStart(3, '0')}`,
        ...staffData,
      };
      setStaff([...staff, newStaff]);
      toast({
        title: t('staffManagement.form.toastAddSuccessTitle'),
        description: t('staffManagement.form.toastAddSuccessDescription', { name: data.name }),
      })
    }
    setIsFormOpen(false)
    setSelectedStaff(null)
  }

  return (
    <>
      <StaffForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        staff={selectedStaff}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('staffManagement.delete.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('staffManagement.delete.description', { name: staffToDelete?.name || '' })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setStaffToDelete(null)}>{t('staffManagement.delete.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">{t('staffManagement.delete.confirm')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{t('staffManagement.performanceReportTitle', { name: selectedStaff?.name || '' })}</DialogTitle>
                <DialogDescription>{t('staffManagement.performanceReportDescription')}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedStaff?.performanceSummary}</p>
            </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">{t('staffManagement.title')}</h1>
          <p className="text-muted-foreground">
            {t('staffManagement.description')}
          </p>
        </div>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>{t('staffManagement.tableTitle')}</CardTitle>
                <CardDescription>{t('staffManagement.tableDescription')}</CardDescription>
              </div>
              <Button onClick={handleAdd} className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('staffManagement.addStaff')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">{t('staffManagement.name')}</TableHead>
                  <TableHead>{t('staffManagement.role')}</TableHead>
                  <TableHead>{t('staffManagement.phone')}</TableHead>
                  <TableHead className="text-right">{t('staffManagement.salary')}</TableHead>
                  <TableHead className="text-right">{t('staffManagement.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={person.photo} alt={person.name} data-ai-hint={person.photoHint} />
                          <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{person.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{t(`staffManagement.roles.${person.role}`)}</Badge>
                    </TableCell>
                    <TableCell>{person.phone}</TableCell>
                    <TableCell className="text-right">{formatCurrency(person.salary)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewReport(person)}>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>{t('staffManagement.viewReport')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(person)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>{t('staffManagement.edit')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteConfirm(person)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>{t('staffManagement.delete.button')}</span>
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
