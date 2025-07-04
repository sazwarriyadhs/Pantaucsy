
"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Bell, ShoppingBag, FileWarning, MapPin, MessageSquare } from 'lucide-react';
import { useI18n } from '@/context/i18n-provider';
import { announcements, classifieds, gallery } from '@/lib/data';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { useAuth } from '@/context/auth-provider';
import { SplashScreen } from '@/components/splash-screen';

export default function LandingPage() {
  const { t, locale, formatCurrency } = useI18n();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to the dashboard
    if (!loading && user) {
      router.push('/announcements');
    }
  }, [user, loading, router]);
  
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const latestAnnouncements = announcements.slice(0, 3);
  const activeClassifieds = classifieds.filter(ad => ad.status === 'active');
  const galleryItems = gallery.slice(0, 8);

  const generateWhatsAppLink = (phone: string, title: string) => {
    const message = encodeURIComponent(`Halo, saya tertarik dengan "${t(`classifieds.items.${title}`)}" yang Anda iklankan.`);
    return `https://wa.me/${phone}?text=${message}`;
  }

  // Show splash screen while loading auth state or if user is being redirected
  if (loading || user) {
    return <SplashScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center h-14">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Image
              src="/images/logo.png"
              width={30}
              height={30}
              alt="Cimahpar Hub Logo"
              data-ai-hint="logo"
            />
            <span>{t('landing.header.title')}</span>
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
        <section className="container flex flex-col items-center justify-center py-20 text-center md:py-32">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
            {t('landing.hero.title')}
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl mt-6">
            {t('landing.hero.subtitle')}
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/announcements">{t('landing.hero.cta')}</Link>
          </Button>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary md:py-32">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl font-headline">
                {t('landing.features.title')}
              </h2>
            </div>
            <div className="grid gap-8 mt-12 md:grid-cols-3">
              <Card>
                <CardHeader className="items-center">
                  <Bell className="w-10 h-10 text-primary" />
                  <CardTitle>{t('landing.features.announcements.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{t('landing.features.announcements.description')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <ShoppingBag className="w-10 h-10 text-primary" />
                  <CardTitle>{t('landing.features.classifieds.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{t('landing.features.classifieds.description')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <FileWarning className="w-10 h-10 text-primary" />
                  <CardTitle>{t('landing.features.reporting.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{t('landing.features.reporting.description')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Latest Announcements Section */}
        <section className="container py-20 md:py-32">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl font-headline">
                {t('landing.latestNews.title')}
              </h2>
            </div>
            <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
              {latestAnnouncements.map((announcement, index) => {
                return(
                  <Card key={index} className="flex flex-col transition-all duration-300 hover:shadow-lg">
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
                      <CardHeader className="flex flex-row items-center gap-4 pb-4">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                          <Bell className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl font-headline">{announcement.title}</CardTitle>
                          <CardDescription>{new Date(announcement.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                        </div>
                      </CardHeader>
                    )}
                    <CardContent className={`flex-1 flex flex-col ${announcement.image ? 'pt-6' : ''}`}>
                      {announcement.image && (
                        <>
                          <CardTitle className="text-xl font-headline">{announcement.title}</CardTitle>
                          <CardDescription className='mb-4'>{new Date(announcement.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                        </>
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
                )
              })}
            </div>
            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link href="/announcements">{t('landing.latestNews.cta')}</Link>
              </Button>
            </div>
        </section>
        
        {/* Classifieds Section */}
        <section className="py-20 bg-secondary md:py-32">
          <div className="container">
            <div className="text-center">
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
              className="w-full mt-12"
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
                            <Link href={generateWhatsAppLink(item.phone, t(`classifieds.items.${item.titleKey}.title`))}>
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
              <Button size="lg" asChild variant="outline" className='bg-transparent'>
                <Link href="/classifieds">{t('landing.marketplace.cta')}</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="container py-20 md:py-32">
            <div className="text-center">
              <h2 className="text-3xl font-bold md:text-4xl font-headline">
                {t('landing.gallery.title')}
              </h2>
            </div>
            <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                  </CardContent>
                  <CardFooter className="p-4">
                    <CardTitle className="text-lg font-headline">{t(`gallery.items.${item.titleKey}`)}</CardTitle>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link href="/gallery">{t('landing.gallery.cta')}</Link>
              </Button>
            </div>
        </section>

      </main>

      <footer className="py-6 border-t bg-secondary">
        <div className="container text-center text-muted-foreground">
          <p>{t('landing.footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
}
