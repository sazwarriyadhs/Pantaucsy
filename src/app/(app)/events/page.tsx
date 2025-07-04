
"use client"

import { useState } from 'react';
import { z } from 'zod';
import { Calendar, MapPin, MoreVertical, PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
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
import { events as initialEvents, type CommunityEvent } from '@/lib/data'
import { useI18n } from '@/context/i18n-provider'
import { useAuth } from '@/context/auth-provider';
import { EventForm, eventFormSchema } from './event-form';

export default function EventsPage() {
  const { t, locale } = useI18n()
  const { role } = useAuth();
  
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<CommunityEvent | null>(null);

  const hasAdminAccess = role === 'admin' || role === 'superadmin';

  const handleAdd = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleEdit = (event: CommunityEvent) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = (event: CommunityEvent) => {
    setEventToDelete(event);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (eventToDelete) {
      setEvents(events.filter(item => item.id !== eventToDelete.id));
      setIsDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  const handleFormSubmit = (data: z.infer<typeof eventFormSchema>) => {
    if (selectedEvent) {
      // Update
      setEvents(events.map(item => item.id === selectedEvent.id ? { ...item, ...data } : item));
    } else {
      // Create
      const newEvent: CommunityEvent = {
        id: (events.length + 1).toString(),
        ...data,
      };
      setEvents([newEvent, ...events]);
    }
    setIsFormOpen(false);
    setSelectedEvent(null);
  };

  const formatDate = (dateString: string) => {
    const isRecurringKey = dateString.startsWith('every_');
    if (isRecurringKey) {
      return t(`events.recurring.${dateString}`);
    }
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) { // Check if date is valid
            return dateString; // Return original string if not a valid date
        }
        return date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (error) {
        return dateString; // Fallback for invalid date strings
    }
  }

  return (
    <>
      {hasAdminAccess && (
        <EventForm
          isOpen={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleFormSubmit}
          event={selectedEvent}
        />
      )}
      {hasAdminAccess && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('events.delete.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('events.delete.description', { title: eventToDelete?.title || '' })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setEventToDelete(null)}>{t('events.delete.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">{t('events.delete.confirm')}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">{t('events.title')}</h1>
            <p className="text-muted-foreground">
              {t('events.description')}
            </p>
          </div>
          {hasAdminAccess && (
            <Button onClick={handleAdd}>
              <PlusCircle className="mr-2" />
              {t('events.addEvent')}
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="flex flex-col transition-all duration-300 hover:shadow-md">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-xl font-headline">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </div>
                {hasAdminAccess && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(event)}>
                        <Pencil className="mr-2" /> {t('events.edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteConfirm(event)} className="text-destructive">
                        <Trash2 className="mr-2" /> {t('events.delete.button')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(event.date)} at {event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
