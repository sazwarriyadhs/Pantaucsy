
"use client"

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Briefcase,
  Calendar,
  FileWarning,
  LayoutDashboard,
  ShoppingBag,
  Users,
  Camera,
  HeartHandshake,
  Receipt,
  ClipboardCheck,
  LineChart,
  CalendarClock,
  ShieldCheck,
  Trash2,
  ClipboardList,
  Home,
  PlusSquare,
  MessageCircle,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { useI18n } from '@/context/i18n-provider';
import { useAuth } from '@/context/auth-provider';
import { useEffect } from 'react';
import { SplashScreen } from '@/components/splash-screen';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useI18n();
  const { user, loading, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  if (loading || !user || !role) {
    return <SplashScreen />;
  }

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return pathname === path;
    }
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };
  
  const hasAdminAccess = role === 'admin' || role === 'superadmin';
  const hasSuperAdminAccess = role === 'superadmin';

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarHeader className="flex items-center justify-center p-4">
            <Link href="/announcements">
              <Image
                src="/images/logo.png"
                width={150}
                height={50}
                alt="Cimahpar Hub Logo"
                data-ai-hint="logo"
              />
            </Link>
          </SidebarHeader>
          <SidebarMenu>
            <SidebarGroup>
                <SidebarGroupLabel>{t('sidebar.general')}</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/announcements" isActive={isActive('/announcements', true)} tooltip={t('sidebar.announcements')}>
                    <LayoutDashboard />
                    {t('sidebar.announcements')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/classifieds" isActive={isActive('/classifieds')} tooltip={t('sidebar.classifieds')}>
                    <ShoppingBag />
                    {t('sidebar.classifieds')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/post-ad" isActive={isActive('/post-ad')} tooltip={t('sidebar.postAd')}>
                    <PlusSquare />
                    {t('sidebar.postAd')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton href="/events" isActive={isActive('/events')} tooltip={t('sidebar.events')}>
                    <Calendar />
                    {t('sidebar.events')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="/gallery" isActive={isActive('/gallery')} tooltip={t('sidebar.gallery')}>
                      <Camera />
                      {t('sidebar.gallery')}
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/report-issue" isActive={isActive('/report-issue')} tooltip={t('sidebar.reportIssue')}>
                    <FileWarning />
                    {t('sidebar.reportIssue')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton href="/curhat-warga" isActive={isActive('/curhat-warga')} tooltip={t('sidebar.curhatWarga')}>
                    <HeartHandshake />
                    {t('sidebar.curhatWarga')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/whatsapp-feed" isActive={isActive('/whatsapp-feed')} tooltip={t('sidebar.whatsappFeed')}>
                    <MessageCircle />
                    {t('sidebar.whatsappFeed')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>{t('sidebar.finance')}</SidebarGroupLabel>
              <SidebarMenuItem>
                <SidebarMenuButton href="/payment-confirmation" isActive={isActive('/payment-confirmation')} tooltip={t('sidebar.paymentConfirmation')}>
                  <ClipboardCheck />
                  {t('sidebar.paymentConfirmation')}
                </SidebarMenuButton>
              </SidebarMenuItem>
              {hasAdminAccess && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/ipl-management" isActive={isActive('/ipl-management')} tooltip={t('sidebar.iplManagement')}>
                      <Receipt />
                      {t('sidebar.iplManagement')}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/financial-report" isActive={isActive('/financial-report')} tooltip={t('sidebar.financialReport')}>
                      <LineChart />
                      {t('sidebar.financialReport')}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarGroup>

            {hasAdminAccess && (
              <>
                <SidebarGroup>
                  <SidebarGroupLabel>{t('sidebar.management_tools')}</SidebarGroupLabel>
                   <SidebarMenuItem>
                    <SidebarMenuButton href="/residents" isActive={isActive('/residents')} tooltip={t('sidebar.residents')}>
                      <Users />
                      {t('sidebar.residents')}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/association-management" isActive={isActive('/association-management')} tooltip={t('sidebar.associationManagement')}>
                      <Briefcase />
                      {t('sidebar.associationManagement')}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton href="/classifieds-management" isActive={isActive('/classifieds-management')} tooltip={t('sidebar.classifiedsManagement')}>
                        <ClipboardList />
                        {t('sidebar.classifiedsManagement')}
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/waste-management" isActive={isActive('/waste-management')} tooltip={t('sidebar.wasteManagement')}>
                      <Trash2 />
                      {t('sidebar.wasteManagement')}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>{t('sidebar.security')}</SidebarGroupLabel>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/security/schedule" isActive={isActive('/security/schedule')} tooltip={t('sidebar.schedule')}>
                      <CalendarClock />
                      {t('sidebar.schedule')}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/security/management" isActive={isActive('/security/management')} tooltip={t('sidebar.management')}>
                      <ShieldCheck />
                      {t('sidebar.management')}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarGroup>
              </>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton href="/" tooltip={t('sidebar.landingPage')}>
                    <Home />
                    {t('sidebar.landingPage')}
                </SidebarMenuButton>
              </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b bg-background">
          <SidebarTrigger className="md:hidden" />
          <div className="ml-auto">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
