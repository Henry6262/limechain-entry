import axios from 'axios';
import { FloorPriceResponse, NFTHolderDistributionResponse, SimpleHashCollectionResponse } from '../types/types';
import { collectionIds } from '../lib/helpers/collectionIds';

export async function fetchFloorPricesForAllRanges(collectionId: string, dateRanges: Array<{ id: string; startDate: string; endDate: string }>): Promise<Record<string, FloorPriceResponse | null>> {
  const results: Record<string, FloorPriceResponse | null> = {};

  await Promise.all(dateRanges.map(async (range) => {
    try {
      const response = await axios.get<FloorPriceResponse>('/api/simplehash/fetchNFTCollectionFPrices', {
        params: {
          collectionId,
          granularity: 'daily',
          startDate: range.startDate,
          endDate: range.endDate,
        },
      });
      console.log(`Raw Floor Price Data for ${range.id}:`, response.data);
      results[range.id] = response.data;
    } catch (err) {
      console.error(`Error fetching floor prices for ${range.id}:`, err);
      results[range.id] = null;
    }
  }));

  return results;
}

export async function fetchDistributionData(contractAddress: string): Promise<NFTHolderDistributionResponse['data'] | null> {
  try {
    const response = await axios.get<NFTHolderDistributionResponse['data']>(
      `/api/nftscan/fetchNFTHolderDistribution?contractAddress=${contractAddress}`
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching distribution data:', err);
    return null;
  }
}

export async function fetchHoldingPeriodDistribution(contractAddress: string): Promise<NFTHolderDistributionResponse | null> {
  try {
    const response = await axios.get<NFTHolderDistributionResponse>(
      `/api/nftscan/fetchHoldingPeriodDistribution?contractAddress=${contractAddress}`
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching holding period distribution:', err);
    return null;
  }
}

export async function fetchNFTCollectionInfoByID(collectionIds: string): Promise<SimpleHashCollectionResponse | null> {
  try {
    const response = await axios.get<SimpleHashCollectionResponse>('/api/simplehash/fetchNFTCollectionInfoByID', {
      params: {
        collectionIds,
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching NFT collection info:', err);
    return null;
  }
}

export async function fetchAllCollections(): Promise<Map<string, SimpleHashCollectionResponse['collections'][0]> | null> {
  try {
    const ids = Object.values(collectionIds).join(',');
    const response = await fetchNFTCollectionInfoByID(ids);
    if (response) {
      const collectionMap = new Map();
      response.collections.forEach(collection => {
        collectionMap.set(collection.collection_id, collection);
      });
      return collectionMap;
    }
    return null;
  } catch (err) {
    console.error('Error fetching all collections:', err);
    return null;
  }
}
