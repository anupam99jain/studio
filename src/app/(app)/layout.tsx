

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset } from "@/components/ui/sidebar";
import { Bot, CalendarCheck, Library, LogOut, Settings, Users, User as UserIcon, HeartPulse, Moon, Sun, Home, Image as ImageIcon, Palette } from "lucide-react";
import Link from "next/link";
import { FlourishULogo } from "@/components/logo";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useAppContext } from "./app-context";
import { useRef, ChangeEvent } from "react";

function UserProfile() {
  const { student, setStudent } = useAppContext();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setTheme, theme } = useTheme();
  
  const handleLogout = () => {
    router.push('/login');
  };

  const handlePictureChangeClick = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudent(prev => ({...prev, avatar: reader.result as string}));
      };
      reader.readAsDataURL(file);
    }
  }

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-12 justify-start gap-2 px-2 w-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={student.avatar} alt="User" />
              <AvatarFallback>{student.name ? student.name.charAt(0) : 'U'}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-sm font-medium">{student.name || 'Student User'}</p>
              <p className="text-xs text-muted-foreground">{student.email}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
           <DropdownMenuItem onClick={handlePictureChangeClick}>
              <ImageIcon className="mr-2 h-4 w-4" />
              <span>Change Picture</span>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Palette className="mr-2 h-4 w-4" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                <DropdownMenuSeparator/>
                <DropdownMenuRadioItem value="green">Green</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark-green">Dark Green</DropdownMenuRadioItem>
                <DropdownMenuSeparator/>
                <DropdownMenuRadioItem value="blue">Blue</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark-blue">Dark Blue</DropdownMenuRadioItem>
                <DropdownMenuSeparator/>
                <DropdownMenuRadioItem value="orange">Orange</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark-orange">Dark Orange</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem onClick={() => setTheme(theme?.includes('dark') ? 'light' : 'dark')}>
            <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span>Toggle Dark Mode</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <FlourishULogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
              <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Home">
                <Link href="/home">
                  <Home />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="AI Chatbot">
                <Link href="/ai-chatbot">
                  <Bot />
                  <span>AI Chatbot</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Counselor Booking">
                <Link href="/counselor-booking">
                  <CalendarCheck />
                  <span>Counselor Booking</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Peer Support Forum">
                <Link href="/peer-support">
                  <Users />
                  <span>Peer Support Forum</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Resource Hub">
                <Link href="/resource-hub">
                  <Library />
                  <span>Resource Hub</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Wearable Monitoring">
                <Link href="/wearable-monitoring">
                  <HeartPulse />
                  <span>Wearable Monitoring</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <UserProfile />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <main className="h-full p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
