
"use client"

import { usePathname } from 'next/navigation';
import {
  Briefcase,
  Calendar,
  FileWarning,
  LayoutDashboard,
  Shield,
  ShoppingBag,
  Users,
  Banknote,
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
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
              <SidebarMenuButton href="/" isActive={isActive('/', true)}>
                <LayoutDashboard />
                {t('sidebar.announcements')}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/residents" isActive={isActive('/residents')}>
                <Users />
                {t('sidebar.residents')}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/association-management" isActive={isActive('/association-management')}>
                <Briefcase />
                {t('sidebar.associationManagement')}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarGroup>
              <SidebarMenuButton>
                <Banknote /> {t('sidebar.finance')}
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="/ipl-management" isActive={isActive('/ipl-management')}>
                    {t('sidebar.iplManagement')}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="/payment-confirmation" isActive={isActive('/payment-confirmation')}>
                    {t('sidebar.paymentConfirmation')}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="/financial-report" isActive={isActive('/financial-report')}>
                    {t('sidebar.financialReport')}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarGroup>
            <SidebarMenuItem>
              <SidebarMenuButton href="/classifieds" isActive={isActive('/classifieds')}>
                <ShoppingBag />
                {t('sidebar.classifieds')}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/events" isActive={isActive('/events')}>
                <Calendar />
                {t('sidebar.events')}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/report-issue" isActive={isActive('/report-issue')}>
                <FileWarning />
                {t('sidebar.reportIssue')}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarGroup>
              <SidebarMenuButton>
                <Shield /> {t('sidebar.security')}
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="/security/schedule" isActive={isActive('/security/schedule')}>
                    {t('sidebar.schedule')}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="/security/management" isActive={isActive('/security/management')}>
                    {t('sidebar.management')}
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
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
