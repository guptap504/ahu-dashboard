import { IconArrowLeft, IconSettings } from "@tabler/icons-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useId, useState } from "react";
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
  const nameId = useId();
  const locationId = useId();
  const modelId = useId();
  const serialNumberId = useId();
  const installationDateId = useId();
  const numberOfFansId = useId();
  const [formData, setFormData] = useState({
    name: ahu.name,
    location: ahu.location,
    model: ahu.model,
    serialNumber: ahu.serialNumber,
    installationDate: ahu.installationDate,
    numberOfFans: ahu.numberOfFans,
  });
  const [fanSpeeds, setFanSpeeds] = useState(ahu.fanSpeeds);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNumberOfFansChange = (value: string) => {
    const newCount = parseInt(value, 10);
    const newSpeeds = Array.from({ length: newCount }, (_, i) => (i < fanSpeeds.length ? fanSpeeds[i] : 0));
    setFanSpeeds(newSpeeds);
    handleInputChange("numberOfFans", newCount);
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
                    AHU Information
                  </CardTitle>
                  <CardDescription>Update AHU details and specifications</CardDescription>
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

                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
  );
}
