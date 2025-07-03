import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { securitySchedule } from "@/lib/data"

export default function SecuritySchedulePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Security Patrol Schedule</h1>
        <p className="text-muted-foreground">
          Weekly schedule for security patrols in the neighborhood.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Patrol Roster</CardTitle>
          <CardDescription>
            Shifts and areas covered by our security team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shift</TableHead>
                <TableHead>Area Covered</TableHead>
                <TableHead>Assigned Personnel</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {securitySchedule.map((patrol, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{patrol.shift}</TableCell>
                  <TableCell>{patrol.area}</TableCell>
                  <TableCell>{patrol.personnel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
