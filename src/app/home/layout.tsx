
"use client"

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { PawPrint, ShoppingCart, Gift, Home, LogOut, Dog, HandHeart, Settings, BrainCircuit, FolderHeart, Gamepad2 } from 'lucide-react';
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
import { PlayerProvider, usePlayer } from '@/context/PlayerContext';
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
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';


function UserProfile() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
      
      const handleStorageChange = () => {
        const updatedUsername = localStorage.getItem('username');
        setUsername(updatedUsername);
      };

      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Avatar>
            <AvatarFallback>{username ? username.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{username ? username : 'Minha Conta'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
            <Link href="/home/settings">
              <Settings className="mr-2" />
              Configurações
            </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/">
              <LogOut className="mr-2" />
              Sair
            </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MainSidebar() {
    const { ownedPets } = usePlayer();
    const router = useRouter();

    return (
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
                <SidebarMenuButton onClick={() => router.push('/home/minha-colecao')} tooltip="Ver sua coleção de filhotes">
                    <FolderHeart />
                    <span>Minha Coleção</span>
                    {ownedPets.length > 0 && <Badge className="ml-auto flex h-6 w-6 items-center justify-center p-0">{ownedPets.length}</Badge>}
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
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Jogue minigames divertidos">
                <Link href="/home/minigames">
                  <Gamepad2 />
                  <span>Minigames</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Teste seus conhecimentos">
                <Link href="/home/quiz">
                  <BrainCircuit />
                  <span>Quiz</span>
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
                      </Link>                  </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    )
}

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <PlayerProvider>
      <SidebarProvider>
        <MainSidebar />
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1" />
            <UserProfile />
          </header>
          {children}
           <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </PlayerProvider>
  );
}
