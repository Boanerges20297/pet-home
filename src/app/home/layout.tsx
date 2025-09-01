import type { ReactNode } from 'react';
import Link from 'next/link';
import { PawPrint, Search, MapPin, Video, FileText } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Link href="/home" className="flex items-center gap-2">
              <PawPrint className="h-8 w-8 text-primary" />
              <h2 className="font-headline text-2xl text-foreground">PetHome</h2>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Search for pets">
                <Link href="/home">
                  <Search />
                  <span>Search</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Find shelters">
                <Link href="#">
                  <MapPin />
                  <span>Shelters</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Virtual Tours">
                <Link href="#">
                  <Video />
                  <span>Virtual Tour</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Adoption Form">
                <Link href="#">
                  <FileText />
                  <span>Adopt</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
             {/* Can add a user menu or search here later */}
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
