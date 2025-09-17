
"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";


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

const nearbyDevices = [
    { id: "1", name: "Student's Apple Watch", type: "Smartwatch" },
    { id: "2", name: "Student's Oura Ring", type: "Smart Ring" },
    { id: "3", name: "Galaxy Watch 6", type: "Smartwatch" },
];

interface ConnectDeviceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConnectDeviceDialog({
  isOpen,
  onOpenChange,
}: ConnectDeviceDialogProps) {
  const [isScanning, setIsScanning] = useState(true);
  const [connectingDeviceId, setConnectingDeviceId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
        }, 1500);
    }
  }, [isOpen]);

  const handleConnect = (deviceId: string, deviceName: string) => {
    setConnectingDeviceId(deviceId);
    setTimeout(() => {
        setConnectingDeviceId(null);
        onOpenChange(false);
        toast({
            title: "Connection Successful!",
            description: `Your ${deviceName} has been connected.`,
        });
    }, 1500);
  };
  
  const handleScanAgain = () => {
    setIsScanning(true);
    setTimeout(() => {
        setIsScanning(false);
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nearby Devices</DialogTitle>
          <DialogDescription>
            Select a device to connect and sync your data.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
            {isScanning ? (
                <div className="flex items-center justify-center p-8 space-x-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Scanning for devices...</span>
                </div>
            ) : (
                <div className="space-y-3">
                    {nearbyDevices.map(device => (
                        <Card key={device.id}>
                            <CardContent className="p-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {device.type === 'Smartwatch' ? <SmartwatchIcon className="h-6 w-6 text-primary" /> : <SmartRingIcon className="h-6 w-6 text-primary" />}
                                    <span className="font-medium">{device.name}</span>
                                </div>
                                <Button 
                                    size="sm"
                                    onClick={() => handleConnect(device.id, device.name)}
                                    disabled={!!connectingDeviceId}
                                >
                                    {connectingDeviceId === device.id ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Connecting...
                                        </>
                                    ): "Connect"}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={handleScanAgain} disabled={isScanning || !!connectingDeviceId}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Scan Again
          </Button>
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={!!connectingDeviceId}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
