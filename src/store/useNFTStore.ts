import { create } from 'zustand';
import { SimpleHashCollection, NFTHolderDistributionResponse, FloorPriceResponse } from '../types/types';
import { fetchAllCollections, fetchDistributionData, fetchHoldingPeriodDistribution } from '../lib/fetch-nfts-data';

interface NFTState {
  collections: Map<string, SimpleHashCollection> | null;
  selectedCollection: SimpleHashCollection | null;
  distributionData: NFTHolderDistributionResponse['data'] | null;
  holdingPeriodData: any; // Define the type based on your API response
  floorPricesData: Record<string, FloorPriceResponse | null> | null;
  loading: boolean;
  fetchCollections: () => Promise<void>;
  fetchSelectedCollectionData: (collectionId: string) => Promise<void>;
  setSelectedCollection: (collection: SimpleHashCollection) => void;
  setFloorPricesData: (data: Record<string, FloorPriceResponse | null>) => void;
}

export const useNFTStore = create<NFTState>((set, get) => ({
  collections: null,
  selectedCollection: null,
  distributionData: null,
  holdingPeriodData: null,
  floorPricesData: null,
  loading: true,
  fetchCollections: async () => {
    set({ loading: true });
    const collectionMap = await fetchAllCollections();
    set({ collections: collectionMap, loading: false });

    // Automatically set the first collection as the selected collection
    if (collectionMap && collectionMap.size > 0) {
      const firstCollection = collectionMap.values().next().value;
      set({ selectedCollection: firstCollection });
    }
  },
  fetchSelectedCollectionData: async (collectionId: string) => {
    const { collections } = get();
    if (collections) {
      const selectedCollection = collections.get(collectionId);
      if (selectedCollection) {
        set({ selectedCollection });
        const contractAddress = selectedCollection.top_contracts[0].split('.')[1]; // Extract the contract address
        const distributionData = await fetchDistributionData(contractAddress);
        const holdingPeriodData = await fetchHoldingPeriodDistribution(contractAddress);
        set({ distributionData, holdingPeriodData });
      }
    }
  },
  setSelectedCollection: (collection: SimpleHashCollection) => {
    set({ selectedCollection: collection });
  },
  setFloorPricesData: (data: Record<string, FloorPriceResponse | null>) => {
    set({ floorPricesData: data });
  },
}));