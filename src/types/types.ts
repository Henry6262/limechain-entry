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