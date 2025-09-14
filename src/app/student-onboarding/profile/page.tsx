
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { useAppContext } from "@/app/(app)/app-context";
import { FormEvent } from "react";

export default function StudentProfilePage() {
  const router = useRouter();
  const { student, setStudent } = useAppContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const age = formData.get("age") as string;
    const collegeYear = formData.get("college-year") as string;
    const collegeName = formData.get("college-name") as string;
    
    setStudent(prev => ({ ...prev, name, age: parseInt(age) || 0, collegeYear, collegeName }));
    router.push("/student-onboarding/verify-id");
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Tell Us About Yourself</CardTitle>
        <CardDescription>This information helps us tailor your experience.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="Enter your full name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" name="age" type="number" placeholder="Enter your age" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="college-year">College Year</Label>
            <Select name="college-year" required>
              <SelectTrigger id="college-year">
                <SelectValue placeholder="Select your year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freshman">Freshman</SelectItem>
                <SelectItem value="sophomore">Sophomore</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="college-name">College/University Name</Label>
            <Select name="college-name" required>
              <SelectTrigger id="college-name">
                <SelectValue placeholder="Select your university" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mait">MAIT</SelectItem>
                <SelectItem value="nsut">NSUT</SelectItem>
                <SelectItem value="dtu">DTU</SelectItem>
                <SelectItem value="iitd">IIT Delhi</SelectItem>
                <SelectItem value="iiitd">IIIT Delhi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button type="submit">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
