import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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

export default function CounselorBookingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Confidential Counselor Booking</h1>
        <p className="text-muted-foreground">Schedule a private session with a professional counselor.</p>
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
                        <Button className="ml-auto">Book Appointment</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select a Date</h2>
            <Card>
                <CardContent className="p-0">
                    <Calendar
                        mode="single"
                        className="p-3 w-full"
                    />
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
