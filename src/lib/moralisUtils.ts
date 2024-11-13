import Moralis from 'moralis';
import { WalletData } from '@/types/types'; // Import the WalletData interface

const MORALIS_API_KEY =
  process.env.MORALIS_API_KEY || ""
let isMoralisInitialized = false;

export const initializeMoralis = async () => {
  if (!isMoralisInitialized) {
    try {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({ apiKey: MORALIS_API_KEY });
        isMoralisInitialized = true;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error initializing Moralis:', error.message);
      } else {
        console.error('Unknown error initializing Moralis');
      }
      throw error;
    }
  }
};

export const checkMoralisInitialized = () => isMoralisInitialized;

export const getWalletStats = async (address: string): Promise<WalletData> => {
  try {
    if (!checkMoralisInitialized()) {
      await initializeMoralis();
    }

    const response = await Moralis.EvmApi.wallets.getWalletStats({
      address,
      chain: "0x1", // Ethereum mainnet
    });

    // Assuming response.raw contains the data in the desired format
    return response.raw as WalletData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching wallet stats from Moralis:', error.message);
    } else {
      console.error('Unknown error fetching wallet stats from Moralis');
    }
    throw error;
  }
};