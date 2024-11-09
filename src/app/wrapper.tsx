'use client'

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { config } from '../config/wagmi';
import '@rainbow-me/rainbowkit/styles.css';

// Configure the QueryClient with refetchOnWindowFocus set to false
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable automatic refetching on window focus
    },
  },
});

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <WagmiProvider config={config} >
        <QueryClientProvider client={queryClient}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider>
              {children}
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
};

export default Wrapper;
