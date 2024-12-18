"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Jan", price: 145 },
  { date: "Feb", price: 150 },
  { date: "Mar", price: 155 },
  { date: "Apr", price: 160 },
  { date: "May", price: 165 },
  { date: "Jun", price: 170 },
]

export function StockChart() {
  return (
    <ChartContainer
      config={{
        price: {
          label: "Stock Price",
          color: "hsl(215, 100%, 50%)", // Vibrant blue
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#000000" />
          <YAxis stroke="#000000" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="hsl(215, 100%, 50%)" 
            strokeWidth={3}
            dot={{ fill: "hsl(215, 100%, 50%)", strokeWidth: 2, r: 6 }}
            activeDot={{ fill: "hsl(215, 100%, 50%)", strokeWidth: 2, r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

