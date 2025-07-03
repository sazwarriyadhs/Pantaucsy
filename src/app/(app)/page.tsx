import { Bell } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { announcements } from '@/lib/data';

export default function AnnouncementsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Announcements</h1>
        <p className="text-muted-foreground">
          Latest news and updates for the Cimahpar Stoneyard community.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement, index) => (
          <Card key={index} className="flex flex-col transition-all duration-300 hover:shadow-md">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Bell className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl font-headline">{announcement.title}</CardTitle>
                <CardDescription>{new Date(announcement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
