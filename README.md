# AHU Dashboard

A modern, real-time dashboard for monitoring and managing Air Handling Units (AHUs) built with TanStack Start, React 19, and TypeScript.

## 🚀 Features

### Dashboard Overview
- **Real-time Monitoring**: Live status and performance metrics for all AHU units
- **Interactive Charts**: Historical data visualization with temperature, humidity, fan speed, and power consumption trends
- **Data Tables**: Comprehensive AHU deployment information with sorting and filtering
- **Responsive Design**: Optimized for desktop and mobile devices

### AHU Management
- **Individual AHU Control**: Detailed view for each AHU unit with:
  - Real-time sensor readings (temperature, humidity, power consumption)
  - Individual fan speed controls with sliders
  - Master power toggle for each unit
  - Historical data charts (24-hour trends)
  - Efficiency ratings and runtime statistics
- **Bulk Operations**: Portfolio-wide monitoring and management
- **Status Indicators**: Visual status badges for online/offline units

### Technical Features
- **Modern UI Components**: Built with Shadcn/ui and Radix UI primitives
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Performance Optimized**: React 19 with concurrent features and efficient rendering
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## 🛠️ Tech Stack

### Core Framework
- **TanStack Start** - Full-stack React framework with SSR capabilities
- **React 19** - Latest React with concurrent features
- **TypeScript** - Strict type checking and enhanced developer experience
- **Vite** - Lightning-fast build tool and development server

### UI & Styling
- **Shadcn/ui** - Modern component library with Radix UI primitives
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful icon library
- **Recharts** - Data visualization and interactive charts

### Data & State Management
- **TanStack Query** - Server state management and caching
- **TanStack Router** - Type-safe file-based routing
- **TanStack Table** - Advanced data table functionality
- **TanStack Form** - Form state management

### Development Tools
- **Biome** - Fast linting and formatting (replaces ESLint/Prettier)
- **Vitest** - Modern testing framework
- **pnpm** - Fast, disk space efficient package manager

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/ui components
│   ├── app-sidebar.tsx  # Main navigation sidebar
│   ├── data-table.tsx   # AHU data table component
│   ├── chart-area-interactive.tsx  # Interactive charts
│   └── ...              # Other custom components
├── routes/              # File-based routing
│   ├── __root.tsx       # Root layout with navigation
│   ├── index.tsx        # Dashboard home page
│   └── ahu/             # AHU-specific routes
│       └── $ahuId.tsx   # Individual AHU detail page
├── data/                # Static data and mock data
│   ├── ahu-data.ts      # AHU deployment data
│   └── demo-table-data.ts  # Demo data for tables
├── hooks/               # Custom React hooks
├── integrations/        # Third-party integrations
│   └── tanstack-query/  # Query client setup
├── lib/                 # Utility functions
└── styles.css           # Global styles and CSS variables
```

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
# Development
pnpm dev          # Start development server on port 3000
pnpm build        # Build for production
pnpm serve        # Preview production build

# Testing
pnpm test         # Run test suite

# Code Quality
pnpm lint         # Run linter
pnpm format       # Format code
pnpm check        # Run all checks (lint + format)
```

## 📊 Dashboard Features

### Portfolio Overview
- **Summary Cards**: Total AHUs, online status, average metrics
- **Interactive Charts**: System-wide performance trends
- **Data Table**: Complete AHU inventory with filtering and sorting

### Individual AHU Management
- **Real-time Metrics**: Current temperature, humidity, fan speeds, power consumption
- **Control Panel**: 
  - Master power toggle
  - Individual fan speed controls (0-2000 RPM)
  - Save/reset functionality with confirmation dialogs
- **Historical Data**: 24-hour trend charts for:
  - Temperature and humidity
  - Fan speed and power consumption
- **Specifications**: Model, serial number, installation date, efficiency rating

### Data Visualization
- **Interactive Charts**: Built with Recharts for smooth animations
- **Responsive Design**: Charts adapt to different screen sizes
- **Real-time Updates**: Live data refresh capabilities
- **Export Options**: Chart data can be exported for analysis

## 🎨 UI Components

The dashboard uses a comprehensive set of UI components:

- **Layout**: Sidebar navigation, responsive headers, breadcrumbs
- **Data Display**: Cards, tables, badges, charts
- **Forms**: Inputs, sliders, switches, toggles
- **Feedback**: Alerts, toasts, loading states
- **Navigation**: Tabs, dropdowns, breadcrumbs

## 🔧 Configuration

### Environment Variables
The project uses T3Env for type-safe environment variables. Add your environment variables to `src/env.ts`:

```typescript
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    // Server-side variables
  },
  client: {
    // Client-side variables
  },
  runtimeEnv: {
    // Runtime environment
  },
});
```

### Adding New AHU Units
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

## 🧪 Testing

The project uses Vitest for testing:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

## 📦 Building for Production

```bash
# Build the application
pnpm build

# Preview the production build
pnpm serve
```

The built application will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🚀 Deployment

The application can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect your repository
- **AWS S3**: Upload the `dist` folder to an S3 bucket with static website hosting
- **GitHub Pages**: Use GitHub Actions to build and deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Related Links

- [TanStack Start Documentation](https://tanstack.com/start)
- [React 19 Documentation](https://react.dev)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Recharts Documentation](https://recharts.org)

## 📞 Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using modern web technologies for efficient AHU monitoring and management.