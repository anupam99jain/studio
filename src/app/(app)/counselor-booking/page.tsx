
"use client";

import { useState } from "react";
import type { Date } from "react-day-picker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const counselors = [
  {
    name: "Dr. Emily Carter",
    specialty: "Cognitive Behavioral Therapy",
    image: "https://picsum.photos/seed/counselor1/100/100",
  },
  {
    name: "Dr. Ben Adams",
    specialty: "Mindfulness & Stress Reduction",
    image: "https://picsum.photos/seed/counselor2/100/100",
  },
  {
    name: "Dr. Olivia Chen",
    specialty: "Anxiety & Depression Specialist",
    image: "https://picsum.photos/seed/counselor3/100/100",
  },
];

type Counselor = typeof counselors[0];

export default function CounselorBookingPage() {
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleBookClick = (counselor: Counselor) => {
    setSelectedCounselor(counselor);
    setIsDialogOpen(true);
  };
  
  const handleBookingConfirm = () => {
    toast({
        title: "Booking Confirmed!",
        description: `Your appointment with ${selectedCounselor?.name} has been scheduled.`,
    });
    setIsDialogOpen(false);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Confidential Counselor Booking</h1>
        <p className="text-muted-foreground">Schedule a private session with a professional counselor.</p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Available Counselors</h2>
            {counselors.map((counselor) => (
                <Card key={counselor.name}>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={counselor.image} alt={counselor.name}/>
                            <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{counselor.name}</CardTitle>
                            <CardDescription>{counselor.specialty}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardFooter>
                        <Button className="ml-auto" onClick={() => handleBookClick(counselor)}>Book Appointment</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </div>
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Appointment with {selectedCounselor?.name}</DialogTitle>
            <DialogDescription>
              Select a date and time that works for you.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
               <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9am">9:00 AM</SelectItem>
                  <SelectItem value="10am">10:00 AM</SelectItem>
                  <SelectItem value="11am">11:00 AM</SelectItem>
                  <SelectItem value="1pm">1:00 PM</SelectItem>
                  <SelectItem value="2pm">2:00 PM</SelectItem>
                  <SelectItem value="3pm">3:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="issue">Reason for your visit (optional)</Label>
                <Textarea id="issue" placeholder="Briefly describe what you'd like to discuss."/>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleBookingConfirm}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
