
"use client"

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth, firebaseReady } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { useI18n } from "@/context/i18n-provider"
import { useAuth } from "@/context/auth-provider";
import { Badge } from "./ui/badge";

export function UserNav() {
  const { t, locale, setLocale, currency, setCurrency } = useI18n();
  const { user, role } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    if (!firebaseReady || !auth) {
      toast({
          variant: "destructive",
          title: "Error",
          description: "Firebase is not configured.",
      });
      return;
    }
    await signOut(auth);
  };

  if (!user) {
    return (
      <Button asChild>
        <Link href="/login">{t('auth.login.title')}</Link>
      </Button>
    )
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "CS";
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL || `https://placehold.co/40x40/A7D1AB/000000?text=${getInitials(user.displayName)}`} alt={user.displayName || "User"} data-ai-hint="person" />
            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div>
              <p className="text-sm font-medium leading-none">{user.displayName || 'Resident'}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
             {role && (
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{t('userNav.role')}:</span>
                    <Badge variant="secondary" className="px-2 py-0.5 text-xs">{t(`userNav.roles.${role}`)}</Badge>
                </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/main/profile">{t('userNav.profile')}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {t('userNav.settings')}
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t('userNav.theme')}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">{t('userNav.light')}</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">{t('userNav.dark')}</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">{t('userNav.system')}</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t('userNav.language')}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={locale} onValueChange={(value) => setLocale(value as 'id' | 'en')}>
                  <DropdownMenuRadioItem value="id">{t('userNav.indonesian')}</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="en">{t('userNav.english')}</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t('userNav.currency')}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={currency} onValueChange={(value) => setCurrency(value as 'IDR' | 'USD')}>
                  <DropdownMenuRadioItem value="IDR">IDR</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="USD">USD</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          {t('auth.logout')}
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
