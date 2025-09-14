
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const deviceData = {
  "Smartwatch": {
    "Apple": ["Apple Watch Series 9", "Apple Watch Ultra 2", "Apple Watch SE"],
    "Fitbit": ["Fitbit Sense 2", "Fitbit Versa 4", "Fitbit Charge 6"],
    "Garmin": ["Garmin Venu 3", "Garmin Forerunner 965", "Garmin Epix Pro"],
    "Samsung": ["Galaxy Watch 6", "Galaxy Watch 6 Classic"],
  },
  "Smart Ring": {
    "Oura": ["Oura Ring Gen3"],
    "Ultrahuman": ["Ultrahuman Ring AIR"],
    "RingConn": ["RingConn Smart Ring"],
  },
};

type DeviceType = "Smartwatch" | "Smart Ring";

interface ConnectDeviceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  deviceType: DeviceType | null;
}

export function ConnectDeviceDialog({
  isOpen,
  onOpenChange,
  deviceType,
}: ConnectDeviceDialogProps) {
  const [brand, setBrand] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const brands = useMemo(() => {
    return deviceType ? Object.keys(deviceData[deviceType]) : [];
  }, [deviceType]);

  const models = useMemo(() => {
    if (deviceType && brand && deviceData[deviceType] && deviceData[deviceType][brand as keyof typeof deviceData[DeviceType]]) {
      return deviceData[deviceType][brand as keyof typeof deviceData[DeviceType]];
    }
    return [];
  }, [deviceType, brand]);
  
  const handleBrandChange = (value: string) => {
    setBrand(value);
    setModel(null);
  }

  const handleConnect = () => {
    if(!brand || !model) {
        toast({
            variant: "destructive",
            title: "Incomplete Selection",
            description: "Please select both a brand and a model.",
        });
        return;
    }
    setIsConnecting(true);
    setTimeout(() => {
        setIsConnecting(false);
        onOpenChange(false);
        toast({
            title: "Connection Successful!",
            description: `Your ${brand} ${model} has been connected.`,
        });
        setBrand(null);
        setModel(null);
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect your {deviceType}</DialogTitle>
          <DialogDescription>
            Select the brand and model of your device to sync your data.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="brand">Brand</Label>
            <Select onValueChange={handleBrandChange} value={brand || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="model">Model</Label>
            <Select onValueChange={setModel} value={model || ""} disabled={!brand || models.length === 0}>
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isConnecting}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleConnect} disabled={isConnecting || !brand || !model}>
            {isConnecting ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                </>
            ) : "Connect Device" }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
