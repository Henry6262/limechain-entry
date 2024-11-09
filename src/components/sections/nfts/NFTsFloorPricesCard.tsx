'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchFloorPrices } from '@/handlers/getNFTCollectionData';
import { formatFloorPriceData } from '@/lib/utils';
import { format, subDays, subMonths } from 'date-fns';
import CombinedAreaChart from '@/components/charts/CombinedAreaChart'; // Import the chart

const dateRanges = [
  { id: '7d', label: 'Last 7 Days', subtract: () => subDays(new Date(), 7) },
  { id: '1m', label: 'Last Month', subtract: () => subMonths(new Date(), 1) },
  { id: '3m', label: 'Last 3 Months', subtract: () => subMonths(new Date(), 3) },
];

export default function NFTsFloorPricesCard() {
  const [activeDateRange, setActiveDateRange] = useState('7d');
  const [combinedChartData, setCombinedChartData] = useState<Array<{ date: string; blur: number | null; opensea: number | null }> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const collectionId = '09954610564c25f6910ccd963c09a3fa'; // Example collection ID

  useEffect(() => {
    const loadFloorPrices = async () => {
      const endDate = format(new Date(), 'yyyy-MM-dd');
      const startDate = format(dateRanges.find(range => range.id === activeDateRange)?.subtract() || new Date(), 'yyyy-MM-dd');
      const data = await fetchFloorPrices(collectionId, startDate, endDate);
      if (data) {
        const formattedData = formatFloorPriceData(data);
        console.log('Formatted data for CombinedAreaChart:', formattedData);
        setCombinedChartData(formattedData);
      } else {
        setError('Failed to fetch floor prices');
      }
    };

    loadFloorPrices();
  }, [collectionId, activeDateRange]);

  return (
    <Card className="border-purple-500 bg-gray-900">
      <CardHeader>
        <CardTitle>Floor Prices</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : combinedChartData ? (
          <CombinedAreaChart data={combinedChartData} />
        ) : (
          <p>Loading...</p>
        )}
        <div className="mt-4 flex justify-center space-x-4">
          {dateRanges.map(range => (
            <button
              key={range.id}
              onClick={() => setActiveDateRange(range.id)}
              className={`px-4 py-2 rounded-lg ${activeDateRange === range.id ? 'bg-purple-700 text-white' : 'bg-purple-500 text-purple-200'}`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
