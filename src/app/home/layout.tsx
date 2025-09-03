
"use client"

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PawPrint, ShoppingCart, Gift, Home, LogOut } from 'lucide-react';
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
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { PlayerProvider } from '@/context/PlayerContext';
import { Toaster } from '@/components/ui/toaster';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <PlayerProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Link href="/home" className="flex items-center gap-2">
                <PawPrint className="h-8 w-8 text-primary" />
                <h2 className="font-headline text-2xl text-foreground">Pequenos Grandes Filhotes</h2>
              </Link>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Ver filhotes à venda">
                  <Link href="/home">
                    <PawPrint />
                    <span>Filhotes à Venda</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Visitar a loja">
                  <Link href="/home/loja">
                    <ShoppingCart />
                    <span>Loja</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Coletar prêmios diários">
                  <Link href="/home/premios-diarios">
                    <Gift />
                    <span>Prêmios Diários</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Escolha um lar para seu filhote">
                  <Link href="/home/colecionar">
                    <Home />
                    <span>Lares para seu Filhote</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarSeparator />
            <SidebarMenu>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Voltar para a página inicial">
                        <Link href="/">
                            <LogOut />
                            <span>Sair do Jogo</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1">
               {/* Can add a user menu or search here later */}
            </div>
          </header>
          {children}
           <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </PlayerProvider>
  );
}
