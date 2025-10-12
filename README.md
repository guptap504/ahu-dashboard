# AHU Dashboard

A modern, real-time dashboard for monitoring and managing Air Handling Units (AHUs) built with TanStack Start, React 19, and TypeScript.

## 🚀 Features

- **Real-time Monitoring**: Live status and performance metrics for all AHU units
- **Interactive Charts**: Historical data visualization with temperature, humidity, fan speed, and power consumption trends
- **Individual AHU Control**: Detailed management for each unit with fan speed controls and power toggles
- **Data Tables**: Comprehensive AHU deployment information with sorting and filtering
- **Responsive Design**: Optimized for desktop and mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ahu-dashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the dashboard

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm serve        # Preview production build
pnpm test         # Run test suite
pnpm lint         # Run linter
pnpm format       # Format code
```

## 📊 Dashboard Overview

### Portfolio View
- Summary cards showing total AHUs, online status, and average metrics
- Interactive charts displaying system-wide performance trends
- Data table with complete AHU inventory and filtering capabilities

### Individual AHU Management
- Real-time sensor readings (temperature, humidity, power consumption)
- Control panel with master power toggle and individual fan speed sliders
- Historical data charts showing 24-hour trends
- AHU specifications and efficiency ratings

## 🔧 Adding New AHU Units

To add new AHU units, update the `ahuDeployments` array in `src/data/ahu-data.ts`:

```typescript
export const ahuDeployments: AHUData[] = [
  {
    id: 'ahu-011',
    name: 'New AHU Unit',
    location: 'Building E - Floor 1',
    model: 'Carrier 39CQ',
    serialNumber: 'C39CQ-2024-011',
    installationDate: '2024-04-01',
    numberOfFans: 3,
    status: 'online',
    currentTemperature: 22.0,
    currentHumidity: 45,
    averageFanSpeed: 1200,
    currentPowerConsumption: 8.0,
    totalEnergyToday: 150.0,
    fanSpeeds: [1150, 1200, 1250],
    efficiencyRating: 4,
    totalRuntimeToday: 18.75
  },
  // ... other units
];
```

## 🚀 Deployment

The application can be deployed to any static hosting service:
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect your repository
- **AWS S3**: Upload the `dist` folder to an S3 bucket with static website hosting
