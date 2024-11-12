import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { FloorPriceRequestParams, FloorPriceResponse } from '@/types/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { collectionId, granularity, startDate, endDate } = req.query;

  // Ensure all query parameters are strings
  if (
    typeof collectionId !== 'string' ||
    typeof granularity !== 'string' ||
    typeof startDate !== 'string' ||
    typeof endDate !== 'string'
  ) {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }

  const options = {
    method: 'GET',
    headers: {
      'X-API-KEY': process.env.SIMPLEHASH_API_KEY,
      'accept': 'application/json',
    },
  };

  const url = `https://api.simplehash.com/api/v0/nfts/floor_prices_v2/collection/${collectionId}/${granularity}?marketplace_ids=opensea,blur&start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await axios.get<FloorPriceResponse>(url, options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching floor prices:', error);
    res.status(500).json({ error: 'Failed to fetch floor prices' });
  }
}