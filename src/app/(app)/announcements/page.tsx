
"use client"

import { Bell, MapPin, MessageSquare, MoreVertical, PlusCircle, Trash2, Pencil } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
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
import { announcements as initialAnnouncements, classifieds, type Announcement } from '@/lib/data';
import { useI18n } from '@/context/i18n-provider';
import { useAuth } from '@/context/auth-provider';
import { AnnouncementForm, announcementFormSchema } from './announcement-form';

export default function AnnouncementsPage() {
  const { t, locale, formatCurrency } = useI18n();
  const { user, role } = useAuth();
  
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<Announcement | null>(null);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const hasAdminAccess = role === 'admin' || role === 'superadmin';

  const handleAdd = () => {
    setSelectedAnnouncement(null);
    setIsFormOpen(true);
  };

  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = (announcement: Announcement) => {
    setAnnouncementToDelete(announcement);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (announcementToDelete) {
      setAnnouncements(announcements.filter(item => item.id !== announcementToDelete.id));
      setIsDeleteDialogOpen(false);
      setAnnouncementToDelete(null);
    }
  };

  const handleFormSubmit = (data: z.infer<typeof announcementFormSchema>) => {
    const announcementData = {
        ...data,
        date: data.date.toISOString().split('T')[0],
        image: data.image || undefined,
        address: data.address || undefined
    };

    if (selectedAnnouncement) {
      // Update
      setAnnouncements(announcements.map(item => item.id === selectedAnnouncement.id ? { ...item, ...announcementData } : item));
    } else {
      // Create
      const newAnnouncement: Announcement = {
        id: (announcements.length + 1).toString(),
        ...announcementData,
      };
      setAnnouncements([newAnnouncement, ...announcements]);
    }
    setIsFormOpen(false);
    setSelectedAnnouncement(null);
  };

  const generateWhatsAppLink = (phone: string, titleKey: string) => {
    const title = t(`classifieds.items.${titleKey}.title`);
    const message = encodeURIComponent(`Halo, saya tertarik dengan "${title}" yang Anda iklankan.`);
    return `https://wa.me/${phone}?text=${message}`;
  }
  
  const activeClassifieds = classifieds.filter(ad => ad.status === 'active');

  return (
    <>
      {hasAdminAccess && (
         <AnnouncementForm
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            onSubmit={handleFormSubmit}
            announcement={selectedAnnouncement}
         />
      )}
      {hasAdminAccess && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the announcement "{announcementToDelete?.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setAnnouncementToDelete(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete Announcement</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <div className="flex flex-col gap-8">
        <div className="pb-8 mb-8 border-b">
          <div className="text-center mb-8">
              <h2 className="text-3xl font-bold md:text-4xl font-headline">
                  {t('landing.marketplace.title')}
              </h2>
          </div>
          <Carousel
              opts={{
              align: "start",
              loop: true,
              }}
              plugins={[autoplayPlugin.current]}
              className="w-full"
          >
              <CarouselContent>
              {activeClassifieds.map((item) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="p-1">
                      <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg">
                        <CardHeader className="p-0">
                          <Image
                            src={item.image}
                            alt={t(`classifieds.items.${item.titleKey}.title`)}
                            width={600}
                            height={400}
                            className="object-cover w-full rounded-t-lg aspect-video"
                            data-ai-hint={item.imageHint}
                          />
                        </CardHeader>
                        <CardContent className="flex-1 pt-6">
                          <CardTitle className="text-xl font-headline">{t(`classifieds.items.${item.titleKey}.title`)}</CardTitle>
                          <p className="mt-2 text-2xl font-semibold text-primary">{formatCurrency(item.price)}</p>
                          <CardDescription className="mt-4">{t(`classifieds.items.${item.titleKey}.description`).replace('{price}', formatCurrency(item.price))}</CardDescription>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="w-full">
                            <Link href={generateWhatsAppLink(item.phone, item.titleKey)}>
                              <MessageSquare className="mr-2" /> {t('classifieds.contactViaWhatsapp')}
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
              ))}
              </CarouselContent>
              <CarouselPrevious className="hidden ml-12 sm:flex" />
              <CarouselNext className="hidden mr-12 sm:flex" />
          </Carousel>
          <div className="mt-12 text-center">
              <Button asChild variant="outline">
              <Link href="/classifieds">{t('landing.marketplace.cta')}</Link>
              </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">{t('announcements.title')}</h1>
            <p className="text-muted-foreground">
              {t('announcements.description')}
            </p>
          </div>
          {hasAdminAccess && (
            <Button onClick={handleAdd}>
              <PlusCircle className="mr-2" />
              Add Announcement
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="flex flex-col transition-all duration-300 hover:shadow-lg">
              {announcement.image ? (
                <CardHeader className="p-0">
                  <Image
                    src={announcement.image}
                    alt={announcement.title}
                    width={600}
                    height={400}
                    className="object-cover w-full rounded-t-lg aspect-video"
                    data-ai-hint={announcement.imageHint}
                  />
                </CardHeader>
              ) : (
                <CardHeader className="flex flex-row items-start justify-between pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Bell className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-headline">{announcement.title}</CardTitle>
                      <CardDescription>{new Date(announcement.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                    </div>
                  </div>
                  {hasAdminAccess && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(announcement)}>
                          <Pencil className="mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteConfirm(announcement)} className="text-destructive">
                          <Trash2 className="mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </CardHeader>
              )}
              <CardContent className={`flex-1 flex flex-col ${announcement.image ? 'pt-6' : ''}`}>
                 {announcement.image && (
                   <div className="flex items-start justify-between mb-4">
                      <div>
                        <CardTitle className="text-xl font-headline">{announcement.title}</CardTitle>
                        <CardDescription>{new Date(announcement.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                      </div>
                      {hasAdminAccess && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-8 h-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(announcement)}>
                              <Pencil className="mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteConfirm(announcement)} className="text-destructive">
                              <Trash2 className="mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                   </div>
                 )}
                <p className="flex-1 text-muted-foreground">{announcement.content}</p>
                {announcement.address && (
                   <div className="flex items-start gap-2 pt-4 mt-4 text-sm border-t text-muted-foreground">
                     <MapPin className="w-4 h-4 mt-1 shrink-0" />
                     <span>{announcement.address}</span>
                   </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
