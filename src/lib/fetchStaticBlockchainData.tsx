import { useGasPrice, useBalance, useChainId, useTransactionCount } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { useSession } from 'next-auth/react';

export function useBlockchainData() {
  const { data: session } = useSession();

  // Fetch gas price
  const { data: gasPriceData, isError: gasPriceError } = useGasPrice({
    chainId: mainnet.id,
  });

  // Fetch wallet balance
  const { data: balanceData, isError: balanceError } = useBalance({
    address: session?.address,
    chainId: mainnet.id,
  });

  // Get current chain ID
  const chainId = useChainId();

  // Fetch transaction count
  const { data: transactionCount, isError: transactionCountError } = useTransactionCount({
    address: session?.address,
    chainId: mainnet.id,
  });

  // Handle errors
  const errors = {
    gasPriceError,
    balanceError,
    transactionCountError,
  };

  return {
    gasPriceData,
    balanceData,
    chainId,
    transactionCount,
    errors,
  };
}
