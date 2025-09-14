import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

export default function StudentProfilePage() {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Tell Us About Yourself</CardTitle>
        <CardDescription>This information helps us tailor your experience.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" placeholder="Enter your age" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="college-year">College Year</Label>
            <Select>
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
            <Select>
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
            <Button asChild>
              <Link href="/student-onboarding/verify-id">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
