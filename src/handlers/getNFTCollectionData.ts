import axios from 'axios';
import { FloorPriceResponse, NFTHolderDistributionResponse } from '../types/types';
import { formatFloorPriceData } from '../lib/utils';

export async function fetchFloorPrices(collectionId: string, startDate: string, endDate: string): Promise<FloorPriceResponse | null> {
  try {
    const response = await axios.get<FloorPriceResponse>('/api/simplehash/fetchNFTCollectionFPrices', {
      params: {
        collectionId,
        granularity: 'daily',
        startDate,
        endDate,
      },
    });
    const formattedData = formatFloorPriceData(response.data);
    console.log('Formatted Floor Price Data:', formattedData);
    return response.data;
  } catch (err) {
    console.error('Error fetching floor prices:', err);
    return null;
  }
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
