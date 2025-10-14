export interface AHUData {
  id: string;
  name: string;
  location: string;
  model: string;
  serialNumber: string;
  installationDate: string;
  numberOfFans: number;
  status: "online" | "offline";
  currentTemperature: number; // °C
  currentHumidity: number; // %
  averageFanSpeed: number; // RPM
  currentPowerConsumption: number; // kW
  totalEnergyToday: number; // MWh
  fanSpeeds: number[]; // Individual fan speeds in RPM
  efficiencyRating: number; // 1-5 stars
  totalRuntimeToday: number; // hours
}

export interface TimeSeriesData {
  timestamp: string;
  powerConsumption: number; // kW
  averageSpeed: number; // RPM
  temperature: number; // °C
  humidity: number; // %
}

// Fan motor specifications: 1520kW per motor, max 1500rpm
// Power consumption calculated based on fan speed using cubic relationship: P = P_rated * (RPM/1500)^3
// Typical efficiency: 85-95% at rated speed, lower at partial loads

// Mock AHU deployments
export const ahuDeployments: AHUData[] = [
  {
    id: "ahu-001",
    name: "Main Building AHU-1",
    location: "Building A - Floor 1",
    model: "Carrier 39CQ",
    serialNumber: "C39CQ-2024-001",
    installationDate: "2024-01-15",
    numberOfFans: 3,
    status: "online",
    currentTemperature: 22.5,
    currentHumidity: 45,
    averageFanSpeed: 1250,
    currentPowerConsumption: 2856, // 3 fans at ~952kW each (1250/1500)^3 * 1520kW
    totalEnergyToday: 54.8, // 19.2 hours * 2856kW / 1000
    fanSpeeds: [1200, 1300, 1250],
    efficiencyRating: 4,
    totalRuntimeToday: 19.2,
  },
  {
    id: "ahu-002",
    name: "Office Wing AHU-2",
    location: "Building A - Floor 2",
    model: "Trane TWE",
    serialNumber: "TWE-2024-002",
    installationDate: "2024-02-03",
    numberOfFans: 2,
    status: "online",
    currentTemperature: 23.1,
    currentHumidity: 42,
    averageFanSpeed: 1100,
    currentPowerConsumption: 1608, // 2 fans at ~804kW each (1100/1500)^3 * 1520kW
    totalEnergyToday: 33.6, // 20.9 hours * 1608kW / 1000
    fanSpeeds: [1050, 1150],
    efficiencyRating: 5,
    totalRuntimeToday: 20.9,
  },
  {
    id: "ahu-003",
    name: "Conference Center AHU-3",
    location: "Building B - Floor 1",
    model: "York YCIV",
    serialNumber: "YCIV-2024-003",
    installationDate: "2024-01-28",
    numberOfFans: 4,
    status: "offline",
    currentTemperature: 24.8,
    currentHumidity: 38,
    averageFanSpeed: 0,
    currentPowerConsumption: 0,
    totalEnergyToday: 0,
    fanSpeeds: [0, 0, 0, 0],
    efficiencyRating: 3,
    totalRuntimeToday: 0,
  },
  {
    id: "ahu-004",
    name: "Laboratory AHU-4",
    location: "Building C - Floor 3",
    model: "Daikin VRV",
    serialNumber: "VRV-2024-004",
    installationDate: "2024-03-10",
    numberOfFans: 2,
    status: "online",
    currentTemperature: 21.2,
    currentHumidity: 35,
    averageFanSpeed: 1400,
    currentPowerConsumption: 2368, // 2 fans at ~1184kW each (1400/1500)^3 * 1520kW
    totalEnergyToday: 46.4, // 19.6 hours * 2368kW / 1000
    fanSpeeds: [1350, 1450],
    efficiencyRating: 4,
    totalRuntimeToday: 19.6,
  },
  {
    id: "ahu-005",
    name: "Server Room AHU-5",
    location: "Building A - Basement",
    model: "Lennox LCC",
    serialNumber: "LCC-2024-005",
    installationDate: "2024-02-20",
    numberOfFans: 3,
    status: "online",
    currentTemperature: 18.5,
    currentHumidity: 30,
    averageFanSpeed: 1500, // Max speed for critical server room
    currentPowerConsumption: 4560, // 3 fans at 1520kW each (full speed)
    totalEnergyToday: 91.2, // 20.0 hours * 4560kW / 1000
    fanSpeeds: [1500, 1500, 1500],
    efficiencyRating: 5,
    totalRuntimeToday: 20.0,
  },
  {
    id: "ahu-006",
    name: "Cafeteria AHU-6",
    location: "Building B - Floor 2",
    model: "Carrier 39CQ",
    serialNumber: "C39CQ-2024-006",
    installationDate: "2024-01-08",
    numberOfFans: 2,
    status: "online",
    currentTemperature: 25.3,
    currentHumidity: 48,
    averageFanSpeed: 950,
    currentPowerConsumption: 1152, // 2 fans at ~576kW each (950/1500)^3 * 1520kW
    totalEnergyToday: 21.8, // 18.9 hours * 1152kW / 1000
    fanSpeeds: [900, 1000],
    efficiencyRating: 3,
    totalRuntimeToday: 18.9,
  },
  {
    id: "ahu-007",
    name: "Warehouse AHU-7",
    location: "Building D - Floor 1",
    model: "Trane TWE",
    serialNumber: "TWE-2024-007",
    installationDate: "2024-03-05",
    numberOfFans: 1,
    status: "online",
    currentTemperature: 26.7,
    currentHumidity: 52,
    averageFanSpeed: 800,
    currentPowerConsumption: 576, // 1 fan at 576kW (800/1500)^3 * 1520kW
    totalEnergyToday: 10.9, // 19.0 hours * 576kW / 1000
    fanSpeeds: [800],
    efficiencyRating: 2,
    totalRuntimeToday: 19.0,
  },
  {
    id: "ahu-008",
    name: "Executive Floor AHU-8",
    location: "Building A - Floor 5",
    model: "York YCIV",
    serialNumber: "YCIV-2024-008",
    installationDate: "2024-02-14",
    numberOfFans: 3,
    status: "online",
    currentTemperature: 22.0,
    currentHumidity: 40,
    averageFanSpeed: 1150,
    currentPowerConsumption: 2016, // 3 fans at ~672kW each (1150/1500)^3 * 1520kW
    totalEnergyToday: 38.7, // 19.2 hours * 2016kW / 1000
    fanSpeeds: [1100, 1150, 1200],
    efficiencyRating: 4,
    totalRuntimeToday: 19.2,
  },
  {
    id: "ahu-009",
    name: "Training Room AHU-9",
    location: "Building C - Floor 2",
    model: "Daikin VRV",
    serialNumber: "VRV-2024-009",
    installationDate: "2024-01-22",
    numberOfFans: 2,
    status: "offline",
    currentTemperature: 24.5,
    currentHumidity: 44,
    averageFanSpeed: 0,
    currentPowerConsumption: 0,
    totalEnergyToday: 0,
    fanSpeeds: [0, 0],
    efficiencyRating: 3,
    totalRuntimeToday: 0,
  },
  {
    id: "ahu-010",
    name: "Reception AHU-10",
    location: "Building A - Ground Floor",
    model: "Lennox LCC",
    serialNumber: "LCC-2024-010",
    installationDate: "2024-03-18",
    numberOfFans: 2,
    status: "online",
    currentTemperature: 23.8,
    currentHumidity: 46,
    averageFanSpeed: 1050,
    currentPowerConsumption: 1344, // 2 fans at ~672kW each (1050/1500)^3 * 1520kW
    totalEnergyToday: 25.7, // 19.1 hours * 1344kW / 1000
    fanSpeeds: [1000, 1100],
    efficiencyRating: 4,
    totalRuntimeToday: 19.1,
  },
];

// Time series data from the start of current month (hourly data)
export const timeSeriesData: TimeSeriesData[] = (() => {
  const data: TimeSeriesData[] = [];
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Calculate hours from start of month to now
  const hoursFromStart = Math.floor((now.getTime() - startOfMonth.getTime()) / (1000 * 60 * 60));

  for (let i = 0; i <= hoursFromStart; i++) {
    const timestamp = new Date(startOfMonth.getTime() + i * 60 * 60 * 1000);

    // Generate realistic patterns
    const hour = timestamp.getHours();
    const dayOfWeek = timestamp.getDay();
    const dayOfMonth = timestamp.getDate();

    // Base values with daily and hourly patterns
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isNightTime = hour >= 22 || hour <= 6;
    const isPeakTime = hour >= 9 && hour <= 17;

    // Add monthly variation (higher consumption mid-month)
    const monthlyFactor = 1 + 0.2 * Math.sin((dayOfMonth / 15) * Math.PI);

    // Fan speed pattern (RPM) - realistic range 0-1500rpm
    let baseSpeed = isWeekend ? 600 : 900; // Lower on weekends
    baseSpeed *= monthlyFactor; // Apply monthly variation
    if (isNightTime)
      baseSpeed *= 0.3; // Very low at night
    else if (isPeakTime) baseSpeed *= 1.2; // Higher during peak hours

    // Ensure speed doesn't exceed 1500rpm
    baseSpeed = Math.min(baseSpeed, 1500);

    // Power consumption pattern based on fan speed using cubic relationship
    // P = P_rated * (RPM/1500)^3 where P_rated = 1520kW per fan
    // Assuming average of 2.5 fans per AHU across the system
    const fansPerAHU = 2.5;
    const ratedPowerPerFan = 1520; // kW
    let basePower = fansPerAHU * ratedPowerPerFan * (baseSpeed / 1500) ** 3;

    // Apply efficiency factor (85-95% at rated speed, lower at partial loads)
    const efficiency = 0.85 + (baseSpeed / 1500) * 0.1; // 85% at low speed, 95% at rated speed
    basePower *= efficiency;

    // Add some randomness (proportional to base values)
    const powerVariation = (Math.random() - 0.5) * basePower * 0.05; // ±2.5% variation
    const speedVariation = (Math.random() - 0.5) * 50; // ±25 RPM variation
    const tempVariation = (Math.random() - 0.5) * 2;
    const humidityVariation = (Math.random() - 0.5) * 5;

    data.push({
      timestamp: timestamp.toISOString(),
      powerConsumption: Math.max(0, basePower + powerVariation),
      averageSpeed: Math.max(0, baseSpeed + speedVariation),
      temperature: 22 + tempVariation + (isPeakTime ? 1 : 0),
      humidity: 40 + humidityVariation + (isPeakTime ? 3 : 0),
    });
  }

  return data;
})();

// Helper functions for calculations
export function getTotalEnergyConsumption(): number {
  return ahuDeployments.reduce((sum, ahu) => sum + ahu.totalEnergyToday, 0);
}

export function getAHUById(id: string): AHUData | undefined {
  return ahuDeployments.find((ahu) => ahu.id === id);
}

export function getOnlineAHUCount(): number {
  return ahuDeployments.filter((ahu) => ahu.status === "online").length;
}

export function getTotalAHUCount(): number {
  return ahuDeployments.length;
}

export function getAHUOnlinePercentage(): number {
  const total = getTotalAHUCount();
  if (total === 0) return 0;
  return (getOnlineAHUCount() / total) * 100;
}

export function getTotalEnergySaved(): number {
  // Garvata optimization saves 40-50% energy compared to axial fans
  // Using average of 45% savings
  const totalEnergy = getTotalEnergyConsumption();
  const savingsPercentage = 0.45; // 45% average savings
  return totalEnergy * savingsPercentage;
}
