import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FloorPriceResponse, dateRanges, DateRange } from '../types/types';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export function formatEthereumAddress(address?: string): `0x${string}` | undefined {
  if (address && isValidEthereumAddress(address)) {
    return address as `0x${string}`;
  }
  return undefined;
}

export function formatFloorPriceData(floorPriceResponse: FloorPriceResponse) {
  const formattedData: Array<{ date: string; blur: number | null; opensea: number | null }> = [];

  // Group floor prices by date
  const groupedByDate = floorPriceResponse.floor_prices.reduce((acc, item) => {
    const date = item.timestamp.split('T')[0]; // Extract date part
    if (!acc[date]) {
      acc[date] = { blur: null, opensea: null };
    }
    acc[date][item.marketplace_id as 'blur' | 'opensea'] = item.floor_price ? item.floor_price / 1e18 : null; // Convert from wei to ETH
    return acc;
  }, {} as Record<string, { blur: number | null; opensea: number | null }>);

  // Convert grouped data to array format
  for (const [date, prices] of Object.entries(groupedByDate)) {
    formattedData.push({ date, ...prices });
  }

  return formattedData;
}

export function generateDateRangeParams(): Array<{ id: string; startDate: string; endDate: string }> {
  return dateRanges.map((range: DateRange) => ({
    id: range.id,
    startDate: format(range.subtract(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
  }));
}
