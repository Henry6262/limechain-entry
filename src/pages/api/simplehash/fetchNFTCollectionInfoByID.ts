import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { SimpleHashCollectionResponse } from '@/types/types';

const API_KEY = 'enriquemilos_sk_h74tjnin5gom4u00sdwhui91mh0rhc5t'; // Ensure this is stored securely in environment variables

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { collectionIds } = req.query;

  if (!collectionIds || typeof collectionIds !== 'string') {
    return res.status(400).json({ error: 'Collection IDs are required and must be a string' });
  }

  try {
    const response = await axios.get<SimpleHashCollectionResponse>(
      `https://api.simplehash.com/api/v0/nfts/collections/ids`,
      {
        headers: {
          'X-API-KEY': API_KEY,
          'accept': 'application/json',
        },
        params: {
          collection_ids: collectionIds,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching collection info:', error);
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({ error: error.response?.data || 'Failed to fetch collection info' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}
