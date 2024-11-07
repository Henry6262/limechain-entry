'use client'

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { config } from '../config/wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import { BlockchainProvider } from '@/context/BlockchainContext';

const queryClient = new QueryClient();

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider refetchInterval={0}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
        <BlockchainProvider>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider>
              {children}
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
          </BlockchainProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
};

export default Wrapper;
