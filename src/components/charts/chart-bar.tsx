"use client"

import * as React from "react"
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"

interface BarChartInteractiveProps {
  data: Array<{ date: string; blur: number | null; opensea: number | null }>
  activeMarketplace: 'blur' | 'opensea'
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

export default function BarChartInteractive({ data, activeMarketplace }: BarChartInteractiveProps) {

  return (
    <div className="space-y-4">
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
              cursor={{ fill: 'var(--background)' }}
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeMarketplace} fill={`var(--color-${activeMarketplace})`} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}