'use client'

import { useState, useMemo, useEffect } from 'react';
import Lottie from 'react-lottie';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { motion, AnimatePresence } from 'framer-motion';
import { supportedChains } from '@/lib/helpers/tokenAssetData';
import tokenAnimation from '../../../../public/lottie/token.json';
import { completeQuest } from '@/lib/handler-quest-completion';
import { addActivity } from '@/lib/handler-user-activity';
import { useTokenData } from '@/lib/fetch-token-data';

export default function TokenInfo() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [selectedChain, setSelectedChain] = useState(supportedChains[0]);
  const [hasProcessedData, setHasProcessedData] = useState(false);

  const { tokenData, tokenError, tokenLoading, balanceData, balanceError, balanceLoading } = useTokenData({
    tokenAddress,
    chainId: selectedChain.id,
  });

  useEffect(() => {
    if (tokenAddress && !hasProcessedData) {
      // Log the token check activity
      addActivity({
        type: 'fetch token',
        action: 'search',
        datetime: new Date().toISOString(),
        details: tokenData?.symbol || '',
      });

      // Complete the "Use Token Checker" quest
      completeQuest(2);

      // Mark data as processed
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
    setHasProcessedData(false); // Reset processing state on chain change
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData('Text');
    setTokenAddress(pastedText);
    setHasProcessedData(false); // Reset processing state on new paste
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: tokenAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Card className="overflow-hidden md:row-span-1 shadow-lg">
      <CardHeader className="pb-4 pl-0 pt-0 flex-row border-b  flex items-center">
        <div className="flex-shrink-0">
          <Lottie options={defaultOptions} height={80} width={110} />
        </div>
        <CardTitle className="text-3xl font-bold text-[#ffbe00] !mt-6 pl-4">
          Token Checker
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        <div>
          <Label className="text-lg font-medium mb-3 block">Quick Select</Label>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedChain.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex justify-between"
            >
              {selectedChain.tokens.map((token) => (
                <motion.div
                  key={token.symbol}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="outline"
                    className="w-16 h-16 p-0 rounded-full border-2  hover:border-purple-500 transition-all duration-300"
                    onClick={() => {
                      setTokenAddress(token.address);
                      setHasProcessedData(false); // Reset processing state on token select
                    }}
                  >
                    <img src={token.image} alt={token.symbol} className="w-14 h-14 rounded-full" />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <Label htmlFor="token-address" className="text-lg font-medium mb-2 block">Token Address</Label>
            <Input
              id="token-address"
              placeholder="Enter Token Address"
              className="placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500 transition-all duration-300 h-12 text-lg"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              onPaste={handlePaste}
              readOnly
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-16 h-12 p-0 bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-purple-500 transition-all duration-300">
                <img src={selectedChain.icon} alt={selectedChain.name} className="w-8 h-8" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0 border-gray-700">
              {supportedChains.map((chain) => (
                <Button
                  key={chain.id}
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 hover:bg-gray-700"
                  onClick={() => handleChainChange(chain)}
                >
                  <img src={chain.icon} alt={chain.name} className="w-6 h-6 mr-3" />
                  {chain.name}
                </Button>
              ))}
            </PopoverContent>
          </Popover>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={tokenLoading || balanceLoading ? 'loading' : 'data'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-secondary rounded-lg p-6 shadow-lg"
          >
            {tokenLoading || balanceLoading ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="relative w-16 h-16">
                  <motion.div
                    className="absolute inset-0 border-4 border-purple-500 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <Loader2 className="h-16 w-16 text-purple-400 animate-pulse" />
                </div>
                <span className="text-xl font-medium text-gray-300">Fetching token data...</span>
              </div>
            ) : tokenError || balanceError ? (
              <div className="flex items-center justify-center text-red-400 space-x-3 py-8">
                <AlertCircle className="h-8 w-8" />
                <span className="text-xl font-medium">Error fetching token data</span>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <span className="text-xl">Name</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    {tokenData?.name || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <span className="text-xl">Symbol</span>
                  <span className="text-2xl font-bold  bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
                    {tokenData?.symbol || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl">Balance</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    {displayBalance}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}