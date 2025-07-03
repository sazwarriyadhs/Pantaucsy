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

export default function SecurityManagementPage() {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
      case 'closed':
        return 'default'
      case 'under investigation':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Security Management</h1>
        <p className="text-muted-foreground">
          Manage security personnel, shifts, and incident reports.
        </p>
      </div>

      <Tabs defaultValue="personnel" className="w-full">
        <TabsList>
          <TabsTrigger value="personnel">Personnel</TabsTrigger>
          <TabsTrigger value="incidents">Incident Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="personnel" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Security Personnel</CardTitle>
                  <CardDescription>
                    List of all security staff.
                  </CardDescription>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Personnel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Shift</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityPersonnel.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-mono">{person.id}</TableCell>
                      <TableCell className="font-medium">{person.name}</TableCell>
                      <TableCell>{person.phone}</TableCell>
                      <TableCell>{person.shift}</TableCell>
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
              <CardTitle>Incident Reports</CardTitle>
              <CardDescription>
                Log of all reported incidents.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Summary</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidentReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-mono">{report.id}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell className="max-w-sm truncate">{report.summary}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(report.status)}>{report.status}</Badge>
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
