import * as React from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { timeSeriesData } from "@/data/ahu-data";
import { useIsMobile } from "@/hooks/use-mobile";

export const description = "Dual-axis chart showing power consumption and AHU speed";

const chartConfig = {
  powerConsumption: {
    label: "Power Consumption",
    color: "#3b82f6", // Bright blue
  },
  averageSpeed: {
    label: "Average Speed",
    color: "#ef4444", // Bright red
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("today");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("today");
    }
  }, [isMobile]);


  const filteredData = React.useMemo(() => {
    const now = new Date();
    let startTime: Date;
    
    if (timeRange === "today") {
      // Today: from midnight today
      startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (timeRange === "7d") {
      // Last 7 days
      startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeRange === "currentMonth") {
      // Current month: from first day of current month
      startTime = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      // Default to today
      startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
    
    const startTimeMs = startTime.getTime();
    
    return timeSeriesData
      .filter((item) => new Date(item.timestamp).getTime() >= startTimeMs)
      .map((item) => {
        const date = new Date(item.timestamp);
        return {
          ...item,
          date: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          time: date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });
  }, [timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Power v/s Fan Speed</CardTitle>
        {/* <CardDescription>
          <span className="hidden @[540px]/card:block">Dual-axis chart showing power consumption and average AHU speed</span>
          <span className="@[540px]/card:hidden">Power & Speed trends</span>
        </CardDescription> */}
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex">
            <ToggleGroupItem value="today">Today</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
            <ToggleGroupItem value="currentMonth">Current month</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select time range">
              <SelectValue placeholder="Today" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="today" className="rounded-lg">
                Today
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
              <SelectItem value="currentMonth" className="rounded-lg">
                Current month
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              key={timeRange}
              data={filteredData} 
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value, index) => {
                  // Show every 6th tick to avoid crowding
                  if (timeRange === "today") {
                    return index % 2 === 0 ? value : "";
                  } else if (timeRange === "7d") {
                    return index % 6 === 0 ? value : "";
                  } else if (timeRange === "currentMonth") {
                    return index % 24 === 0 ? value : "";
                  } else {
                    return index % 6 === 0 ? value : "";
                  }
                }}
              />
              <YAxis
                yAxisId="power"
                orientation="left"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value}kW`}
              />
              <YAxis
                yAxisId="speed"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value}RPM`}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value, payload) => {
                      if (payload?.[0]) {
                        const data = payload[0].payload;
                        return `${data.date} ${data.time}`;
                      }
                      return value;
                    }}
                    formatter={(value, name) => {
                      if (name === "powerConsumption") {
                        return ["Power Consumption - ", `${Number(value).toFixed(1)} kW`];
                      } else if (name === "averageSpeed") {
                        return ["Average Speed - ", `${Number(value).toFixed(0)} RPM`];
                      }
                      return [value, name];
                    }}
                    indicator="dot"
                  />
                }
              />
              <Line
                yAxisId="power"
                dataKey="powerConsumption"
                type="monotone"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
              />
              <Line
                yAxisId="speed"
                dataKey="averageSpeed"
                type="monotone"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
