
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Activity, Zap, Moon } from "lucide-react";
import { ConnectDeviceDialog } from "@/components/connect-device-dialog";

type DeviceType = "Smartwatch" | "Smart Ring";

function SmartwatchIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="16" height="16" x="4" y="4" rx="4" />
        <path d="M12 8v4" />
        <path d="M12 12h2" />
        <path d="M4 12H2" />
        <path d="M20 12h2" />
        <path d="M12 20v2" />
        <path d="M12 4V2" />
      </svg>
    )
  }
  
  function SmartRingIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2Z" />
            <path d="M12 18a6 6 0 0 1-6-6 6 6 0 0 1 6-6 6 6 0 0 1 6 6 6 6 0 0 1-6 6Z" />
        </svg>
    );
}

export default function WearableMonitoringPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);

  const handleConnectClick = (type: DeviceType) => {
    setDeviceType(type);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Wearable Monitoring</h1>
        <p className="text-muted-foreground">Connect your smart devices to track your physical and mental wellness.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connect Your Devices</CardTitle>
          <CardDescription>Link your smartwatch or smart ring to automatically sync your data.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <SmartwatchIcon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smartwatches</h3>
            <p className="text-sm text-muted-foreground mb-4">Apple Watch, Fitbit, Garmin, etc.</p>
            <Button onClick={() => handleConnectClick("Smartwatch")}>Connect</Button>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 text-center">
            <SmartRingIcon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smart Rings</h3>
            <p className="text-sm text-muted-foreground mb-4">Oura Ring, and other smart rings.</p>
            <Button onClick={() => handleConnectClick("Smart Ring")}>Connect</Button>
          </Card>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Today's Wellness Analysis</CardTitle>
          <CardDescription>Data analyzed from your connected devices.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Heart Rate Variability</CardTitle>
              <HeartPulse className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45 ms</div>
              <p className="text-xs text-muted-foreground">Balanced</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Activity Level</CardTitle>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,234 steps</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Stress Index</CardTitle>
              <Zap className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Low</div>
              <p className="text-xs text-muted-foreground">Well-managed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
              <Moon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7h 45m</div>
              <p className="text-xs text-muted-foreground">88% efficiency</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <ConnectDeviceDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        deviceType={deviceType}
      />
    </div>
  );
}
