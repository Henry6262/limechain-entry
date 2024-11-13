import { TokenData } from '@/types/types';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Loader2 } from 'lucide-react';



interface TokenDataDisplayProps {
  tokenLoading: boolean;
  balanceLoading: boolean;
  tokenError: boolean;
  balanceError: boolean;
  tokenData: TokenData | null; // Use the defined type
  displayBalance: string;
}

export function TokenDataDisplay({
  tokenLoading,
  balanceLoading,
  tokenError,
  balanceError,
  tokenData,
  displayBalance,
}: TokenDataDisplayProps) {
  return (
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
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
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
  );
}