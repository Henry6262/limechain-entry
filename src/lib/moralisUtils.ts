import Moralis from 'moralis';
import { WalletData } from '@/types/types'; // Import the WalletData interface

const MORALIS_API_KEY =
  process.env.MORALIS_API_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImE2M2U1ZGJlLTBjMjAtNGY0ZS04Nzg5LWI3OWQ4OWU1YWZiYSIsIm9yZ0lkIjoiMzk3NjIwIiwidXNlcklkIjoiNDA4NTY5IiwidHlwZUlkIjoiYmQ4OGNmOWMtNTFiMS00YjdlLWI2NDItMjM4ZGIzMGZiNjMxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTkyMjUzNjcsImV4cCI6NDg3NDk4NTM2N30.4GdjthYU8TDkTE3KvEWxkDI7LTUHzq789MLQ9bTHXBw';

let isMoralisInitialized = false;

export const initializeMoralis = async () => {
  if (!isMoralisInitialized) {
    try {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({ apiKey: MORALIS_API_KEY });
        isMoralisInitialized = true;
      }
    } catch (error: any) {
      console.error('Error initializing Moralis:', error.message);
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
  } catch (error: any) {
    console.error('Error fetching wallet stats from Moralis:', error.message);
    throw error;
  }
};