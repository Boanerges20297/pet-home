
"use client"

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { PawPrint, Store, Gift, Home, LogOut, Dog, HandHeart, Settings, BrainCircuit, FolderHeart, Gamepad2, Stethoscope, MessageSquareHeart, LifeBuoy } from 'lucide-react';
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
                <Link href="/home">
                    <SidebarMenuButton tooltip="Ver filhotes à venda">
                        <PawPrint />
                        <span>Filhotes à Venda</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => router.push('/home/minha-colecao')} tooltip="Ver sua coleção">
                <>
                  <FolderHeart />
                  <span>Minha Coleção</span>
                  {ownedPets.length > 0 && <Badge className="ml-auto flex h-6 w-6 items-center justify-center p-0">{ownedPets.length}</Badge>}
                </>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <Link href="/home/pet-rescue">
                    <SidebarMenuButton tooltip="Resgate um filhote">
                        <LifeBuoy />
                        <span>Pet Rescue</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/home/quiz">
                    <SidebarMenuButton tooltip="Teste seus conhecimentos">
                        <BrainCircuit />
                        <span>Quiz</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                 <Link href="/home/petshop">
                    <SidebarMenuButton tooltip="Visitar o Petshop">
                        <Store />
                        <span>Petshop</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/home/premios-diarios">
                    <SidebarMenuButton tooltip="Coletar prêmios diários">
                        <Gift />
                        <span>Prêmios Diários</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <Link href="/home/adocao">
                    <SidebarMenuButton tooltip="Adocao com IA">
                        <MessageSquareHeart />
                        <span>Adoção com IA</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/home/colecionar">
                    <SidebarMenuButton tooltip="Escolha um lar para seu filhote">
                        <Home />
                        <span>Lares para seu Filhote</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/home/passear">
                    <SidebarMenuButton tooltip="Passear com seu filhote">
                        <Dog />
                        <span>Passear com seu Filhote</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/home/interagir">
                    <SidebarMenuButton tooltip="Interagir com seu filhote">
                        <HandHeart />
                        <span>Interagir com seu Filhote</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/home/exames">
                    <SidebarMenuButton tooltip="Fazer um check-up no seu filhote">
                        <Stethoscope />
                        <span>Fazer Exames</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <Link href="/home/minigames">
                    <SidebarMenuButton tooltip="Jogue minigames divertidos">
                        <Gamepad2 />
                        <span>Minigames</span>
                    </SidebarMenuButton>
                </Link>
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
