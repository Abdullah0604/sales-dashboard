"use client";

import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// Mock data generator
function generateMockChartData(filters) {
  const data = [];
  const startDate = new Date(filters.startDate);
  const endDate = new Date(filters.endDate);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const baseValue = 4000 + Math.random() * 3000;
    data.push({
      date: d.toISOString().split("T")[0],
      sales: Math.round(baseValue),
    });
  }

  return data;
}

export function SalesChart({ filters }) {
  const data = useMemo(() => generateMockChartData(filters), [filters]);

  return (
    <div className="overflow-x-auto w-full">
      <div className="h-96 min-w-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--color-muted))"
            />

            <XAxis
              dataKey="date"
              stroke="hsl(var(--color-muted-foreground))"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="hsl(var(--color-muted-foreground))"
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(4px)",

                border: "1px solid gray",
                borderRadius: "8px",
                color: "hsl(var(--color-foreground))",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke={"black"}
              //   dot={false}
              activeDot={{ r: 5 }}
              name="Total Sales"
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
