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
              <SidebarMenuButton asChild tooltip="Procurar por pets">
                <Link href="/home">
                  <Search />
                  <span>Procurar</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Encontrar abrigos">
                <Link href="#">
                  <MapPin />
                  <span>Abrigos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Tours Virtuais">
                <Link href="#">
                  <Video />
                  <span>Tour Virtual</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Formulário de Adoção">
                <Link href="#">
                  <FileText />
                  <span>Adotar</span>
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
