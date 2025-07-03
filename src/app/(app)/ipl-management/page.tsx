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
import { PlusCircle } from "lucide-react"

export default function IplManagementPage() {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'lunas':
        return 'default'
      case 'belum lunas':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Iuran IPL Warga</h1>
        <p className="text-muted-foreground">
          Kelola iuran pemeliharaan lingkungan bulanan warga.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Iuran</CardTitle>
              <CardDescription>Daftar status pembayaran iuran IPL semua warga.</CardDescription>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Pembayaran
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Warga</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead className="text-right">Jumlah (Rp)</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {iplManagement.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{payment.residentName}</TableCell>
                  <TableCell>{payment.address}</TableCell>
                  <TableCell>{payment.month} {payment.year}</TableCell>
                  <TableCell className="text-right">{payment.amount}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getStatusVariant(payment.status)}>{payment.status}</Badge>
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
