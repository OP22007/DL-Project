"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Jul", actual: 305, predicted: 305 },
  { date: "Aug", actual: 310, predicted: 312 },
  { date: "Sep", actual: 315, predicted: 318 },
  { date: "Oct", actual: null, predicted: 325 },
  { date: "Nov", actual: null, predicted: 330 },
  { date: "Dec", actual: null, predicted: 335 },
]

export function PredictionChart() {
  return (
    <ChartContainer
      config={{
        actual: {
          label: "Actual Price",
          color: "hsl(130, 100%, 35%)", // Vibrant green
        },
        predicted: {
          label: "Predicted Price",
          color: "hsl(350, 100%, 50%)", // Vibrant red
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
            dataKey="actual" 
            stroke="hsl(130, 100%, 35%)" 
            strokeWidth={3}
            dot={{ fill: "hsl(130, 100%, 35%)", strokeWidth: 2, r: 6 }}
            activeDot={{ fill: "hsl(130, 100%, 35%)", strokeWidth: 2, r: 8 }}
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke="hsl(350, 100%, 50%)" 
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ fill: "hsl(350, 100%, 50%)", strokeWidth: 2, r: 6 }}
            activeDot={{ fill: "hsl(350, 100%, 50%)", strokeWidth: 2, r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

