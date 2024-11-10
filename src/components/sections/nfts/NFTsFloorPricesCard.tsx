'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { fetchFloorPrices } from '@/handlers/getNFTCollectionData'
import { formatFloorPriceData } from '@/lib/utils'
import { format, subDays, subMonths } from 'date-fns'
import CombinedAreaChart from '../../charts/CombinedAreaChart'
import BarChartInteractive from '../../charts/BarChartInteractive'

const dateRanges = [
  { id: '7d', label: '7D', subtract: () => subDays(new Date(), 7) },
  { id: '1m', label: '1M', subtract: () => subMonths(new Date(), 1) },
  { id: '3m', label: '3M', subtract: () => subMonths(new Date(), 3) },
]

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
  const [activeDateRange, setActiveDateRange] = useState('7d')
  const [activeMarketplace, setActiveMarketplace] = useState<'blur' | 'opensea'>('blur')
  const [combinedChartData, setCombinedChartData] = useState<Array<{ date: string; blur: number | null; opensea: number | null }> | null>(null)
  const [error, setError] = useState<string | null>(null)

  const collectionId = '09954610564c25f6910ccd963c09a3fa' // Example collection ID

  useEffect(() => {
    const loadFloorPrices = async () => {
      const endDate = format(new Date(), 'yyyy-MM-dd')
      const startDate = format(dateRanges.find(range => range.id === activeDateRange)?.subtract() || new Date(), 'yyyy-MM-dd')
      const data = await fetchFloorPrices(collectionId, startDate, endDate)
      if (data) {
        const formattedData = formatFloorPriceData(data)
        console.log('Formatted data for charts:', formattedData)
        setCombinedChartData(formattedData)
      } else {
        setError('Failed to fetch floor prices')
      }
    }

    loadFloorPrices()
  }, [collectionId, activeDateRange])

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <CardTitle className="text-2xl font-bold text-primary">Floor Prices</CardTitle>
        <MarketplaceSelector activeMarketplace={activeMarketplace} setActiveMarketplace={setActiveMarketplace} />
      </CardHeader>
      <CardContent className='py-2 px-0 '>
        <div className="space-y-4">
          <Tabs defaultValue="area" className="w-full">
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
                  <BarChartInteractive data={combinedChartData} activeMarketplace={activeMarketplace} />
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