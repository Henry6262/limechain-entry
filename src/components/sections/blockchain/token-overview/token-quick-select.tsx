import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { supportedChains } from '@/lib/helpers/tokenAssetData';
import Image from 'next/image';

interface TokenQuickSelectProps {
  selectedChain: typeof supportedChains[0];
  setTokenAddress: (address: string) => void;
  setHasProcessedData: (processed: boolean) => void;
}

export function TokenQuickSelect({ selectedChain, setTokenAddress, setHasProcessedData }: TokenQuickSelectProps) {
  return (
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
                className="w-16 h-16 p-0 rounded-full border-2 hover:border-purple-500 transition-all duration-300"
                onClick={() => {
                  setTokenAddress(token.address);
                  setHasProcessedData(false);
                }}
              >
                <Image src={token.image} alt={token.symbol} width={56} height={56} className="rounded-full" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 