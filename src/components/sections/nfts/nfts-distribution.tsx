"use client"

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart as PieChartIcon, BarChart as BarChartIcon, BarChart3, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNFTStore } from '../../../store/useNFTStore'
import RadarChart from '../../charts/chart-radar'
import RadialChart from '../../charts/chart-radial'
import Spinner from '../../common/spinner'

interface DistributionItem {
  name: string;
  proportion: string; 
}

const chartTypes = [
  { id: 'pie', name: 'Holding Period', icon: PieChartIcon },
  { id: 'bar', name: 'Holder Distribution', icon: BarChartIcon },
]

export default function NFTsDistributionCard() {
  const { distributionData, holdingPeriodData } = useNFTStore()
  const [activeChart, setActiveChart] = useState('pie')

  const radialChartData = useMemo(() => {
    if (!holdingPeriodData) return []
    return holdingPeriodData.data.distribution.map((item: DistributionItem) => ({
      label: item.name,
      value: parseFloat(item.proportion),
    }))
  }, [holdingPeriodData])

  const radarChartData = useMemo(() => {
    if (!distributionData) return []
    return distributionData.distribution.map((item) => ({
      label: item.name,
      value: parseFloat(item.proportion),
      color: 'hsl(var(--chart-1))',
    }))
  }, [distributionData])


  const renderChart = () => {
    if (!holdingPeriodData || !distributionData) {
      return <Spinner loadingText="Loading distribution data..." />
    }

    return (
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-64 flex items-center justify-center"
      >
        {activeChart === 'pie' && <RadialChart data={radialChartData} />}
        {activeChart === 'bar' && <RadarChart data={radarChartData} />}
      </motion.div>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="border-b border-purple-800">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center h-14 w-14 bg-purple-900 rounded-full">
            <BarChart3 className="h-8 w-8 text-purple-300" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold dark:text-purple-100">Distribution Analysis</CardTitle>
            <CardDescription className="text-gray-500 dark:text-purple-300">Token Holding Patterns</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeChart} onValueChange={setActiveChart} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-purple-950 rounded-lg p-1">
            {chartTypes.map((chart) => (
              <TabsTrigger
                key={chart.id}
                value={chart.id}
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white transition-all duration-300"
              >
                <chart.icon className="h-5 w-5 mr-2" />
                {chart.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-6 border border-purple-800 rounded-lg p-4 bg-black ">
            <AnimatePresence mode="wait">
              {renderChart()}
            </AnimatePresence>
          </div>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-purple-300">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-purple-400">
          Showing total distribution for the last 1 years +
        </div>
      </CardFooter>
    </Card>
  )
}