"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SplashScreen } from '@/components/splash-screen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, ShoppingBag, FileWarning } from 'lucide-react';
import { useI18n } from '@/context/i18n-provider';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Splash screen duration
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center h-14">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Image
              src="https://placehold.co/30x30.png"
              width={30}
              height={30}
              alt="Cimahpar Hub Logo"
              data-ai-hint="logo"
            />
            <span>{t('landing.header.title')}</span>
          </Link>
          <nav className="ml-auto">
            <Button asChild>
              <Link href="/announcements">{t('landing.header.login')}</Link>
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
            <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl font-headline">
              {t('landing.features.title')}
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
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
      </main>

      <footer className="py-6 border-t bg-secondary">
        <div className="container text-center text-muted-foreground">
          <p>{t('landing.footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
}
