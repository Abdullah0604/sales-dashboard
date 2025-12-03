"use client";

import { useAuthToken } from "@/hooks/useAuthToken";
import { fetchSalesData } from "@/lib/api/sales";
import { useQuery } from "@tanstack/react-query";

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
import { Loading } from "./Loading";
import { Error } from "./Error";

export function SalesChart({ filters }) {
  const { data: authToken } = useAuthToken();
  const {
    data: totalSales,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sales-chart", authToken, filters],
    queryFn: () =>
      fetchSalesData({ ...filters, token: authToken, isTotalSales: true }),
    enabled: !!authToken,
  });
  if (isLoading) return <Loading message="Fetching total sales..." />;
  if (isError) return <Error message="Failed to fetch total sales!" />;
  console.log(totalSales);

  return (
    <div className="overflow-x-auto w-full">
      <div className="h-96 min-w-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={totalSales}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--color-muted))"
            />

            <XAxis
              dataKey="day"
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
              dataKey="totalSale"
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
