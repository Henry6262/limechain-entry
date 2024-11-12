import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { supportedChains } from '@/lib/helpers/tokenAssetData';

interface TokenAddressInputProps {
  tokenAddress: string;
  setTokenAddress: (address: string) => void;
  handlePaste: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  selectedChain: typeof supportedChains[0];
  handleChainChange: (chain: typeof supportedChains[0]) => void;
}

export function TokenAddressInput({
  tokenAddress,
  setTokenAddress,
  handlePaste,
  selectedChain,
  handleChainChange,
}: TokenAddressInputProps) {
  return (
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
  );
} 