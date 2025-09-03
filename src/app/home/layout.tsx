
"use client"

import type { ReactNode } from 'react';
import Link from 'next/link';
import { PawPrint, ShoppingCart, Gift, Home, LogOut, Dog, HandHeart, Settings } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


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
             <div className="flex items-center gap-3 border-t border-b border-sidebar-border p-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop" alt="Avatar" />
                <AvatarFallback>LH</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-semibold text-sidebar-foreground">Luzia Heleno</p>
                <p className="text-xs text-sidebar-foreground/70">luzia.heleno@exemplo.com</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Configurações</DropdownMenuItem>
                  <DropdownMenuItem>Suporte</DropdownMenuItem>
                  <DropdownMenuSeparator />
                   <DropdownMenuItem asChild>
                     <Link href="/">Sair</Link>
                   </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Passear com seu filhote">
                  <Link href="/home/passear">
                    <Dog />
                    <span>Passear com seu Filhote</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Interagir com seu filhote">
                  <Link href="/home/interagir">
                    <HandHeart />
                    <span>Interagir com seu Filhote</span>
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
