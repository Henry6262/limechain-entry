"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface CombinedAreaChartProps {
  data: Array<{ date: string; blur: number | null; opensea: number | null }>
}

const chartConfig = {
  blur: {
    label: "Blur",
    color: "hsl(var(--chart-2))",
  },
  opensea: {
    label: "OpenSea",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function CombinedAreaChart({ data }: CombinedAreaChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="fillBlur" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-blur)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-blur)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillOpenSea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-opensea)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-opensea)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
                indicator="dot"
              />
            }
          />
          <Area
            type="monotone"
            dataKey="blur"
            stackId="1"
            stroke="var(--color-blur)"
            fill="url(#fillBlur)"
          />
          <Area
            type="monotone"
            dataKey="opensea"
            stackId="1"
            stroke="var(--color-opensea)"
            fill="url(#fillOpenSea)"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
    </ChartContainer>
  )
}