'use client'

import { useState, useMemo, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent } from '@/components/ui/card';
import { completeQuest } from '@/lib/handler-quest-completion';
import { addActivity } from '@/lib/handler-user-activity';
import { useTokenData } from '@/lib/fetch-token-data';
import { ExtendedSession } from '@/pages/api/auth/[...nextauth]';
import { supportedChains } from '@/lib/helpers/tokenAssetData';
import { TokenHeader } from './token-overview/token-header';
import { TokenQuickSelect } from './token-overview/token-quick-select';
import { TokenAddressInput } from './token-overview/token-address-input';
import { TokenDataDisplay } from './token-overview/token-data-display';

export default function TokenInfo() {
  const { data: session } = useSession() as { data: ExtendedSession };
  const walletAddress = session?.address;

  const [tokenAddress, setTokenAddress] = useState('');
  const [selectedChain, setSelectedChain] = useState(supportedChains[0]);
  const [hasProcessedData, setHasProcessedData] = useState(false);

  const { tokenData, tokenError, tokenLoading, balanceData, balanceError, balanceLoading } = useTokenData({
    tokenAddress,
    chainId: selectedChain.id,
    walletAddress,
  });

  useEffect(() => {
    if (tokenAddress && !hasProcessedData) {
      addActivity({
        type: 'fetch token',
        action: 'search',
        datetime: new Date().toISOString(),
        details: tokenData?.symbol || '',
      });

      completeQuest(2);
      setHasProcessedData(true);
    }
  }, [tokenAddress, hasProcessedData, tokenData]);

  const displayBalance = useMemo(() => {
    if (balanceLoading) return 'Loading...';
    if (balanceError) return 'Error fetching balance';
    return balanceData?.formatted || 'N/A';
  }, [balanceData, balanceError, balanceLoading]);

  const handleChainChange = (chain: typeof supportedChains[0]) => {
    setSelectedChain(chain);
    setTokenAddress('');
    setHasProcessedData(false);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData('Text');
    setTokenAddress(pastedText);
    setHasProcessedData(false);
  };

  return (
    <Card className="overflow-hidden h-full md:row-span-1 shadow-lg">
      <TokenHeader />
      <CardContent className="p-6 pb-12 space-y-8">
        <TokenQuickSelect
          selectedChain={selectedChain}
          setTokenAddress={setTokenAddress}
          setHasProcessedData={setHasProcessedData}
        />
        <TokenAddressInput
          tokenAddress={tokenAddress}
          setTokenAddress={setTokenAddress}
          handlePaste={handlePaste}
          selectedChain={selectedChain}
          handleChainChange={handleChainChange}
        />
        <TokenDataDisplay
          tokenLoading={tokenLoading}
          balanceLoading={balanceLoading}
          tokenError={!!tokenError}
          balanceError={!!balanceError}
          tokenData={tokenData}
          displayBalance={displayBalance}
        />
      </CardContent>
    </Card>
  );
}