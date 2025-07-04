
"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BellIcon, ShoppingBagIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useI18n } from '@/context/i18n-provider';
import { useAuth } from '@/context/auth-provider';
import { SplashScreen } from '@/components/splash-screen';

export default function LandingPage() {
  const { t } = useI18n();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to the dashboard
    if (!loading && user) {
      router.push('/announcements');
    }
  }, [user, loading, router]);
  
  // Show splash screen while loading auth state or if user is being redirected
  if (loading || user) {
    return <SplashScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center h-14 max-w-screen-2xl">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Image
              src="/images/logo.png"
              width={30}
              height={30}
              alt="Cimahpar Hub Logo"
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

        {/* Features Section */}
        <section className="container py-12">
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">{t('landing.features.announcements.title')}</CardTitle>
                  <BellIcon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{t('landing.features.announcements.value')}</div>
                  <p className="text-xs text-muted-foreground">{t('landing.features.announcements.description')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">{t('landing.features.classifieds.title')}</CardTitle>
                  <ShoppingBagIcon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                   <div className="text-lg font-bold">{t('landing.features.classifieds.value')}</div>
                   <p className="text-xs text-muted-foreground">{t('landing.features.classifieds.description')}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">{t('landing.features.reporting.title')}</CardTitle>
                  <ExclamationTriangleIcon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                   <div className="text-lg font-bold">{t('landing.features.reporting.value')}</div>
                   <p className="text-xs text-muted-foreground">{t('landing.features.reporting.description')}</p>
                </CardContent>
              </Card>
            </div>
        </section>
      </main>

      <footer className="py-6 border-t border-border/40">
        <div className="container text-center text-muted-foreground">
          <p className="text-sm">{t('landing.footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
}
