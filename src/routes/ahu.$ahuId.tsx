import {
  IconArrowLeft,
  IconBolt,
  IconDroplet,
  IconEdit,
  IconPower,
  IconTemperature,
  IconWind,
} from "@tabler/icons-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
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
  console.log(ahu);
  const [isOnline, setIsOnline] = useState(ahu.status === "online");
  const [fanSpeeds, setFanSpeeds] = useState(ahu.fanSpeeds);
  const [hasChanges, setHasChanges] = useState(false);
  const [showPowerDialog, setShowPowerDialog] = useState(false);

  const handleMasterPowerClick = () => {
    setShowPowerDialog(true);
  };

  const handlePowerConfirm = () => {
    setIsOnline(!isOnline);
    setHasChanges(true);
    setShowPowerDialog(false);
    toast.success(`AHU ${!isOnline ? "turned on" : "turned off"} successfully`);
  };

  const handleFanSpeedChange = (fanIndex: number, value: number[]) => {
    const newSpeeds = [...fanSpeeds];
    newSpeeds[fanIndex] = value[0];
    setFanSpeeds(newSpeeds);
    setHasChanges(true);
  };

  const handlePresetChange = (fanIndex: number, preset: string) => {
    if (preset === "custom") return; // Don't change value if custom is selected
    const percentage = parseInt(preset, 10);
    const presetValue = Math.round((percentage / 100) * 1500); // Convert percentage to RPM (0-1500)
    const newSpeeds = [...fanSpeeds];
    newSpeeds[fanIndex] = presetValue;
    setFanSpeeds(newSpeeds);
    setHasChanges(true);
  };

  const getPresetValue = (fanSpeed: number) => {
    const percentage = Math.round((fanSpeed / 1500) * 100);
    const presets = [0, 25, 50, 75, 100];
    return presets.includes(percentage) ? percentage.toString() : "custom";
  };

  const handleSave = () => {
    toast.success("AHU settings saved successfully");
    setHasChanges(false);
  };

  const handleReset = () => {
    setIsOnline(ahu.status === "online");
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
      ahuTemperature: item.temperature,
      ahuHumidity: item.humidity,
      ahuPower: item.powerConsumption,
      ahuSpeed: item.averageSpeed,
    }));

  const temperatureHumidityConfig = {
    ahuTemperature: {
      label: "Temperature",
      color: "#3b82f6", // Bright blue
    },
    ahuHumidity: {
      label: "Humidity",
      color: "#10b981", // Bright green
    },
  } satisfies ChartConfig;

  const speedPowerConfig = {
    ahuSpeed: {
      label: "Average Speed",
      color: "#ef4444", // Bright red
    },
    ahuPower: {
      label: "Power Consumption",
      color: "#f59e0b", // Bright amber
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="@container/main flex flex-1 flex-col gap-2 overflow-auto">
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
            <div className="flex md:flex-row flex-col items-start md:items-center gap-2 justify-between">
              <div>
                <h1 className="text-2xl font-bold">{ahu.name}</h1>
                <p className="text-muted-foreground">{ahu.location}</p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 w-full md:w-auto">
                <div className="flex flex-row gap-2">
                  <Button
                    variant={isOnline ? "default" : "secondary"}
                    size="sm"
                    onClick={handleMasterPowerClick}
                    className="px-3 py-1">
                    <IconPower className="size-3 mr-1" />
                    {isOnline ? "Turn Off" : "Turn On"}
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/ahu/$ahuId/edit" params={{ ahuId: ahu.id }}>
                      <IconEdit className="size-4 mr-2" />
                      Edit Info
                    </Link>
                  </Button>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/">
                    <IconArrowLeft className="size-4 mr-2" />
                    Back to Portfolio
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Hero Stats Bar */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <IconTemperature className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium text-muted-foreground">Temperature</span>
                    </div>
                    <div className="text-3xl font-bold">{ahu.currentTemperature.toFixed(1)}°C</div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <IconDroplet className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium text-muted-foreground">Humidity</span>
                    </div>
                    <div className="text-3xl font-bold">{ahu.currentHumidity.toFixed(1)}%</div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <IconWind className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-medium text-muted-foreground">Avg. Fan Speed</span>
                    </div>
                    <div className="text-3xl font-bold">{ahu.averageFanSpeed.toFixed(0)} RPM</div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <IconBolt className="h-5 w-5 text-amber-500" />
                      <span className="text-sm font-medium text-muted-foreground">Power</span>
                    </div>
                    <div className="text-3xl font-bold">{ahu.currentPowerConsumption.toFixed(1)} kW</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Control Panel</CardTitle>
                <CardDescription>Manage individual fan speeds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Individual Fan Controls */}
                <div className="space-y-4">
                  {Array.from({ length: ahu.numberOfFans }, (_, index) => (
                    <div key={`fan-${ahu.id}-${index}`} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${!isOnline ? "text-muted-foreground" : ""}`}>
                          Fan {index + 1}
                        </span>
                        <span className={`text-sm ${!isOnline ? "text-muted-foreground" : "text-muted-foreground"}`}>
                          {fanSpeeds[index].toFixed(0)} RPM
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Slider
                          value={[fanSpeeds[index]]}
                          onValueChange={(value) => handleFanSpeedChange(index, value)}
                          max={1500}
                          min={0}
                          step={50}
                          disabled={!isOnline}
                          className={`flex-1 ${!isOnline ? "opacity-50" : ""}`}
                        />
                        <Select
                          value={getPresetValue(fanSpeeds[index])}
                          onValueChange={(value) => handlePresetChange(index, value)}
                          disabled={!isOnline}>
                          <SelectTrigger className="w-25">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0%</SelectItem>
                            <SelectItem value="25">25%</SelectItem>
                            <SelectItem value="50">50%</SelectItem>
                            <SelectItem value="75">75%</SelectItem>
                            <SelectItem value="100">100%</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button disabled={!hasChanges}>Save Changes</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Save AHU Settings</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to save these changes? This will update the AHU settings and may affect
                          the current operation of the air handling unit.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSave}>Save Changes</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" disabled={!hasChanges}>
                        Reset to Default
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Reset AHU Settings</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to reset all changes? This will restore the AHU settings to their
                          original values and discard any unsaved changes.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleReset}>Reset Changes</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Power Confirmation Dialog */}
          <AlertDialog open={showPowerDialog} onOpenChange={setShowPowerDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{isOnline ? "Turn Off AHU" : "Turn On AHU"}</AlertDialogTitle>
                <AlertDialogDescription>
                  {isOnline
                    ? "Are you sure you want to turn off this AHU? This will stop all fan operations and may affect the air quality in the building."
                    : "Are you sure you want to turn on this AHU? This will start all fan operations and begin air circulation."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handlePowerConfirm}>{isOnline ? "Turn Off" : "Turn On"}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Historical Data Charts */}
          <div className="px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fan Speed and Power Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Fan Speed & Power</CardTitle>
                  <CardDescription>24-hour fan speed and power consumption trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={speedPowerConfig} className="aspect-auto h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="time"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          minTickGap={32}
                          tickFormatter={(value, index) => (index % 4 === 0 ? value : "")}
                        />
                        <YAxis
                          yAxisId="left"
                          orientation="left"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => `${value} RPM`}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => `${value} kW`}
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
                                if (name === "ahuSpeed") return ["Average Speed - ", `${Number(value).toFixed(0)} RPM`];
                                if (name === "ahuPower")
                                  return ["Power Consumption - ", `${Number(value).toFixed(1)} kW`];
                                return [value, name];
                              }}
                              indicator="dot"
                            />
                          }
                        />
                        <Line
                          yAxisId="left"
                          dataKey="ahuSpeed"
                          type="monotone"
                          stroke="#ef4444"
                          strokeWidth={3}
                          dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2 }}
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
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              {/* Temperature and Humidity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Temperature & Humidity</CardTitle>
                  <CardDescription>24-hour temperature and humidity trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={temperatureHumidityConfig} className="aspect-auto h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="time"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          minTickGap={32}
                          tickFormatter={(value, index) => (index % 4 === 0 ? value : "")}
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
                                if (name === "ahuTemperature")
                                  return ["Temperature - ", `${Number(value).toFixed(1)}°C`];
                                if (name === "ahuHumidity") return ["Humidity - ", `${Number(value).toFixed(1)}%`];
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
                          yAxisId="right"
                          dataKey="ahuHumidity"
                          type="monotone"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
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
    </div>
  );
}
