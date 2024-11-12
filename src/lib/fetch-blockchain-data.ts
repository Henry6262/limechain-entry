import { useGasPrice, useBalance, useChainId, useTransactionCount } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { Session, useSession } from 'next-auth/react';
import { formatEthereumAddress } from './utils';

// Extend the Session type
interface ExtendedSession extends Session {
  address?: string;
}

export function useBlockchainData() {
  const { data: session } = useSession();

  // Type assertion to ExtendedSession
  const extendedSession = session as ExtendedSession;

  // Fetch gas price
  const { data: gasPriceData, isError: gasPriceError } = useGasPrice({
    chainId: mainnet.id,
  });

  // Fetch wallet balance
  const { data: balanceData, isError: balanceError } = useBalance({
    address: formatEthereumAddress(extendedSession?.address),
    chainId: mainnet.id,
  });

  // Get current chain ID
  const chainId = useChainId();

  // Fetch transaction count
  const { data: transactionCount, isError: transactionCountError } = useTransactionCount({
    address: formatEthereumAddress(extendedSession?.address),
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
