'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart as PieChartIcon, BarChart as BarChartIcon, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchDistributionData, fetchHoldingPeriodDistribution } from '@/handlers/getNFTCollectionData';
import RadarChart from '../../charts/RadarChart';
import RadialChart from '../../charts/RadialChart';
import { NFTHolderDistributionResponse } from '@/types/types';

const chartTypes = [
  { id: 'pie', name: 'Holding Period', icon: PieChartIcon },
  { id: 'bar', name: 'Holder Distribution', icon: BarChartIcon },
];

const purpleShades = [
  "#D8BFD8", // Thistle
  "#DDA0DD", // Plum
  "#EE82EE", // Violet
  "#DA70D6", // Orchid
  "#BA55D3", // Medium Orchid
  "#9932CC", // Dark Orchid
  "#8A2BE2", // Blue Violet
];

export default function NFTsDistributionCard() {
  const [activeChart, setActiveChart] = useState('pie');
  const [radialChartData, setRadialChartData] = useState<Array<{ label: string; value: number; color: string }> | null>(null);
  const [RadarChartData, SetRadarChartData] = useState<Array<{ label: string; value: number; color: string }> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [distributionData, setDistributionData] = useState<NFTHolderDistributionResponse['data'] | null>(null);

  const contractAddress = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'; // Example contract address

  useEffect(() => {
    const loadDistributionData = async () => {
      const data = await fetchDistributionData(contractAddress);
      if (data) {
        setDistributionData(data);
        const transformedData = data.distribution.map((item, index) => ({
          label: item.name,
          value: parseFloat(item.proportion),
          color: purpleShades[index % purpleShades.length] 
        }));
        SetRadarChartData(transformedData) 
        console.log('Distribution Data:', data);
      }
    };

    const loadHoldingPeriodDistribution = async () => {
      const data = await fetchHoldingPeriodDistribution(contractAddress);
      if (data) {
        const transformedData = data.data.distribution.map((item, index) => ({
          label: item.name,
          value: parseFloat(item.proportion),
          color: purpleShades[index % purpleShades.length] 
        }));
        setRadialChartData(transformedData); // 
        console.log('Holding Period Distribution Data:', data);
      }
    };

    loadDistributionData();
    loadHoldingPeriodDistribution();
  }, [contractAddress]);

  const renderChart = () => {
    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    if (!radialChartData || !distributionData) {
      return <p>Loading...</p>;
    }

    return (
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-64 flex items-center justify-center text-white"
      >
        {activeChart === 'pie' && radialChartData && <RadialChart data={radialChartData} />}
        {activeChart === 'bar' && RadarChartData && <RadarChart data={RadarChartData} />}
      </motion.div>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-purple-950 border-purple-500">
      <CardHeader className="border-b border-purple-700">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center h-14 w-14 bg-purple-800 rounded-full">
            <BarChart3 className="h-8 w-8 text-purple-200" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white">Distribution Analysis</CardTitle>
            <CardDescription className="text-purple-300">Token Holding Patterns</CardDescription>
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
          <div className="mt-6 border border-purple-700 rounded-lg p-4 bg-gray-900 bg-opacity-50">
            <AnimatePresence mode="wait">
              {renderChart()}
            </AnimatePresence>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}