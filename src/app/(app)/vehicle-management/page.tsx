
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
import { vehicles as initialVehicles, type Vehicle } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle, Pencil, Trash2, Car, Motorcycle } from "lucide-react"
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
import { VehicleForm, vehicleFormSchema } from "./vehicle-form"
import { useI18n } from "@/context/i18n-provider"
import { useToast } from "@/hooks/use-toast"

export default function VehicleManagementPage() {
  const { t } = useI18n()
  const { toast } = useToast()
  const [vehicles, setVehicles] = useState(initialVehicles)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null)

  const handleAdd = () => {
    setSelectedVehicle(null)
    setIsFormOpen(true)
  }

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setIsFormOpen(true)
  }

  const handleDeleteConfirm = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle)
    setIsDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (vehicleToDelete) {
      setVehicles(vehicles.filter(v => v.id !== vehicleToDelete.id))
      setIsDeleteDialogOpen(false)
      setVehicleToDelete(null)
    }
  }

  const handleFormSubmit = (data: z.infer<typeof vehicleFormSchema>) => {
    if (selectedVehicle) {
      // Update
      const updatedVehicle: Vehicle = { ...selectedVehicle, ...data }
      setVehicles(vehicles.map(v => v.id === selectedVehicle.id ? updatedVehicle : v))
      toast({ description: t('vehicleManagement.form.toast.editSuccess') })
    } else {
      // Create
      const newVehicle: Vehicle = {
        id: `v${vehicles.length + 1}`,
        ...data,
      }
      setVehicles([...vehicles, newVehicle])
      toast({ description: t('vehicleManagement.form.toast.addSuccess') })
    }
    setIsFormOpen(false)
    setSelectedVehicle(null)
  }

  return (
    <>
      <VehicleForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        vehicle={selectedVehicle}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('vehicleManagement.delete.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('vehicleManagement.delete.description', { plate: vehicleToDelete?.licensePlate || '' })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setVehicleToDelete(null)}>{t('vehicleManagement.delete.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">{t('vehicleManagement.delete.confirm')}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">{t('vehicleManagement.title')}</h1>
          <p className="text-muted-foreground">
            {t('vehicleManagement.description')}
          </p>
        </div>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>{t('vehicleManagement.tableTitle')}</CardTitle>
                <CardDescription>{t('vehicleManagement.tableDescription')}</CardDescription>
              </div>
              <Button onClick={handleAdd} className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('vehicleManagement.addVehicle')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('vehicleManagement.resident')}</TableHead>
                  <TableHead>{t('vehicleManagement.type')}</TableHead>
                  <TableHead>{t('vehicleManagement.vehicleInfo')}</TableHead>
                  <TableHead>{t('vehicleManagement.licensePlate')}</TableHead>
                  <TableHead className="text-right">{t('vehicleManagement.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.residentName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {vehicle.type === 'car' ? <Car className="h-4 w-4 text-muted-foreground" /> : <Motorcycle className="h-4 w-4 text-muted-foreground" />}
                        <span>{t(`vehicleManagement.types.${vehicle.type}`)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {vehicle.brand} {vehicle.model} ({vehicle.color})
                    </TableCell>
                    <TableCell className="font-mono">{vehicle.licensePlate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(vehicle)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>{t('vehicleManagement.edit')}</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteConfirm(vehicle)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>{t('vehicleManagement.delete.button')}</span>
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
