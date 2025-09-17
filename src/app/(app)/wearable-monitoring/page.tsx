
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Activity, Zap, Moon, Wifi } from "lucide-react";
import { ConnectDeviceDialog } from "@/components/connect-device-dialog";

export default function WearableMonitoringPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Wearable Monitoring</h1>
        <p className="text-muted-foreground">Connect your smart devices to track your physical and mental wellness.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connect Your Devices</CardTitle>
          <CardDescription>Link your smart devices to automatically sync your data.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <Button onClick={() => setIsDialogOpen(true)}>
                <Wifi className="mr-2 h-4 w-4" />
                Scan for Nearby Devices
            </Button>
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
      />
    </div>
  );
}
