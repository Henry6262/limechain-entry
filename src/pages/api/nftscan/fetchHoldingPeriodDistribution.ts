import type { NextApiRequest, NextApiResponse } from 'next';
import { NFTHolderDistributionResponse } from '@/types/types';

const API_KEY = 'EeYZrMHegbdGgGfYidvvPYHO';

export default async function handler(req: NextApiRequest, res: NextApiResponse<NFTHolderDistributionResponse | { error: string }>) {
  const { contractAddress } = req.query;

  if (!contractAddress || typeof contractAddress !== 'string') {
    return res.status(400).json({ error: 'Invalid contract address' });
  }

  const API_URL = `https://restapi.nftscan.com/api/v2/statistics/period/distribution/${contractAddress}`;

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch data from NFTScan API' });
    }

    const data: NFTHolderDistributionResponse = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
