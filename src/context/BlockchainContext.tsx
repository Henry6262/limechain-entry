import React, { createContext, useContext, useEffect, useState } from 'react';
import { useBlockNumber } from 'wagmi';

interface BlockchainContextProps {
  blockNumber: bigint | undefined;
  error: string | null;
}

const BlockchainContext = createContext<BlockchainContextProps | undefined>(undefined);

export const BlockchainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: blockNumber, isError } = useBlockNumber();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isError) {
      setError('Failed to fetch block number');
    }
  }, [isError]);

  return (
    <BlockchainContext.Provider value={{ blockNumber, error }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};