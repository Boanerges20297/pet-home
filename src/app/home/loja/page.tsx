
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Gem, Zap, CreditCard, Banknote, QrCode } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { usePlayer } from '@/context/PlayerContext';

const storeItems = [
  {
    id: 'coins_small',
    name: 'Pacote de Moedas Pequeno',
    description: 'Um punhado de moedas para começar sua jornada.',
    price: 'R$ 4,99',
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
    imageUrl: 'https://images.unsplash.com/photo-1599038988300-2e3f04d87f8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtdWl0YXMlMjBtb2VkYXMlMjB8ZW58MHx8fHwxNzU2OTAyNjQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'treasure chest',
    icon: Coins,
    reward: { type: 'coins', amount: 7000 },
  },
  {
    id: 'gem_pack',
    name: 'Pacote de Gemas Raras',
    description: 'Use gemas para adquirir itens exclusivos e filhotes lendários.',
    price: 'R$ 99,99',
    imageUrl: 'https://images.unsplash.com/photo-1673031288723-f198cd527b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxnZW1hcyUyMHJhcmFzfGVufDB8fHx8MTc1NjkwMjY5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'shiny gems',
    icon: Gem,
    reward: { type: 'item', name: 'Pacote de Gemas Raras' },
  },
  {
    id: 'vip_pass',
    name: 'Passe VIP Mensal',
    description: 'Receba recompensas diárias exclusivas, descontos e mais.',
    price: 'R$ 29,99/mês',
    imageUrl: 'https://images.unsplash.com/photo-1625670413987-0ae649494c61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzaW1ib2xvJTIwdmlwfGVufDB8fHx8MTc1NjkwMjc0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'gold ticket',
    icon: Zap,
    reward: { type: 'item', name: 'Passe VIP Mensal' },
  },
   {
    id: 'special_item',
    name: 'Coleira de Diamante',
    description: 'Um item de luxo para o seu filhote mais especial. Mostre seu estilo!',
    price: 'R$ 79,99',
    imageUrl: 'https://images.unsplash.com/photo-1568400738102-646ec2a3c3f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8Y29sZWlyYSUyMGRlJTIwZGlhbWFudGUlMjB8ZW58MHx8fHwxNzU2OTAyNzk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    aiHint: 'diamond collar',
    icon: Gem,
    reward: { type: 'item', name: 'Coleira de Diamante' },
  },
];

type StoreItem = typeof storeItems[0];

export default function LojaPage() {
  const { toast } = useToast();
  const { addCoins } = usePlayer();
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handlePurchase = (item: StoreItem) => {
    setSelectedItem(item);
    setIsPaymentModalOpen(true);
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
                          Comprar por {item.price}
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

    