import {
  IconBolt,
  IconDeviceDesktop,
  IconDroplet,
  IconTemperature,
  IconTrendingDown,
  IconTrendingUp,
  IconWind,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAHUOnlinePercentage,
  getAverageFanSpeed,
  getAverageHumidity,
  getAverageTemperature,
  getOnlineAHUCount,
  getTotalAHUCount,
  getTotalEnergyConsumption,
} from "@/data/ahu-data";

export function SectionCards() {
  const avgTemperature = getAverageTemperature();
  const avgHumidity = getAverageHumidity();
  const avgFanSpeed = getAverageFanSpeed();
  const totalEnergy = getTotalEnergyConsumption();
  const onlineAHUs = getOnlineAHUCount();
  const totalAHUs = getTotalAHUCount();
  const onlinePercentage = getAHUOnlinePercentage();

  // Calculate trend indicators (mock data for now)
  const temperatureTrend = 2.3; // +2.3°C vs yesterday
  const humidityTrend = -1.2; // -1.2% vs yesterday
  const fanSpeedTrend = 5.8; // +5.8% vs yesterday
  const energyTrend = -3.1; // -3.1% vs yesterday

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @3xl/main:grid-cols-3 @5xl/main:grid-cols-5">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <IconDeviceDesktop className="size-4" />
            AHUs Online
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {onlineAHUs}/{totalAHUs}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">{onlinePercentage.toFixed(1)}%</Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <IconTemperature className="size-4" />
            Avg Temperature
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {avgTemperature.toFixed(1)}°C
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {temperatureTrend > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {temperatureTrend > 0 ? "+" : ""}
              {temperatureTrend.toFixed(1)}°C
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <IconDroplet className="size-4" />
            Avg Humidity
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {avgHumidity.toFixed(1)}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {humidityTrend > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {humidityTrend > 0 ? "+" : ""}
              {humidityTrend.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <IconWind className="size-4" />
            Avg Fan Speed
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {avgFanSpeed.toFixed(0)} RPM
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {fanSpeedTrend > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {fanSpeedTrend > 0 ? "+" : ""}
              {fanSpeedTrend.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <IconBolt className="size-4" />
            Total Energy
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {totalEnergy.toFixed(1)} kWh
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {energyTrend > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {energyTrend > 0 ? "+" : ""}
              {energyTrend.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
