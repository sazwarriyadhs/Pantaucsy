
"use client"

import { useState } from 'react';
import { z } from 'zod';
import Image from 'next/image'
import { EllipsisVerticalIcon, PlusCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
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
import { gallery as initialGallery, type GalleryItem } from "@/lib/data"
import { useI18n } from '@/context/i18n-provider'
import { useAuth } from '@/context/auth-provider';
import { GalleryForm, galleryFormSchema } from './gallery-form';
import { useToast } from '@/hooks/use-toast';

export default function GalleryPage() {
  const { t } = useI18n();
  const { role } = useAuth();
  const { toast } = useToast();

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGallery);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<GalleryItem | null>(null);

  const hasAdminAccess = role === 'admin' || role === 'superadmin';

  const handleAdd = () => {
    setSelectedPhoto(null);
    setIsFormOpen(true);
  };

  const handleEdit = (photo: GalleryItem) => {
    setSelectedPhoto(photo);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = (photo: GalleryItem) => {
    setPhotoToDelete(photo);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (photoToDelete) {
      setGalleryItems(galleryItems.filter(item => item.id !== photoToDelete.id));
      toast({
        title: t('gallery.delete.toastSuccessTitle'),
        description: t('gallery.delete.toastSuccessDescription'),
      })
      setIsDeleteDialogOpen(false);
      setPhotoToDelete(null);
    }
  };

  const handleFormSubmit = (data: z.infer<typeof galleryFormSchema>) => {
    // A real app should have a way to translate the titleKey on the backend.
    // For the prototype, we assume the admin enters a key that corresponds to a translation.
    if (selectedPhoto) {
      // Update
      setGalleryItems(galleryItems.map(item => item.id === selectedPhoto.id ? { ...item, ...data } : item));
       toast({
        title: t('gallery.form.toastEditSuccessTitle')
      })
    } else {
      // Create
      const newPhoto: GalleryItem = {
        id: (galleryItems.length + 1).toString(),
        ...data,
      };
      setGalleryItems([newPhoto, ...galleryItems]);
      toast({
        title: t('gallery.form.toastAddSuccessTitle')
      })
    }
    setIsFormOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <>
      {hasAdminAccess && (
        <GalleryForm
          isOpen={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleFormSubmit}
          photo={selectedPhoto}
        />
      )}
       {hasAdminAccess && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('gallery.delete.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('gallery.delete.description')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setPhotoToDelete(null)}>{t('gallery.delete.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">{t('gallery.delete.confirm')}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">{t('gallery.title')}</h1>
            <p className="text-muted-foreground">
              {t('gallery.description')}
            </p>
          </div>
          {hasAdminAccess && (
            <Button onClick={handleAdd}>
              <PlusCircleIcon className="mr-2" />
              {t('gallery.form.addPhoto')}
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden transition-all duration-300 group hover:shadow-lg">
              <CardContent className="relative p-0">
                <Image
                  src={item.image}
                  alt={t(`gallery.items.${item.titleKey}`)}
                  width={600}
                  height={400}
                  className="object-cover w-full aspect-video"
                  data-ai-hint={item.imageHint}
                />
                 {hasAdminAccess && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <EllipsisVerticalIcon className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(item)}>
                          <PencilSquareIcon className="mr-2" /> {t('gallery.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteConfirm(item)} className="text-destructive">
                          <TrashIcon className="mr-2" /> {t('gallery.delete.button')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
              </CardContent>
              <CardFooter className="p-4">
                <CardTitle className="text-lg font-headline">{t(`gallery.items.${item.titleKey}`)}</CardTitle>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
