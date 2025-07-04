
"use client"

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Briefcase,
  Calendar,
  AlertTriangle,
  LayoutGrid,
  ShoppingBag,
  Users,
  Camera,
  Heart,
  Receipt,
  ClipboardCheck,
  BarChart,
  Clock,
  ShieldCheck,
  Trash2,
  ClipboardList,
  Home,
  PlusSquare,
  MessagesSquare,
  BadgeCheck,
  UserCog,
  Car
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
            <Link href="/main/announcements">
              <Image
                src="/images/logo.png"
                width={150}
                height={50}
                alt="Pantau Warga Logo"
                data-ai-hint="logo"
              />
            </Link>
          </SidebarHeader>
          <SidebarMenu>
            <SidebarGroup>
                <SidebarGroupLabel>{t('sidebar.general')}</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/main/announcements" isActive={isActive('/main/announcements', true)} tooltip={t('sidebar.announcements')}>
                    <LayoutGrid />
                    {t('sidebar.announcements')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/main/classifieds" isActive={isActive('/main/classifieds')} tooltip={t('sidebar.classifieds')}>
                    <ShoppingBag />
                    {t('sidebar.classifieds')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/main/post-ad" isActive={isActive('/main/post-ad')} tooltip={t('sidebar.postAd')}>
                    <PlusSquare />
                    {t('sidebar.postAd')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton href="/main/events" isActive={isActive('/main/events')} tooltip={t('sidebar.events')}>
                    <Calendar />
                    {t('sidebar.events')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton href="/main/gallery" isActive={isActive('/main/gallery')} tooltip={t('sidebar.gallery')}>
                      <Camera />
                      {t('sidebar.gallery')}
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/main/report-issue" isActive={isActive('/main/report-issue')} tooltip={t('sidebar.reportIssue')}>
                    <AlertTriangle />
                    {t('sidebar.reportIssue')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton href="/main/curhat-warga" isActive={isActive('/main/curhat-warga')} tooltip={t('sidebar.curhatWarga')}>
                    <Heart />
                    {t('sidebar.curhatWarga')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/main/whatsapp-feed" isActive={isActive('/main/whatsapp-feed')} tooltip={t('sidebar.whatsappFeed')}>
                    <MessagesSquare />
                    {t('sidebar.whatsappFeed')}
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>{t('sidebar.finance')}</SidebarGroupLabel>
              <SidebarMenuItem>
                <SidebarMenuButton href="/main/payment-confirmation" isActive={isActive('/main/payment-confirmation')} tooltip={t('sidebar.paymentConfirmation')}>
                  <ClipboardCheck />
                  {t('sidebar.paymentConfirmation')}
                </SidebarMenuButton>
              </SidebarMenuItem>
              {hasAdminAccess && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/main/ipl-management" isActive={isActive('/main/ipl-management')} tooltip={t('sidebar.iplManagement')}>
                      <Receipt />
                      {t('sidebar.iplManagement')}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/main/financial-report" isActive={isActive('/main/financial-report')} tooltip={t('sidebar.financialReport')}>
                      <BarChart />
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
                    <SidebarMenuButton href="/main/residents" isActive={isActive('/main/residents')} tooltip={t('sidebar.residents')}>
                      <Users />
                      {t('sidebar.residents')}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/main/association-management" isActive={isActive('/main/association-management')} tooltip={t('sidebar.associationManagement')}>
                      <Briefcase />
                      {t('sidebar.associationManagement')}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/main/staff-management" isActive={isActive('/main/staff-management')} tooltip={t('sidebar.staffManagement')}>
                        <UserCog />
                        {t('sidebar.staffManagement')}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton href="/main/classifieds-management" isActive={isActive('/main/classifieds-management')} tooltip={t('sidebar.classifiedsManagement')}>
                        <ClipboardList />
                        {t('sidebar.classifiedsManagement')}
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton href="/main/ad-review" isActive={isActive('/main/ad-review')} tooltip={t('sidebar.adReview')}>
                        <BadgeCheck />
                        {t('sidebar.adReview')}
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/main/waste-management" isActive={isActive('/main/waste-management')} tooltip={t('sidebar.wasteManagement')}>
                      <Trash2 />
                      {t('sidebar.wasteManagement')}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/main/vehicle-management" isActive={isActive('/main/vehicle-management')} tooltip={t('sidebar.vehicleManagement')}>
                      <Car />
                      {t('sidebar.vehicleManagement')}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>{t('sidebar.security')}</SidebarGroupLabel>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/main/security/schedule" isActive={isActive('/main/security/schedule')} tooltip={t('sidebar.schedule')}>
                      <Clock />
                      {t('sidebar.schedule')}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/main/security/management" isActive={isActive('/main/security/management')} tooltip={t('sidebar.management')}>
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
