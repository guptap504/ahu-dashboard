import {
  IconBolt,
  IconDeviceDesktop,
  IconInfoCircle,
  IconLeaf,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  getAHUOnlinePercentage,
  getOnlineAHUCount,
  getTotalAHUCount,
  getTotalEnergyConsumption,
  getTotalEnergySaved,
} from "@/data/ahu-data";

export function SectionCards() {
  const totalEnergy = getTotalEnergyConsumption();
  const totalEnergySaved = getTotalEnergySaved();
  const onlineAHUs = getOnlineAHUCount();
  const totalAHUs = getTotalAHUCount();
  const onlinePercentage = getAHUOnlinePercentage();

  // Calculate trend indicators (mock data for now)
  const energyTrend = -3.1; // -3.1% vs yesterday
  const savingsTrend = 2.4; // +2.4% vs yesterday (improved optimization)

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @3xl/main:grid-cols-3">
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
            <IconBolt className="size-4" />
            Total Energy
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {totalEnergy.toFixed(1)} MWh
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

      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <IconLeaf className="size-4" />
            Energy Saved Today
            <Tooltip>
              <TooltipTrigger>
                <IconInfoCircle className="size-3 text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Savings compared to traditional axial fans</p>
              </TooltipContent>
            </Tooltip>
          </CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {totalEnergySaved.toFixed(1)} MWh
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {savingsTrend > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              {savingsTrend > 0 ? "+" : ""}
              {savingsTrend.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
