'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SplashScreen } from '@/components/splash-screen';

export default function AppPage() {
  const router = useRouter();

  useEffect(() => {
    // This page is a fallback, redirect to the main authenticated page.
    router.replace('/announcements');
  }, [router]);

  // Return a loading state while redirecting
  return <SplashScreen />;
}
