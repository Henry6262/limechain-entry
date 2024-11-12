import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { NFTHolderDistributionResponse } from '../../../types/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { contractAddress } = req.query;

  if (!contractAddress || typeof contractAddress !== 'string') {
    return res.status(400).json({ error: 'Contract address is required' });
  }

  try {
    const response = await axios.get<NFTHolderDistributionResponse>(
      `https://restapi.nftscan.com/api/v2/statistics/amount/distribution/${contractAddress}`,
      {
        headers: {
          'X-API-KEY': process.env.NFTSCAN_API_KEY,
        },
      }
    );

    res.status(200).json(response.data.data); // Send the data part of the response
  } catch (error) {
    console.error('Error fetching NFT holder distribution:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
  }
}
