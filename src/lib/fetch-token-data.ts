import { useToken, useBalance } from 'wagmi';
import { formatEthereumAddress } from './utils';
import { TokenData } from '@/types/types';

interface UseTokenDataProps {
  tokenAddress: string;
  chainId: number;
  walletAddress?: string;
}

export function useTokenData({ tokenAddress, chainId, walletAddress }: UseTokenDataProps) {
  const isNativeToken = tokenAddress === 'native';

  const { data: rawTokenData, isError: tokenError, isLoading: tokenLoading } = useToken({
    address: isNativeToken ? undefined : formatEthereumAddress(tokenAddress),
    chainId,
  });

  const { data: balanceData, isError: balanceError, isLoading: balanceLoading } = useBalance({
    address: formatEthereumAddress(walletAddress),
    token: isNativeToken ? undefined : formatEthereumAddress(tokenAddress),
    chainId,
  });

  const tokenData: TokenData | null = rawTokenData
    ? {
        name: rawTokenData.name || 'Unknown',
        symbol: rawTokenData.symbol || 'N/A',
      }
    : null;

  return {
    tokenData,
    tokenError,
    tokenLoading,
    balanceData,
    balanceError,
    balanceLoading,
  };
}
