
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Calendar, Shield, Users } from "lucide-react";
import Link from "next/link";
import { useAppContext } from "../app-context";
import { useMemo } from "react";

export default function HomePage() {
  const { student, appointments, getInterpretation } = useAppContext();

  const wellnessScores = useMemo(() => {
    if (student.wellnessHistory.length === 0) {
      return { phq9: 0, gad7: 0, phq9Interpretation: "N/A", gad7Interpretation: "N/A" };
    }
    const latestScores = student.wellnessHistory[student.wellnessHistory.length - 1];
    return {
      phq9: latestScores.phq9,
      gad7: latestScores.gad7,
      phq9Interpretation: getInterpretation('phq9', latestScores.phq9),
      gad7Interpretation: getInterpretation('gad7', latestScores.gad7),
    };
  }, [student.wellnessHistory, getInterpretation]);

  const latestForumActivity = "2 new replies on your post"; // This remains mock data for now

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Hello, {student.name || "Student"}!</h1>
        <p className="text-muted-foreground">Welcome to your FlourishU dashboard. Here's a summary of your wellness journey.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1 md:col-span-2">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={student.avatar} alt={student.name || "Student"} />
                    <AvatarFallback>{student.name ? student.name.charAt(0) : "S"}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-2xl">{student.name}</CardTitle>
                    <CardDescription>{student.email}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground grid grid-cols-2 gap-2">
                    <div className="font-semibold text-foreground">Age: <span className="font-normal">{student.age > 0 ? student.age : "N/A"}</span></div>
                    <div className="font-semibold text-foreground">Year: <span className="font-normal">{student.collegeYear || "N/A"}</span></div>
                    <div className="font-semibold text-foreground col-span-2">University: <span className="font-normal">{student.collegeName || "N/A"}</span></div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calendar /> Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-5xl font-bold">{appointments.length}</p>
                <p className="text-muted-foreground">sessions booked</p>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield /> Wellness Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p>Depression (PHQ-9): <span className="font-bold">{wellnessScores.phq9}/27 ({wellnessScores.phq9Interpretation})</span></p>
                <p>Anxiety (GAD-7): <span className="font-bold">{wellnessScores.gad7}/21 ({wellnessScores.gad7Interpretation})</span></p>
                 <Button variant="link" className="p-0 h-auto" asChild>
                    <Link href="/profile">View Full Report <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users /> Peer Support</CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-lg">{latestForumActivity}</p>
                 <Button variant="link" className="p-0 h-auto mt-2" asChild>
                    <Link href="/peer-support">Go to Forum <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen /> Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Button variant="outline" asChild><Link href="/counselor-booking">Book a Counselor</Link></Button>
                <Button variant="outline" asChild><Link href="/ai-chatbot">Chat with AI</Link></Button>
                 <Button variant="outline" asChild><Link href="/resource-hub">Explore Resources</Link></Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
