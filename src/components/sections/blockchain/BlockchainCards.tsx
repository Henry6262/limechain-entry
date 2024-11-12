import React from 'react';
import { Wallet, Box, Link, Fuel } from 'lucide-react';
import BlockchainCard from './BlockchainCard';
import HOCBlockchainCard from './HocBlockchainCard';
import { useBlockchainData } from '@/lib/fetchStaticBlockchainData';

export default function BlockchainCards() {
  const {
    gasPriceData,
    balanceData,
    chainId,
    transactionCount,
    errors,
  } = useBlockchainData();

  return (
    <div className="space-y-6 md:col-start-2">
      <div className="grid grid-cols-2 gap-4">
        <HOCBlockchainCard
          title="Block Tracker"
          icon={<Box className="h-4 w-4 mr-2 text-tertiary" />}
        />
        <BlockchainCard
          title="Chain ID"
          icon={<Link className="h-4 w-4 mr-2 text-tertiary" />}
          value={chainId || 'Loading...'}
          subValue="Ethereum Mainnet"
        />
        <BlockchainCard
          title="Gas Price"
          icon={<Fuel className="h-4 w-4 mr-2 text-tertiary" />}
          value={`${(Number(gasPriceData) / 1e9).toFixed(2)} Gwei`}
        />
        <BlockchainCard
          title="Balance"
          icon={<Wallet className="h-4 w-4 mr-2 text-primary" />}
          value={`${balanceData?.formatted || 'Loading...'} ETH`}
          subValue="≈ $925.50 USD"
        />
      </div>
    </div>
  );
}
