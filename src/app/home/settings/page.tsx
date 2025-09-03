
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setUsername(storedUsername);
    setNewUsername(storedUsername);
  }, []);

  const handleSaveUsername = () => {
    if (newUsername.trim() === '') {
      toast({
        title: 'Nome de usuário inválido',
        description: 'O nome de usuário não pode estar em branco.',
        variant: 'destructive',
      });
      return;
    }
    localStorage.setItem('username', newUsername);
    setUsername(newUsername);
    // Dispara um evento de storage para que o layout possa atualizar o nome
    window.dispatchEvent(new Event('storage'));
    toast({
      title: 'Sucesso!',
      description: 'Seu nome de usuário foi atualizado.',
    });
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Link href="/home" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Configurações</CardTitle>
            <CardDescription>Gerencie as configurações da sua conta e do jogo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Seção de Perfil */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Perfil</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Nome de Usuário</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="username"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="Seu nome de jogador"
                    />
                    <Button onClick={handleSaveUsername}>Salvar</Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Seção de Notificações */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Notificações</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Notificações do jogo</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba alertas sobre prêmios e eventos.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Notificações de amigos</Label>
                    <p className="text-sm text-muted-foreground">
                      Seja avisado quando amigos enviarem presentes. (Em breve)
                    </p>
                  </div>
                  <Switch disabled />
                </div>
              </div>
            </div>

            <Separator />

            {/* Seção de Aparência */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Aparência</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label>Modo Escuro</Label>
                    <p className="text-sm text-muted-foreground">
                      Ative para uma experiência com cores escuras. (Em breve)
                    </p>
                  </div>
                  <Switch disabled />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Algumas configurações serão implementadas em futuras atualizações.
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
