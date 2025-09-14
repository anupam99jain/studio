
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
import { Phone, AlertTriangle } from "lucide-react";
import { startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { useAppContext } from "../app-context";

const counselors = [
  {
    name: "Priyanka Dey",
    specialty: "Cognitive Behavioral Therapy",
    image: "https://picsum.photos/seed/counselor1/100/100",
  },
  {
    name: "Janani Vasanth",
    specialty: "Mindfulness & Stress Reduction",
    image: "https://picsum.photos/seed/counselor2/100/100",
  },
  {
    name: "Vishakha Jaiswal",
    specialty: "Anxiety & Depression Specialist",
    image: "https://picsum.photos/seed/counselor3/100/100",
  },
];

type Counselor = typeof counselors[0];

export default function CounselorBookingPage() {
  const { appointments, addAppointment } = useAppContext();
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleBookClick = (counselor: Counselor) => {
    setSelectedCounselor(counselor);
    setDate(new Date());
    setIsDialogOpen(true);
  };
  
  const handleBookingConfirm = () => {
    if (!selectedCounselor || !date) return;

    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
    
    const bookingsInWeek = appointments.filter(appt => 
      isWithinInterval(new Date(appt.date), { start: weekStart, end: weekEnd })
    );

    if (bookingsInWeek.length >= 2) {
      toast({
        variant: "destructive",
        title: "Booking Limit Reached",
        description: "You can only book a maximum of two sessions per week.",
      });
      return;
    }

    const newAppointment = {counselor: selectedCounselor, date: date.toISOString()};
    addAppointment(newAppointment);

    toast({
        title: "Booking Confirmed!",
        description: `Your appointment with ${selectedCounselor?.name} has been scheduled.`,
    });
    setIsDialogOpen(false);
  }
  
  const bookedDates = appointments.map(appt => new Date(appt.date));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold font-headline">Confidential Counselor Booking</h1>
            <p className="text-muted-foreground">Schedule a private session with a professional counselor.</p>
        </div>
        <Card className="bg-destructive/10 border-destructive/50">
            <CardHeader className="flex-row items-center gap-4 p-4">
                <Phone className="h-6 w-6 text-destructive" />
                <div>
                    <CardTitle className="text-lg text-destructive">24/7 Helpline</CardTitle>
                    <CardDescription className="text-destructive/80">1-800-273-8255</CardDescription>
                </div>
            </CardHeader>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
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
         <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Booked Sessions</h2>
            <Card>
                <CardContent className="p-2">
                    <Calendar
                        mode="multiple"
                        selected={bookedDates}
                        ISOWeek
                        className="w-full"
                        classNames={{
                           day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90",
                        }}
                    />
                </CardContent>
                 <CardFooter className="text-sm text-muted-foreground p-3 pt-0">
                    <p>You have {appointments.length} upcoming session(s).</p>
                </CardFooter>
            </Card>
        </div>
      </div>
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Appointment with {selectedCounselor?.name}</DialogTitle>
            <DialogDescription>
              Select a date and time that works for you. You can book a maximum of two sessions per week.
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
                disabled={{ before: new Date() }}
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
