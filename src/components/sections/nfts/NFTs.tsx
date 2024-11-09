'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NFTsDistributionCard from './NFTsDistributionCard';
import NFTsFloorPricesCard from './NFTsFloorPricesCard';

export default function Stats() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-3xl font-semibold mb-6 mt-4">NFT Collections Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <Card className="border-purple-500 bg-gray-900">
          <CardHeader>
            <CardTitle>Asset Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Other content */}
          </CardContent>
        </Card>

        {/* Include the NFTsDistributionCard component */}
        <NFTsDistributionCard />
      </div>

      {/* Include the NFTsFloorPricesCard component outside the grid */}
      <div className="mt-8">
        <NFTsFloorPricesCard />
      </div>
    </div>
  );
}
