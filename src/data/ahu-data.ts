export interface AHUData {
  id: string;
  name: string;
  location: string;
  model: string;
  serialNumber: string;
  installationDate: string;
  numberOfFans: number;
  status: 'online' | 'offline';
  currentTemperature: number; // °C
  currentHumidity: number; // %
  averageFanSpeed: number; // RPM
  currentPowerConsumption: number; // kW
  totalEnergyToday: number; // kWh
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

// Mock AHU deployments
export const ahuDeployments: AHUData[] = [
  {
    id: 'ahu-001',
    name: 'Main Building AHU-1',
    location: 'Building A - Floor 1',
    model: 'Carrier 39CQ',
    serialNumber: 'C39CQ-2024-001',
    installationDate: '2024-01-15',
    numberOfFans: 3,
    status: 'online',
    currentTemperature: 22.5,
    currentHumidity: 45,
    averageFanSpeed: 1250,
    currentPowerConsumption: 8.2,
    totalEnergyToday: 156.8,
    fanSpeeds: [1200, 1300, 1250],
    efficiencyRating: 4,
    totalRuntimeToday: 19.2
  },
  {
    id: 'ahu-002',
    name: 'Office Wing AHU-2',
    location: 'Building A - Floor 2',
    model: 'Trane TWE',
    serialNumber: 'TWE-2024-002',
    installationDate: '2024-02-03',
    numberOfFans: 2,
    status: 'online',
    currentTemperature: 23.1,
    currentHumidity: 42,
    averageFanSpeed: 1100,
    currentPowerConsumption: 6.8,
    totalEnergyToday: 142.3,
    fanSpeeds: [1050, 1150],
    efficiencyRating: 5,
    totalRuntimeToday: 20.9
  },
  {
    id: 'ahu-003',
    name: 'Conference Center AHU-3',
    location: 'Building B - Floor 1',
    model: 'York YCIV',
    serialNumber: 'YCIV-2024-003',
    installationDate: '2024-01-28',
    numberOfFans: 4,
    status: 'offline',
    currentTemperature: 24.8,
    currentHumidity: 38,
    averageFanSpeed: 0,
    currentPowerConsumption: 0,
    totalEnergyToday: 0,
    fanSpeeds: [0, 0, 0, 0],
    efficiencyRating: 3,
    totalRuntimeToday: 0
  },
  {
    id: 'ahu-004',
    name: 'Laboratory AHU-4',
    location: 'Building C - Floor 3',
    model: 'Daikin VRV',
    serialNumber: 'VRV-2024-004',
    installationDate: '2024-03-10',
    numberOfFans: 2,
    status: 'online',
    currentTemperature: 21.2,
    currentHumidity: 35,
    averageFanSpeed: 1400,
    currentPowerConsumption: 9.1,
    totalEnergyToday: 178.5,
    fanSpeeds: [1350, 1450],
    efficiencyRating: 4,
    totalRuntimeToday: 19.6
  },
  {
    id: 'ahu-005',
    name: 'Server Room AHU-5',
    location: 'Building A - Basement',
    model: 'Lennox LCC',
    serialNumber: 'LCC-2024-005',
    installationDate: '2024-02-20',
    numberOfFans: 3,
    status: 'online',
    currentTemperature: 18.5,
    currentHumidity: 30,
    averageFanSpeed: 1600,
    currentPowerConsumption: 12.3,
    totalEnergyToday: 245.7,
    fanSpeeds: [1550, 1600, 1650],
    efficiencyRating: 5,
    totalRuntimeToday: 20.0
  },
  {
    id: 'ahu-006',
    name: 'Cafeteria AHU-6',
    location: 'Building B - Floor 2',
    model: 'Carrier 39CQ',
    serialNumber: 'C39CQ-2024-006',
    installationDate: '2024-01-08',
    numberOfFans: 2,
    status: 'online',
    currentTemperature: 25.3,
    currentHumidity: 48,
    averageFanSpeed: 950,
    currentPowerConsumption: 5.2,
    totalEnergyToday: 98.4,
    fanSpeeds: [900, 1000],
    efficiencyRating: 3,
    totalRuntimeToday: 18.9
  },
  {
    id: 'ahu-007',
    name: 'Warehouse AHU-7',
    location: 'Building D - Floor 1',
    model: 'Trane TWE',
    serialNumber: 'TWE-2024-007',
    installationDate: '2024-03-05',
    numberOfFans: 1,
    status: 'online',
    currentTemperature: 26.7,
    currentHumidity: 52,
    averageFanSpeed: 800,
    currentPowerConsumption: 3.8,
    totalEnergyToday: 72.1,
    fanSpeeds: [800],
    efficiencyRating: 2,
    totalRuntimeToday: 19.0
  },
  {
    id: 'ahu-008',
    name: 'Executive Floor AHU-8',
    location: 'Building A - Floor 5',
    model: 'York YCIV',
    serialNumber: 'YCIV-2024-008',
    installationDate: '2024-02-14',
    numberOfFans: 3,
    status: 'online',
    currentTemperature: 22.0,
    currentHumidity: 40,
    averageFanSpeed: 1150,
    currentPowerConsumption: 7.5,
    totalEnergyToday: 144.2,
    fanSpeeds: [1100, 1150, 1200],
    efficiencyRating: 4,
    totalRuntimeToday: 19.2
  },
  {
    id: 'ahu-009',
    name: 'Training Room AHU-9',
    location: 'Building C - Floor 2',
    model: 'Daikin VRV',
    serialNumber: 'VRV-2024-009',
    installationDate: '2024-01-22',
    numberOfFans: 2,
    status: 'offline',
    currentTemperature: 24.5,
    currentHumidity: 44,
    averageFanSpeed: 0,
    currentPowerConsumption: 0,
    totalEnergyToday: 0,
    fanSpeeds: [0, 0],
    efficiencyRating: 3,
    totalRuntimeToday: 0
  },
  {
    id: 'ahu-010',
    name: 'Reception AHU-10',
    location: 'Building A - Ground Floor',
    model: 'Lennox LCC',
    serialNumber: 'LCC-2024-010',
    installationDate: '2024-03-18',
    numberOfFans: 2,
    status: 'online',
    currentTemperature: 23.8,
    currentHumidity: 46,
    averageFanSpeed: 1050,
    currentPowerConsumption: 6.2,
    totalEnergyToday: 118.7,
    fanSpeeds: [1000, 1100],
    efficiencyRating: 4,
    totalRuntimeToday: 19.1
  }
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
    
    // Power consumption pattern
    let basePower = isWeekend ? 45 : 60; // Lower on weekends
    basePower *= monthlyFactor; // Apply monthly variation
    if (isNightTime) basePower *= 0.3;
    else if (isPeakTime) basePower *= 1.2;
    
    // Fan speed pattern (RPM)
    let baseSpeed = isWeekend ? 800 : 1000;
    baseSpeed *= monthlyFactor; // Apply monthly variation
    if (isNightTime) baseSpeed *= 0.4;
    else if (isPeakTime) baseSpeed *= 1.3;
    
    // Add some randomness
    const powerVariation = (Math.random() - 0.5) * 10;
    const speedVariation = (Math.random() - 0.5) * 200;
    const tempVariation = (Math.random() - 0.5) * 2;
    const humidityVariation = (Math.random() - 0.5) * 5;
    
    data.push({
      timestamp: timestamp.toISOString(),
      powerConsumption: Math.max(0, basePower + powerVariation),
      averageSpeed: Math.max(0, baseSpeed + speedVariation),
      temperature: 22 + tempVariation + (isPeakTime ? 1 : 0),
      humidity: 40 + humidityVariation + (isPeakTime ? 3 : 0)
    });
  }
  
  return data;
})();

// Helper functions for calculations
export function getAverageTemperature(): number {
  const onlineAHUs = ahuDeployments.filter(ahu => ahu.status === 'online');
  if (onlineAHUs.length === 0) return 0;
  return onlineAHUs.reduce((sum, ahu) => sum + ahu.currentTemperature, 0) / onlineAHUs.length;
}

export function getAverageHumidity(): number {
  const onlineAHUs = ahuDeployments.filter(ahu => ahu.status === 'online');
  if (onlineAHUs.length === 0) return 0;
  return onlineAHUs.reduce((sum, ahu) => sum + ahu.currentHumidity, 0) / onlineAHUs.length;
}

export function getAverageFanSpeed(): number {
  const onlineAHUs = ahuDeployments.filter(ahu => ahu.status === 'online');
  if (onlineAHUs.length === 0) return 0;
  return onlineAHUs.reduce((sum, ahu) => sum + ahu.averageFanSpeed, 0) / onlineAHUs.length;
}

export function getTotalEnergyConsumption(): number {
  return ahuDeployments.reduce((sum, ahu) => sum + ahu.totalEnergyToday, 0);
}

export function getAHUById(id: string): AHUData | undefined {
  return ahuDeployments.find(ahu => ahu.id === id);
}

export function getOnlineAHUCount(): number {
  return ahuDeployments.filter(ahu => ahu.status === 'online').length;
}

export function getTotalAHUCount(): number {
  return ahuDeployments.length;
}

export function getAHUOnlinePercentage(): number {
  const total = getTotalAHUCount();
  if (total === 0) return 0;
  return (getOnlineAHUCount() / total) * 100;
}
