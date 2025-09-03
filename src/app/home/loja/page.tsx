
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Gem, Zap, CreditCard, Banknote, QrCode, Bone, Apple, Beef } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { usePlayer } from '@/context/PlayerContext';

const storeItems = [
  {
    id: 'food_premium',
    name: 'Ração Premium',
    description: 'A melhor ração para seu filhote crescer forte e saudável.',
    price: 150,
    isRealMoney: false,
    imageUrl: 'https://images.unsplash.com/photo-1590083863483-2fde6a617c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwZXQlMjBmb29kfGVufDB8fHx8MTc1NjkxNzI1NHww&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'pet food',
    icon: Beef,
    reward: { type: 'item', id: 'food_premium', name: 'Ração Premium', quantity: 1 },
  },
   {
    id: 'food_biscuit',
    name: 'Biscoito da Sorte',
    description: 'Um biscoito delicioso que dá um bônus de XP para seu filhote.',
    price: 300,
    isRealMoney: false,
    imageUrl: 'https://images.unsplash.com/photo-1623826063426-369de1219b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwZXQlMjB0cmVhdHN8ZW58MHx8fHwxNzU2OTE3MjkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'pet treats',
    icon: Bone,
    reward: { type: 'item', id: 'food_biscuit', name: 'Biscoito da Sorte', quantity: 1 },
  },
  {
    id: 'food_fruits',
    name: 'Frutinhas Silvestres',
    description: 'Um mix de frutas frescas e nutritivas. Um lanche saudável!',
    price: 220,
    isRealMoney: false,
    imageUrl: 'https://images.unsplash.com/photo-1610922434032-936d39a349e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiZXJyaWVzfGVufDB8fHx8MTc1NjkxNzM1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'berries bowl',
    icon: Apple,
    reward: { type: 'item', id: 'food_fruits', name: 'Frutinhas Silvestres', quantity: 1 },
  },
  {
    id: 'coins_small',
    name: 'Pacote de Moedas Pequeno',
    description: 'Um punhado de moedas para começar sua jornada.',
    price: 'R$ 4,99',
    isRealMoney: true,
    imageUrl: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtb2VkYXN8ZW58MHx8fHwxNzU2OTAyNTMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'stack of coins',
    icon: Coins,
    reward: { type: 'coins', amount: 500 },
  },
  {
    id: 'coins_medium',
    name: 'Pacote de Moedas Médio',
    description: 'Uma boa quantidade de moedas para acelerar seu progresso.',
    price: 'R$ 19,99',
    isRealMoney: true,
    imageUrl: 'https://images.unsplash.com/photo-1634108941345-3a6a66685563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8bW9lZGFzfGVufDB8fHx8MTc1NjkwMjUzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'pile of gold',
    icon: Coins,
    reward: { type: 'coins', amount: 2500 },
  },
  {
    id: 'coins_large',
    name: 'Pacote de Moedas Grande',
    description: 'Muitas moedas! Compre os filhotes dos seus sonhos.',
    price: 'R$ 49,99',
    isRealMoney: true,
    imageUrl: 'https://images.unsplash.com/photo-1599038988300-2e3f04d87f8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtdWl0YXMlMjBtb2VkYXMlMjB8ZW58MHx8fHwxNzU2OTAyNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'treasure chest',
    icon: Coins,
    reward: { type: 'coins', amount: 7000 },
  },
];

type StoreItem = typeof storeItems[0];

export default function LojaPage() {
  const { toast } = useToast();
  const { coins, addCoins, addItemToInventory } = usePlayer();
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handlePurchase = (item: StoreItem) => {
    if (item.isRealMoney) {
        setSelectedItem(item);
        setIsPaymentModalOpen(true);
    } else {
        if (coins >= (item.price as number)) {
            addCoins(-(item.price as number));
            if (item.reward.type === 'item') {
                addItemToInventory(item.reward.id, item.reward.name, item.reward.quantity);
            }
            toast({
                title: 'Compra realizada com sucesso!',
                description: `Você adquiriu: ${item.name}`,
            });
        } else {
            toast({
                title: 'Moedas Insuficientes!',
                description: `Você precisa de mais ${item.price as number - coins} moedas.`,
                variant: 'destructive'
            });
        }
    }
  };

  const handleConfirmPayment = () => {
    if (!selectedItem) return;

    if (selectedItem.reward.type === 'coins') {
      addCoins(selectedItem.reward.amount);
    }
    
    toast({
      title: 'Compra realizada com sucesso!',
      description: `Você adquiriu: ${selectedItem.name}`,
    });
    
    setIsPaymentModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="mx-auto max-w-6xl">
          <section className="mb-12 text-center">
            <h1 className="font-headline text-4xl md:text-5xl text-primary mb-4">
              Loja Exclusiva
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Acelere sua coleção e dê um trato nos seus filhotes com nossos itens especiais.
            </p>
          </section>

          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {storeItems.map((item) => (
                <Card key={item.id} className="overflow-hidden flex flex-col">
                  <CardHeader className="p-0">
                      <div className="relative aspect-video w-full">
                          <Image
                              src={item.imageUrl}
                              alt={`Imagem de ${item.name}`}
                              fill
                              className="object-cover"
                              data-ai-hint={item.aiHint}
                          />
                      </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                          <item.icon className="h-6 w-6 text-primary" />
                          <CardTitle className="font-headline text-2xl text-foreground">{item.name}</CardTitle>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 mt-auto">
                      <Button onClick={() => handlePurchase(item)} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold">
                          {item.isRealMoney ? `Comprar por ${item.price}` : (
                              <div className="flex items-center gap-2">
                                  <Coins className="h-5 w-5" />
                                  <span>{item.price}</span>
                              </div>
                          )}
                      </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">Confirmar Pagamento</DialogTitle>
            <DialogDescription>
              Você está comprando <strong>{selectedItem?.name}</strong> por <strong>{selectedItem?.price}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h3 className="mb-4 text-lg font-medium text-foreground">Escolha uma forma de pagamento:</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-base h-12">
                <CreditCard className="mr-3 h-5 w-5" /> Cartão de Crédito
              </Button>
              <Button variant="outline" className="w-full justify-start text-base h-12">
                <QrCode className="mr-3 h-5 w-5" /> PIX
              </Button>
              <Button variant="outline" className="w-full justify-start text-base h-12">
                <Banknote className="mr-3 h-5 w-5" /> Boleto Bancário
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              (Esta é uma simulação. Nenhum valor será cobrado.)
            </p>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsPaymentModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleConfirmPayment}>Confirmar Pagamento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
