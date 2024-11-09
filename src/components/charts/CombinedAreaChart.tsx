"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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
    color: "hsl(var(--chart-1))",
  },
  opensea: {
    label: "OpenSea",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function CombinedAreaChart({ data }: CombinedAreaChartProps) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
      <AreaChart data={data}>
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
        <CartesianGrid vertical={false} />
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
          dataKey="blur"
          type="natural"
          fill="url(#fillBlur)"
          stroke="var(--color-blur)"
          stackId="a"
        />
        <Area
          dataKey="opensea"
          type="natural"
          fill="url(#fillOpenSea)"
          stroke="var(--color-opensea)"
          stackId="a"
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}
