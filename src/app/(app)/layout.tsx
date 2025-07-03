"use client"

import { usePathname } from 'next/navigation';
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
  Trash2
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

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useI18n();

  const isActive = (path: string, exact = false) => {
    return exact ? pathname === path : pathname.startsWith(path);
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarHeader className="p-4">
            <h1 className="text-2xl font-bold text-primary font-headline">
              Cimahpar Hub
            </h1>
          </SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/" isActive={isActive('/', true)} tooltip={t('sidebar.announcements')}>
                <LayoutDashboard />
                {t('sidebar.announcements')}
              </SidebarMenuButton>
            </SidebarMenuItem>
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

            <SidebarGroup className="pt-4">
              <SidebarGroupLabel>{t('sidebar.finance')}</SidebarGroupLabel>
              <SidebarMenuItem>
                <SidebarMenuButton href="/ipl-management" isActive={isActive('/ipl-management')} tooltip={t('sidebar.iplManagement')}>
                  <Receipt />
                  {t('sidebar.iplManagement')}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/payment-confirmation" isActive={isActive('/payment-confirmation')} tooltip={t('sidebar.paymentConfirmation')}>
                  <ClipboardCheck />
                  {t('sidebar.paymentConfirmation')}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/financial-report" isActive={isActive('/financial-report')} tooltip={t('sidebar.financialReport')}>
                  <LineChart />
                  {t('sidebar.financialReport')}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroup>

            <SidebarMenuItem>
              <SidebarMenuButton href="/classifieds" isActive={isActive('/classifieds')} tooltip={t('sidebar.classifieds')}>
                <ShoppingBag />
                {t('sidebar.classifieds')}
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
              <SidebarMenuButton href="/waste-management" isActive={isActive('/waste-management')} tooltip={t('sidebar.wasteManagement')}>
                <Trash2 />
                {t('sidebar.wasteManagement')}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/curhat-warga" isActive={isActive('/curhat-warga')} tooltip={t('sidebar.curhatWarga')}>
                <HeartHandshake />
                {t('sidebar.curhatWarga')}
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarGroup className="pt-4">
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
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 bg-background border-b">
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
