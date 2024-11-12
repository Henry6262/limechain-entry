import { Wallet, Coins, Box, ArrowRightLeft } from 'lucide-react';
import { WalletData } from '@/types/types';

interface WalletStatsProps {
  walletData: WalletData;
}

export default function WalletStats({ walletData }: WalletStatsProps) {
  return (
    <div className="bg-secondary p-4 rounded-lg">
      <p className="text-sm font-medium mb-3 flex items-center">
        <Wallet className="mr-2 h-4 w-4" /> Wallet Stats
      </p>
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center">
          <Coins className="h-6 w-6 mb-1 text-yellow-500" />
          <p className="text-xs text-muted-foreground">NFTs</p>
          <p className="text-lg font-semibold">{walletData.nfts}</p>
        </div>
        <div className="flex flex-col items-center">
          <Box className="h-6 w-6 mb-1 text-blue-500" />
          <p className="text-xs text-muted-foreground">Collections</p>
          <p className="text-lg font-semibold">{walletData.collections}</p>
        </div>
        <div className="flex flex-col items-center">
          <ArrowRightLeft className="h-6 w-6 mb-1 text-green-500" />
          <p className="text-xs text-muted-foreground">TXNs</p>
          <p className="text-lg font-semibold">{walletData.transactions.total}</p>
        </div>
      </div>
    </div>
  );
}