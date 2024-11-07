'use client'

import React, { useEffect, useState } from 'react';
import { watchBlocks } from '@wagmi/core';
import { config } from '../../../config/wagmi';
import BlockchainCard from './BlockchainCard';

interface BlockchainCardWithDataProps {
  title: string;
  icon: React.ReactNode;
}

export default function HocBlockchainCard({ title, icon }: BlockchainCardWithDataProps) {
  const [blockNumber, setBlockNumber] = useState<string>('Loading...');
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [prevTransactionCount, setPrevTransactionCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    const unwatch = watchBlocks(config, {
      onBlock: (block) => {
        setError(null);
        setBlockNumber(block.number.toString());
        const currentTransactionCount = block.transactions.length;
        setPrevTransactionCount(transactionCount);
        setTransactionCount(currentTransactionCount);
        setIsAnimating(true);

        console.log('Block changed!', block);

        // Reset animation after 1 second
        setTimeout(() => setIsAnimating(false), 1000);
      },
      onError: (error) => {
        setError('Error fetching block number');
        console.error('Block error', error);
      },
    });

    return () => {
      unwatch();
    };
  }, [transactionCount]);

  const transactionChange = transactionCount - prevTransactionCount;
  const transactionChangeIndicator = transactionChange > 0 ? '↑' : transactionChange < 0 ? '↓' : '';
  const changeColor = transactionChange > 0 ? 'text-green-400' : transactionChange < 0 ? 'text-red-400' : 'text-gray-400';

  return (
    <BlockchainCard
      title={title}
      icon={icon}
      value={error ? 'Waiting for new block...' : blockNumber}
      subValue={
        <div className="flex items-center">
          <span className="mr-2 text-xs text-gray-400">Transactions:</span>
          <span className={`text-xs font-medium ${changeColor} transition-all duration-300 ease-in-out ${isAnimating ? 'scale-110' : 'scale-100'}`}>
            {transactionCount}
          </span>
          <span className={`ml-1 text-xs ${changeColor} transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
            {transactionChangeIndicator}
          </span>
        </div>
      }
    />
  );
}