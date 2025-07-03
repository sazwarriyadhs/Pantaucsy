"use client";

import Image from 'next/image';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="animate-pulse-and-fade">
        <Image
          src="/images/logo.png"
          width={128}
          height={128}
          alt="Cimahpar Hub Logo"
          data-ai-hint="logo"
          priority
        />
      </div>
    </div>
  );
}
