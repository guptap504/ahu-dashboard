import { IconArrowLeft, IconDeviceFloppy, IconRotateClockwise, IconSettings } from "@tabler/icons-react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { getAHUById } from "@/data/ahu-data";

export const Route = createFileRoute("/ahu_/$ahuId/edit")({
  component: AHUEdit,
  loader: ({ params }) => {
    const ahu = getAHUById(params.ahuId);
    if (!ahu) {
      throw notFound();
    }
    return { ahu };
  },
});

function AHUEdit() {
  const { ahu } = Route.useLoaderData();
  const navigate = useNavigate();
  const nameId = useId();
  const locationId = useId();
  const modelId = useId();
  const serialNumberId = useId();
  const installationDateId = useId();
  const numberOfFansId = useId();
  const [isOnline, setIsOnline] = useState(ahu.status === "online");
  const [formData, setFormData] = useState({
    name: ahu.name,
    location: ahu.location,
    model: ahu.model,
    serialNumber: ahu.serialNumber,
    installationDate: ahu.installationDate,
    numberOfFans: ahu.numberOfFans,
    efficiencyRating: ahu.efficiencyRating,
  });
  const [fanSpeeds, setFanSpeeds] = useState(ahu.fanSpeeds);
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleMasterToggle = (checked: boolean) => {
    setIsOnline(checked);
    setHasChanges(true);
  };

  const handleFanSpeedChange = (fanIndex: number, value: number[]) => {
    const newSpeeds = [...fanSpeeds];
    newSpeeds[fanIndex] = value[0];
    setFanSpeeds(newSpeeds);
    setHasChanges(true);
  };

  const handleNumberOfFansChange = (value: string) => {
    const newCount = parseInt(value, 10);
    const newSpeeds = Array.from({ length: newCount }, (_, i) => (i < fanSpeeds.length ? fanSpeeds[i] : 0));
    setFanSpeeds(newSpeeds);
    handleInputChange("numberOfFans", newCount);
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    toast.success("AHU information updated successfully");
    setHasChanges(false);
    navigate({ to: "/ahu/$ahuId", params: { ahuId: ahu.id } });
  };

  const handleReset = () => {
    setFormData({
      name: ahu.name,
      location: ahu.location,
      model: ahu.model,
      serialNumber: ahu.serialNumber,
      installationDate: ahu.installationDate,
      numberOfFans: ahu.numberOfFans,
      efficiencyRating: ahu.efficiencyRating,
    });
    setFanSpeeds(ahu.fanSpeeds);
    setIsOnline(ahu.status === "online");
    setHasChanges(false);
  };

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
                    <BreadcrumbLink href={`/ahu/${ahu.id}`}>{ahu.name}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Edit Information</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Header */}
            <div className="px-4 lg:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Edit AHU Information</h1>
                  <p className="text-muted-foreground">Update AHU specifications and fan settings</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={isOnline ? "default" : "secondary"} className="px-3 py-1">
                    {isOnline ? "Online" : "Offline"}
                  </Badge>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/ahu/$ahuId" params={{ ahuId: ahu.id }}>
                      <IconArrowLeft className="size-4 mr-2" />
                      Back to AHU
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* AHU Basic Information */}
            <div className="px-4 lg:px-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconSettings className="size-5" />
                    AHU Basic Information
                  </CardTitle>
                  <CardDescription>Update basic AHU details and specifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor={nameId}>AHU Name</Label>
                      <Input
                        id={nameId}
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter AHU name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={locationId}>Location</Label>
                      <Input
                        id={locationId}
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="Enter location"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={modelId}>Model</Label>
                      <Input
                        id={modelId}
                        value={formData.model}
                        onChange={(e) => handleInputChange("model", e.target.value)}
                        placeholder="Enter model"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={serialNumberId}>Serial Number</Label>
                      <Input
                        id={serialNumberId}
                        value={formData.serialNumber}
                        onChange={(e) => handleInputChange("serialNumber", e.target.value)}
                        placeholder="Enter serial number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={installationDateId}>Installation Date</Label>
                      <Input
                        id={installationDateId}
                        type="date"
                        value={formData.installationDate}
                        onChange={(e) => handleInputChange("installationDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={numberOfFansId}>Number of Fans</Label>
                      <Select value={formData.numberOfFans.toString()} onValueChange={handleNumberOfFansChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
                            <SelectItem key={`fan-count-${num}`} value={num.toString()}>
                              {num} Fan{num > 1 ? "s" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Efficiency Rating</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[formData.efficiencyRating]}
                        onValueChange={(value) => handleInputChange("efficiencyRating", value[0])}
                        max={5}
                        min={1}
                        step={1}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-1 min-w-[120px]">
                        {Array.from({ length: formData.efficiencyRating }, (_, i) => (
                          <div key={`filled-star-${ahu.id}-${i}`} className="h-4 w-4 bg-yellow-400 rounded-sm" />
                        ))}
                        {Array.from({ length: 5 - formData.efficiencyRating }, (_, i) => (
                          <div key={`empty-star-${ahu.id}-${i}`} className="h-4 w-4 bg-gray-300 rounded-sm" />
                        ))}
                        <span className="ml-2 text-sm font-medium">{formData.efficiencyRating}/5</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Fan Specifications */}
            <div className="px-4 lg:px-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fan Specifications & Control</CardTitle>
                  <CardDescription>Configure individual fan settings and power control</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Master Control */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Master Power</p>
                      <p className="text-xs text-muted-foreground">Turn the entire AHU on or off</p>
                    </div>
                    <Switch checked={isOnline} onCheckedChange={handleMasterToggle} />
                  </div>

                  <Separator />

                  {/* Individual Fan Controls */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Individual Fan Speed Controls</h4>
                    {Array.from({ length: formData.numberOfFans }, (_, index) => (
                      <div key={`fan-control-${ahu.id}-${index}`} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${!isOnline ? "text-muted-foreground" : ""}`}>
                            Fan {index + 1}
                          </span>
                          <span className={`text-sm ${!isOnline ? "text-muted-foreground" : "text-muted-foreground"}`}>
                            {fanSpeeds[index]?.toFixed(0) || 0} RPM
                          </span>
                        </div>
                        <Slider
                          value={[fanSpeeds[index] || 0]}
                          onValueChange={(value) => handleFanSpeedChange(index, value)}
                          max={2000}
                          min={0}
                          step={50}
                          disabled={!isOnline}
                          className={`w-full ${!isOnline ? "opacity-50" : ""}`}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0 RPM</span>
                          <span>2000 RPM</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Fan Specifications Info */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Fan Motor Specifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p>
                          <strong>Rated Power:</strong> 1520 kW per motor
                        </p>
                        <p>
                          <strong>Max Speed:</strong> 1500 RPM
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Efficiency:</strong> 85-95% at rated speed
                        </p>
                        <p>
                          <strong>Power Formula:</strong> P = P_rated × (RPM/1500)³
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="px-4 lg:px-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {hasChanges ? "You have unsaved changes" : "No changes made"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
                        <IconRotateClockwise className="size-4 mr-2" />
                        Reset Changes
                      </Button>
                      <Button onClick={handleSave} disabled={!hasChanges}>
                        <IconDeviceFloppy className="size-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
  );
}
