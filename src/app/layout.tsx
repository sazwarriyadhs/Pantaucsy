import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { I18nProvider } from '@/context/i18n-provider';
import { AuthProvider } from '@/context/auth-provider';

export const metadata: Metadata = {
  title: 'Cimahpar Stoneyard Community Hub',
  description: 'Community Hub for Cimahpar Stoneyard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <I18nProvider>
            {children}
          </I18nProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
