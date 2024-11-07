import { useToken, useBalance } from 'wagmi';

interface UseTokenDataProps {
  tokenAddress: string;
  chainId: number;
}

export function useTokenData({ tokenAddress, chainId }: UseTokenDataProps) {
  const isNativeToken = tokenAddress === 'native';

  const { data: tokenData, isError: tokenError, isLoading: tokenLoading } = useToken({
    address: isNativeToken ? undefined : tokenAddress,
    chainId,
  });

  const { data: balanceData, isError: balanceError, isLoading: balanceLoading } = useBalance({
    address: '0x4557B18E779944BFE9d78A672452331C186a9f48',
    token: isNativeToken ? undefined : tokenAddress,
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
