
"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Bell, MessageSquare, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useI18n } from '@/context/i18n-provider';
import { useAuth } from '@/context/auth-provider';
import { SplashScreen } from '@/components/splash-screen';
import { announcements, classifieds, gallery, type Announcement, type ClassifiedAd, type GalleryItem } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function LandingPage() {
  const { t, locale, formatCurrency } = useI18n();
  const { user, loading } = useAuth();
  const router = useRouter();

  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const [isAnnouncementDetailOpen, setIsAnnouncementDetailOpen] = useState(false);
  const [selectedAnnouncementDetail, setSelectedAnnouncementDetail] = useState<Announcement | null>(null);
  
  const [isAdDetailOpen, setIsAdDetailOpen] = useState(false);
  const [selectedAdDetail, setSelectedAdDetail] = useState<ClassifiedAd | null>(null);

  const [isGalleryDetailOpen, setIsGalleryDetailOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    // Redirect authenticated users to the dashboard
    if (!loading && user) {
      router.push('/announcements');
    }
  }, [user, loading, router]);
  
  if (loading || user) {
    return <SplashScreen />;
  }
  
  const latestAnnouncements = announcements.slice(0, 3);
  const activeClassifieds = classifieds.filter(ad => ad.status === 'active');

  const generateWhatsAppLink = (phone: string, titleKey: string) => {
    const title = t(`classifieds.items.${titleKey}.title`);
    const message = encodeURIComponent(`Halo, saya tertarik dengan "${title}" yang Anda iklankan.`);
    return `https://wa.me/${phone}?text=${message}`;
  }

  const handleViewAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncementDetail(announcement);
    setIsAnnouncementDetailOpen(true);
  };

  const handleViewAd = (ad: ClassifiedAd) => {
    setSelectedAdDetail(ad);
    setIsAdDetailOpen(true);
  };

  const handleViewGalleryItem = (item: GalleryItem) => {
    setSelectedGalleryItem(item);
    setIsGalleryDetailOpen(true);
  };

  return (
    <>
      {/* Dialogs */}
      <Dialog open={isAnnouncementDetailOpen} onOpenChange={setIsAnnouncementDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedAnnouncementDetail && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedAnnouncementDetail.title}</DialogTitle>
                <DialogDescription>
                  {new Date(selectedAnnouncementDetail.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4 max-h-[80vh] overflow-y-auto">
                {selectedAnnouncementDetail.image && (
                  <Image
                    src={selectedAnnouncementDetail.image}
                    alt={selectedAnnouncementDetail.title}
                    width={600}
                    height={400}
                    className="object-cover w-full rounded-lg aspect-video"
                    data-ai-hint={selectedAnnouncementDetail.imageHint}
                  />
                )}
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedAnnouncementDetail.content}</p>
                {selectedAnnouncementDetail.address && (
                   <div className="flex items-start gap-2 pt-4 mt-4 text-sm border-t text-muted-foreground">
                     <MapPin className="w-4 h-4 mt-1 shrink-0" />
                     <span>{selectedAnnouncementDetail.address}</span>
                   </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={isAdDetailOpen} onOpenChange={setIsAdDetailOpen}>
        <DialogContent className="max-w-lg">
          {selectedAdDetail && (
            <>
              <DialogHeader>
                <DialogTitle>{t(`classifieds.items.${selectedAdDetail.titleKey}.title`)}</DialogTitle>
                <DialogDescription className="text-xl font-bold text-primary">{formatCurrency(selectedAdDetail.price)}</DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <Image
                  src={selectedAdDetail.image}
                  alt={t(`classifieds.items.${selectedAdDetail.titleKey}.title`)}
                  width={600}
                  height={400}
                  className="object-cover w-full rounded-lg aspect-video"
                  data-ai-hint={selectedAdDetail.imageHint}
                />
                <p className="text-sm text-muted-foreground">{t(`classifieds.items.${selectedAdDetail.titleKey}.description`).replace('{price}', formatCurrency(selectedAdDetail.price))}</p>
              </div>
              <DialogFooter>
                <Button asChild className="w-full">
                  <Link href={generateWhatsAppLink(selectedAdDetail.phone, selectedAdDetail.titleKey)} target="_blank">
                    <MessageSquare className="mr-2" /> {t('classifieds.contactViaWhatsapp')}
                  </Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={isGalleryDetailOpen} onOpenChange={setIsGalleryDetailOpen}>
        <DialogContent className="max-w-3xl">
          {selectedGalleryItem && (
            <>
              <DialogHeader>
                <DialogTitle>{t(`gallery.items.${selectedGalleryItem.titleKey}`)}</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Image
                  src={selectedGalleryItem.image}
                  alt={t(`gallery.items.${selectedGalleryItem.titleKey}`)}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-md"
                  data-ai-hint={selectedGalleryItem.imageHint}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="flex flex-col min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex items-center h-14 max-w-screen-2xl">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Image
                src="/images/logo.png"
                width={30}
                height={30}
                alt="Pantau Warga Logo"
                data-ai-hint="logo"
              />
              <span className="font-headline">{t('landing.header.title')}</span>
            </Link>
            <nav className="ml-auto">
              <Button asChild>
                <Link href="/login">{t('landing.header.login')}</Link>
              </Button>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
            <div className="flex max-w-[980px] flex-col items-start gap-2">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl font-headline">
                {t('landing.hero.title')}
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
                {t('landing.hero.subtitle')}
              </p>
            </div>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/login">{t('landing.hero.cta')}</Link>
              </Button>
            </div>
          </section>

          {/* Announcements Section */}
          <section className="container py-12">
              <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold tracking-tight font-headline">{t('landing.announcements.latest')}</h2>
                  <p className="text-muted-foreground">{t('landing.announcements.latest_description')}</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {latestAnnouncements.map((announcement) => (
                    <Card key={announcement.id} className="flex flex-col transition-all duration-300 hover:shadow-lg">
                        <CardHeader className="cursor-pointer" onClick={() => handleViewAnnouncement(announcement)}>
                          <div className="flex items-start justify-between">
                              <div>
                                  <CardTitle className="text-xl font-headline">{announcement.title}</CardTitle>
                                  <CardDescription>{new Date(announcement.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                              </div>
                              <div className="p-3 rounded-full bg-primary/10 text-primary">
                                  <Bell className="w-6 h-6" />
                              </div>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <p className="text-muted-foreground line-clamp-4">{announcement.content}</p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="link" asChild className="p-0">
                            <Link href="/announcements">Read More</Link>
                          </Button>
                        </CardFooter>
                    </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                  <Button variant="outline" asChild>
                      <Link href="/announcements">{t('landing.announcements.view_all')}</Link>
                  </Button>
              </div>
          </section>

          {/* Classifieds Section */}
          <section className="w-full py-12 bg-secondary">
            <div className="container">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight font-headline">{t('landing.classifieds.title')}</h2>
                    <p className="text-muted-foreground">{t('landing.classifieds.description')}</p>
                </div>
                <Carousel
                  plugins={[autoplayPlugin.current]}
                  opts={{ align: "start", loop: true, }}
                  className="w-full"
                >
                  <CarouselContent>
                    {activeClassifieds.map((item) => (
                      <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                        <div className="p-1">
                          <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg">
                            <CardHeader className="p-0 cursor-pointer" onClick={() => handleViewAd(item)}>
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
                            </CardContent>
                            <CardFooter>
                              <Button asChild className="w-full">
                                <Link href={generateWhatsAppLink(item.phone, item.titleKey)} target="_blank">
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
                <div className="mt-8 text-center">
                    <Button variant="outline" asChild>
                        <Link href="/classifieds">{t('landing.classifieds.view_all')}</Link>
                    </Button>
                </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="container py-12">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight font-headline">{t('landing.gallery.title')}</h2>
              <p className="text-muted-foreground">{t('landing.gallery.description')}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {gallery.slice(0, 4).map((item) => (
                <div key={item.id} onClick={() => handleViewGalleryItem(item)} className="relative block w-full overflow-hidden rounded-lg cursor-pointer group aspect-video">
                  <Image
                    src={item.image}
                    alt={t(`gallery.items.${item.titleKey}`)}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={item.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="font-bold text-white font-headline">{t(`gallery.items.${item.titleKey}`)}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild>
                <Link href="/gallery">{t('landing.gallery.cta')}</Link>
              </Button>
            </div>
          </section>
        </main>

        <footer className="py-6 border-t border-border/40">
          <div className="container text-center text-muted-foreground">
            <p className="text-sm">{t('landing.footer.copyright', { year: new Date().getFullYear() })}</p>
          </div>
        </footer>
      </div>
    </>
  );
}
