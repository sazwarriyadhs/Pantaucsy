
"use client"

import { useState, useMemo } from "react"
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
import { residents as initialResidents, type Resident } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle, Pencil, Trash2, Search } from "lucide-react"
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
import { ResidentForm, residentFormSchema } from "./resident-form"
import { useI18n } from "@/context/i18n-provider"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ResidentsPage() {
  const { t } = useI18n()
  const { toast } = useToast()
  const [residents, setResidents] = useState(initialResidents)
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [residentToDelete, setResidentToDelete] = useState<Resident | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [filterBlock, setFilterBlock] = useState("all")

  const handleAdd = () => {
    setSelectedResident(null)
    setIsFormOpen(true)
  }

  const handleEdit = (resident: Resident) => {
    setSelectedResident(resident)
    setIsFormOpen(true)
  }

  const handleDeleteConfirm = (resident: Resident) => {
    setResidentToDelete(resident)
    setIsDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (residentToDelete) {
      setResidents(residents.filter(r => r.email !== residentToDelete.email))
      setIsDeleteDialogOpen(false)
      setResidentToDelete(null)
    }
  }

  const handleFormSubmit = (data: z.infer<typeof residentFormSchema>) => {
    const address = `Blok ${data.block.toUpperCase()} No. ${data.number}`
    const residentData: Resident = {
      name: data.name,
      address: address,
      phone: data.phone,
      email: data.email,
    }

    if (selectedResident) {
      // Update
      setResidents(residents.map(r => r.email === selectedResident.email ? residentData : r))
    } else {
      // Create - check for uniqueness
      if (residents.some(r => r.email.toLowerCase() === residentData.email.toLowerCase())) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "A resident with this email already exists.",
        })
        return
      }
      setResidents([...residents, residentData])
    }
    setIsFormOpen(false)
    setSelectedResident(null)
  }

  const uniqueBlocks = useMemo(() => {
    const blocks = residents.map(r => r.address.split(' ')[1])
    return ['all', ...Array.from(new Set(blocks)).sort()]
  }, [residents])

  const filteredResidents = useMemo(() => {
    return residents.filter(resident => {
      const matchesSearch = searchTerm.toLowerCase() === '' ||
        resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.phone.includes(searchTerm)

      const matchesBlock = filterBlock === 'all' || resident.address.startsWith(`Blok ${filterBlock}`)

      return matchesSearch && matchesBlock
    })
  }, [residents, searchTerm, filterBlock])

  return (
    <>
      <ResidentForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        resident={selectedResident}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('residents.delete.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('residents.delete.description', { name: residentToDelete?.name || '' })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setResidentToDelete(null)}>{t('residents.delete.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">{t('residents.delete.confirm')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">{t('residents.title')}</h1>
          <p className="text-muted-foreground">
            {t('residents.description')}
          </p>
        </div>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>{t('residents.tableTitle')}</CardTitle>
                <CardDescription>{t('residents.tableDescription')}</CardDescription>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4 sm:flex-row">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('residents.searchPlaceholder')}
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterBlock} onValueChange={setFilterBlock}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder={t('residents.filter.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {uniqueBlocks.map(block => (
                    <SelectItem key={block} value={block}>
                      {block === 'all' ? t('residents.filter.allBlocks') : `${t('residents.form.block')} ${block}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
               <Button onClick={handleAdd} className="w-full sm:w-auto sm:ml-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('residents.addResident')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('residents.name')}</TableHead>
                  <TableHead>{t('residents.address')}</TableHead>
                  <TableHead>{t('residents.phone')}</TableHead>
                  <TableHead>{t('residents.email')}</TableHead>
                  <TableHead className="text-right">{t('residents.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResidents.length > 0 ? (
                  filteredResidents.map((resident) => (
                    <TableRow key={resident.email}>
                      <TableCell className="font-medium">{resident.name}</TableCell>
                      <TableCell>{resident.address}</TableCell>
                      <TableCell>{resident.phone}</TableCell>
                      <TableCell>{resident.email}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(resident)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>{t('residents.edit')}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteConfirm(resident)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>{t('residents.delete.button')}</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      {t('residents.filter.noResults')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
