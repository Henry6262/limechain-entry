import {subDays, subMonths} from 'date-fns'

export interface Task {
  id: number;
  title: string;
  description: string;
  points: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  taskType: 'manual' | 'quest';
}

export type ActivityType = 'task' | 'auth' | 'fetch token';
export type TaskAction = 'create' | 'complete' | 'update';
export type AuthAction = 'login' | 'logout' | 'update profile';
export type FetchTokenAction = 'search';

export interface ActivityLogItem {
  id: number;
  type: ActivityType;
  action: TaskAction | AuthAction | FetchTokenAction;
  datetime: string;
  details?: string; // Optional field for additional details like token symbol
}

export interface FloorPriceRequestParams {
  collectionId: string;
  granularity: string;
  startDate: string;
  endDate: string;
}

export interface PaymentToken {
  payment_token_id: string;
  name: string;
  symbol: string;
  address: string | null;
  decimals: number;
}

export interface FloorPrice {
  marketplace_id: string;
  floor_price: number;
  timestamp: string;
}

export interface FloorPriceResponse {
  payment_token: PaymentToken;
  floor_prices: FloorPrice[];
}

export interface DistributionItem {
  name: string;
  value: number;
  proportion: string;
}

export interface NFTHolderDistributionResponse {
  code: number;
  msg: string | null;
  data: {
    total: number;
    distribution: DistributionItem[];
  };
}

export interface SimpleHashCollection {
  collection_id: string;
  name: string;
  description: string;
  image_url: string;
  image_properties: {
    width: number;
    height: number;
    mime_type: string;
  };
  banner_image_url: string;
  external_url: string;
  twitter_username: string;
  discord_url: string;
  instagram_username: string;
  medium_username: string | null;
  telegram_url: string | null;
  floor_prices: {
    marketplace_id: string;
    marketplace_name: string;
    value: number;
    payment_token: {
      payment_token_id: string;
      name: string;
      symbol: string;
      address: string | null;
      decimals: number;
    };
    value_usd_cents: number;
  }[];
  distinct_owner_count: number;
  distinct_nft_count: number;
  total_quantity: number;
  collection_royalties: {
    total_creator_fee_basis_points: number;
  }[];
  marketplace_pages: {
    collection_url: string;
  }[];
  top_contracts: string[];
}

export interface SimpleHashCollectionResponse {
  collections: SimpleHashCollection[];
}

export type DateRange = {
  id: string;
  label: string;
  subtract: () => Date;
};

export const dateRanges: DateRange[] = [
  { id: '7d', label: '7D', subtract: () => subDays(new Date(), 7) },
  { id: '1m', label: '1M', subtract: () => subMonths(new Date(), 1) },
  { id: '3m', label: '3M', subtract: () => subMonths(new Date(), 3) },
];

export interface WalletData {
  nfts: string;
  collections: string;
  transactions: {
    total: string;
  };
  nft_transfers: {
    total: string;
  };
  token_transfers: {
    total: string;
  };
}