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
  DollarSign,
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

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
                Announcements
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/residents" isActive={isActive('/residents')}>
                <Users />
                Residents
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/association-management" isActive={isActive('/association-management')}>
                <Briefcase />
                Pengurus Paguyuban
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/ipl-management" isActive={isActive('/ipl-management')}>
                <DollarSign />
                Iuran IPL
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/classifieds" isActive={isActive('/classifieds')}>
                <ShoppingBag />
                Classifieds
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/events" isActive={isActive('/events')}>
                <Calendar />
                Events
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/report-issue" isActive={isActive('/report-issue')}>
                <FileWarning />
                Report Issue
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarGroup>
              <SidebarMenuButton>
                <Shield /> Security
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="/security/schedule" isActive={isActive('/security/schedule')}>
                    Schedule
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton href="/security/management" isActive={isActive('/security/management')}>
                    Management
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
