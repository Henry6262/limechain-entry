"use client"

import React from 'react';
import { RadialBar, RadialBarChart, LabelList } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface RadialChartProps {
  data: { label: string; value: number }[];
}

const chartConfig = {
  '<24H': {
    label: '<24H',
    color: 'hsl(var(--chart-1))',
  },
  '1-7D': {
    label: '1-7D',
    color: 'hsl(var(--chart-2))',
  },
  '7-30D': {
    label: '7-30D',
    color: 'hsl(var(--chart-3))',
  },
  '30D-3M': {
    label: '30D-3M',
    color: 'hsl(var(--chart-4))',
  },
  '3M-1Y': {
    label: '3M-1Y',
    color: 'hsl(var(--chart-5))',
  },
  '>1Y': {
    label: '>1Y',
    color: 'hsl(var(--chart-6))',
  },
};

const RadialChart: React.FC<RadialChartProps> = ({ data }) => {
  const formattedData = data.map((item) => ({
    ...item,
    fill: chartConfig[item.label]?.color || 'hsl(var(--chart-default))',
  }));

  return (
    <div className="flex-1 pb-0">
 <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <RadialBarChart
        data={formattedData}
        startAngle={-90}
        endAngle={270}
        innerRadius={30}
        outerRadius={110}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="label" />}
        />
        <RadialBar dataKey="value" background>
          <LabelList
            position="insideStart"
            dataKey="label"
            className="dark:fill-white fill-black capitalize mix-blend-luminosity"
            fontSize={11}
          />
        </RadialBar>
      </RadialBarChart>
    </ChartContainer>
    </div>
   
  );
};

export default RadialChart;
