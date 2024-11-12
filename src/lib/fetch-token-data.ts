import { useToken, useBalance } from 'wagmi';
import { formatEthereumAddress } from './utils';

interface UseTokenDataProps {
  tokenAddress: string;
  chainId: number;
}

export function useTokenData({ tokenAddress, chainId }: UseTokenDataProps) {
  const isNativeToken = tokenAddress === 'native';

  const { data: tokenData, isError: tokenError, isLoading: tokenLoading } = useToken({
    address: isNativeToken ? undefined : formatEthereumAddress(tokenAddress),
    chainId,
  });

  const { data: balanceData, isError: balanceError, isLoading: balanceLoading } = useBalance({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
    token: isNativeToken ? undefined : formatEthereumAddress(tokenAddress),
    chainId,
  });

  return {
    tokenData,
    tokenError,
    tokenLoading,
    balanceData,
    balanceError,
    balanceLoading,
  };
}
