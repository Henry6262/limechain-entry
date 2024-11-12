'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useNFTStore } from '../../../store/useNFTStore'
import { formatFloorPriceData } from '@/lib/utils'
import { format, subDays, subMonths } from 'date-fns'
import CombinedAreaChart from '../../charts/chart-combined-area'
import BarChart from '../../charts/chart-bar'
import { dateRanges } from '../../../types/types'

function MarketplaceSelector({ activeMarketplace, setActiveMarketplace }: { activeMarketplace: 'blur' | 'opensea'; setActiveMarketplace: (marketplace: 'blur' | 'opensea') => void }) {
  return (
    <Select value={activeMarketplace} onValueChange={setActiveMarketplace}>
      <SelectTrigger className="w-fit !mt-0">
        <SelectValue placeholder="Marketplace" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="blur">Blur</SelectItem>
        <SelectItem value="opensea">OpenSea</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default function NFTsFloorPricesCard() {
  const { floorPricesData } = useNFTStore();
  const [activeDateRange, setActiveDateRange] = useState('7d')
  const [activeMarketplace, setActiveMarketplace] = useState<'blur' | 'opensea'>('blur')
  const [combinedChartData, setCombinedChartData] = useState<Array<{ date: string; blur: number | null; opensea: number | null }> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('area');

  useEffect(() => {
    if (floorPricesData) {
      const dataForActiveRange = floorPricesData[activeDateRange];
      if (dataForActiveRange) {
        const formattedData = formatFloorPriceData(dataForActiveRange);
        setCombinedChartData(formattedData);
      } else {
        setError(`No data available for the selected date range: ${activeDateRange}`);
      }
    }
  }, [activeDateRange, floorPricesData]);

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <CardTitle className="text-3xl pb-1 font-bold ">Floor Prices</CardTitle>
        {activeTab !== 'area' && (
          <MarketplaceSelector activeMarketplace={activeMarketplace} setActiveMarketplace={setActiveMarketplace} />
        )}
      </CardHeader>
      <CardContent className='py-2 px-0 '>
        <div className="space-y-4">
          <Tabs defaultValue="area" className="w-full" onValueChange={setActiveTab}>
            <div className="flex px-6 flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 mb-4">
              <TabsList>
                <TabsTrigger value="area">Area Chart</TabsTrigger>
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              </TabsList>
              <Select value={activeDateRange} onValueChange={setActiveDateRange}>
                <SelectTrigger className="w-fit !mt-0">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map(range => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error ? (
              <p className="text-destructive">{error}</p>
            ) : combinedChartData ? (
              <>
                <TabsContent value="area">
                  <CombinedAreaChart data={combinedChartData} />
                </TabsContent>
                <TabsContent value="bar">
                  <BarChart data={combinedChartData} activeMarketplace={activeMarketplace} />
                </TabsContent>
              </>
            ) : (
              <p className="text-muted-foreground">Loading...</p>
            )}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}