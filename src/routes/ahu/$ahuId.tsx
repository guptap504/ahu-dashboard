import { 
  IconArrowLeft, 
  IconBolt, 
  IconClock, 
  IconDroplet, 
  IconPower, 
  IconSettings,
  IconStar,
  IconTemperature, 
  IconWind 
} from "@tabler/icons-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { getAHUById, timeSeriesData } from "@/data/ahu-data";

export const Route = createFileRoute("/ahu/$ahuId")({
  component: AHUDetail,
  loader: ({ params }) => {
    const ahu = getAHUById(params.ahuId);
    if (!ahu) {
      throw notFound();
    }
    return { ahu };
  },
});

function AHUDetail() {
  const { ahu } = Route.useLoaderData();
  const [isOnline, setIsOnline] = useState(ahu.status === 'online');
  const [fanSpeeds, setFanSpeeds] = useState(ahu.fanSpeeds);
  const [hasChanges, setHasChanges] = useState(false);

  const handleMasterToggle = (checked: boolean) => {
    setIsOnline(checked);
    if (!checked) {
      setFanSpeeds(new Array(ahu.numberOfFans).fill(0));
    } else {
      setFanSpeeds(ahu.fanSpeeds);
    }
    setHasChanges(true);
  };

  const handleFanSpeedChange = (fanIndex: number, value: number[]) => {
    const newSpeeds = [...fanSpeeds];
    newSpeeds[fanIndex] = value[0];
    setFanSpeeds(newSpeeds);
    setHasChanges(true);
  };

  const handleSave = () => {
    toast.success("AHU settings saved successfully");
    setHasChanges(false);
  };

  const handleReset = () => {
    setIsOnline(ahu.status === 'online');
    setFanSpeeds(ahu.fanSpeeds);
    setHasChanges(false);
  };

  // Generate 24-hour historical data for this AHU
  const historicalData = timeSeriesData
    .slice(-24) // Last 24 hours
    .map((item) => ({
      ...item,
      time: new Date(item.timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      ahuTemperature: ahu.currentTemperature + (Math.random() - 0.5) * 2,
      ahuHumidity: ahu.currentHumidity + (Math.random() - 0.5) * 5,
      ahuPower: ahu.currentPowerConsumption + (Math.random() - 0.5) * 2,
      ahuSpeed: ahu.averageFanSpeed + (Math.random() - 0.5) * 200,
    }));

  const chartConfig = {
    ahuTemperature: {
      label: "Temperature",
      color: "#3b82f6", // Bright blue
    },
    ahuHumidity: {
      label: "Humidity",
      color: "#10b981", // Bright green
    },
    ahuPower: {
      label: "Power Consumption",
      color: "#f59e0b", // Bright amber
    },
    ahuSpeed: {
      label: "Average Speed",
      color: "#ef4444", // Bright red
    },
  } satisfies ChartConfig;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Breadcrumb */}
              <div className="px-4 lg:px-6">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Portfolio</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{ahu.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Header */}
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{ahu.name}</h1>
                    <p className="text-muted-foreground">{ahu.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={isOnline ? "default" : "secondary"} className="px-3 py-1">
                      <IconPower className="size-3 mr-1" />
                      {isOnline ? "Online" : "Offline"}
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/">
                        <IconArrowLeft className="size-4 mr-2" />
                        Back to Portfolio
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Metadata Section */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconSettings className="size-5" />
                      AHU Specifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Model</p>
                        <p className="text-sm">{ahu.model}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Serial Number</p>
                        <p className="text-sm font-mono">{ahu.serialNumber}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Installation Date</p>
                        <p className="text-sm">{new Date(ahu.installationDate).toLocaleDateString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Number of Fans</p>
                        <p className="text-sm">{ahu.numberOfFans}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Current Stats */}
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                      <IconTemperature className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{ahu.currentTemperature.toFixed(1)}°C</div>
                      <p className="text-xs text-muted-foreground">Current reading</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Humidity</CardTitle>
                      <IconDroplet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{ahu.currentHumidity.toFixed(1)}%</div>
                      <p className="text-xs text-muted-foreground">Current reading</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Fan Speed</CardTitle>
                      <IconWind className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{ahu.averageFanSpeed.toFixed(0)} RPM</div>
                      <p className="text-xs text-muted-foreground">Current average</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Power Consumption</CardTitle>
                      <IconBolt className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{ahu.currentPowerConsumption.toFixed(1)} kW</div>
                      <p className="text-xs text-muted-foreground">Current usage</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Runtime Today</CardTitle>
                      <IconClock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{ahu.totalRuntimeToday.toFixed(1)}h</div>
                      <p className="text-xs text-muted-foreground">Total hours</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Efficiency Rating</CardTitle>
                      <IconStar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold flex items-center gap-1">
                        {Array.from({ length: ahu.efficiencyRating }, (_, i) => (
                          <IconStar key={`filled-star-${ahu.id}-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                        {Array.from({ length: 5 - ahu.efficiencyRating }, (_, i) => (
                          <IconStar key={`empty-star-${ahu.id}-${i}`} className="h-5 w-5 text-gray-300" />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">Performance rating</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Control Panel */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Control Panel</CardTitle>
                    <CardDescription>Manage AHU power and fan speeds</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Master Control */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Master Power</p>
                        <p className="text-xs text-muted-foreground">Turn the entire AHU on or off</p>
                      </div>
                      <Switch
                        checked={isOnline}
                        onCheckedChange={handleMasterToggle}
                      />
                    </div>

                    <Separator />

                    {/* Individual Fan Controls */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Individual Fan Speed Controls</h4>
                      {Array.from({ length: ahu.numberOfFans }, (_, index) => (
                        <div key={`fan-${ahu.id}-${index}`} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Fan {index + 1}</span>
                            <span className="text-sm text-muted-foreground">
                              {fanSpeeds[index].toFixed(0)} RPM
                            </span>
                          </div>
                          <Slider
                            value={[fanSpeeds[index]]}
                            onValueChange={(value) => handleFanSpeedChange(index, value)}
                            max={2000}
                            min={0}
                            step={50}
                            disabled={!isOnline}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-4">
                      <Button onClick={handleSave} disabled={!hasChanges}>
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
                        Reset to Default
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Historical Data Chart */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>24-Hour Performance History</CardTitle>
                    <CardDescription>Temperature, humidity, power consumption, and fan speed trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value, index) => index % 4 === 0 ? value : ""}
                          />
                          <YAxis
                            yAxisId="left"
                            orientation="left"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => `${value}°C`}
                          />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <ChartTooltip
                            cursor={false}
                            content={
                              <ChartTooltipContent
                                labelFormatter={(value, payload) => {
                                  if (payload?.[0]) {
                                    const data = payload[0].payload;
                                    return `${data.time}`;
                                  }
                                  return value;
                                }}
                                formatter={(value, name) => {
                                  if (name === "ahuTemperature") return ["Temperature - ", `${Number(value).toFixed(1)}°C`];
                                  if (name === "ahuHumidity") return ["Humidity - ", `${Number(value).toFixed(1)}%`];
                                  if (name === "ahuPower") return ["Power Consumption - ", `${Number(value).toFixed(1)} kW`];
                                  if (name === "ahuSpeed") return ["Average Speed - ", `${Number(value).toFixed(0)} RPM`];
                                  return [value, name];
                                }}
                                indicator="dot"
                              />
                            }
                          />
                          <Line
                            yAxisId="left"
                            dataKey="ahuTemperature"
                            type="monotone"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                          />
                          <Line
                            yAxisId="left"
                            dataKey="ahuHumidity"
                            type="monotone"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                          />
                          <Line
                            yAxisId="right"
                            dataKey="ahuPower"
                            type="monotone"
                            stroke="#f59e0b"
                            strokeWidth={3}
                            dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: "#f59e0b", strokeWidth: 2 }}
                          />
                          <Line
                            yAxisId="right"
                            dataKey="ahuSpeed"
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
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
