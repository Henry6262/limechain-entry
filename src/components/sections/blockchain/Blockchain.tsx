'use client'

import React from 'react';
import { Wallet, Box, Link, Fuel } from 'lucide-react';
import BlockchainCard from './BlockchainCard';
import HOCBlockchainCard from './HocBlockchainCard';
import TokenInformation from './BlockchainTokenInfo';
import RecentActivity from './BlockchainActivity';
import { useBlockchainData } from '@/lib/fetchStaticBlockchainData';

export default function BlockchainDashboard() {
  const {
    gasPriceData,
    balanceData,
    chainId,
    transactionCount,
    errors,
  } = useBlockchainData();

  return (
    <div className={`min-h-screen `}>
      <div className="flex w-full flex-col text-white">
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Blockchain Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TokenInformation />

            <div className="space-y-6 md:col-start-2">
              <div className="grid grid-cols-2 gap-4">
                <HOCBlockchainCard
                  title="Block Tracker"
                  icon={<Box className="h-4 w-4 mr-2 text-purple-400" />}
                />
                <BlockchainCard
                  title="Chain ID"
                  icon={<Link className="h-4 w-4 mr-2 text-purple-400" />}
                  value={chainId || 'Loading...'}
                  subValue="Ethereum Mainnet"
                />
                <BlockchainCard
                  title="Gas Price"
                  icon={<Fuel className="h-4 w-4 mr-2 text-purple-400" />}
                  value={`${(Number(gasPriceData) / 1e9).toFixed(2)} Gwei`}
                />
                <BlockchainCard
                  title="Balance"
                  icon={<Wallet className="h-4 w-4 mr-2 text-purple-400" />}
                  value={`${balanceData?.formatted || 'Loading...'} ETH`}
                  subValue="≈ $925.50 USD"
                />
              </div>

              <RecentActivity transactionCount={transactionCount} />
            </div>
          </div>
      </div>
    </div>
  );
}