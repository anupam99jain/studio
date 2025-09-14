import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { phq9Questions, gad7Questions, ghq12Questions, standardOptions } from "@/lib/questionnaires";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type Question = {
  id: string;
  text: string;
  options?: { label: string; value: string }[];
};

const QuestionnaireForm = ({ title, questions, options }: { title: string; questions: Question[]; options?: { label: string; value: string }[] }) => (
  <div className="space-y-8">
    <p className="text-sm text-muted-foreground">Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
    {questions.map((q, index) => (
      <div key={q.id} className="space-y-3">
        <Label className="font-semibold">{index + 1}. {q.text}</Label>
        <RadioGroup className="flex flex-col sm:flex-row sm:gap-8 gap-4">
          {(q.options || options)?.map(opt => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={`${q.id}-${opt.value}`} />
              <Label htmlFor={`${q.id}-${opt.value}`}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    ))}
  </div>
);


export default function QuestionnairesPage() {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Wellness Check-in</CardTitle>
        <CardDescription>Your responses are confidential and help us understand how we can best support you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="phq9" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="phq9">PHQ-9</TabsTrigger>
            <TabsTrigger value="gad7">GAD-7</TabsTrigger>
            <TabsTrigger value="ghq12">GHQ-12</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[50vh] mt-4 pr-4">
            <TabsContent value="phq9">
              <QuestionnaireForm title="PHQ-9 (Patient Health Questionnaire)" questions={phq9Questions} options={standardOptions} />
            </TabsContent>
            <TabsContent value="gad7">
              <QuestionnaireForm title="GAD-7 (Generalized Anxiety Disorder)" questions={gad7Questions} options={standardOptions} />
            </TabsContent>
            <TabsContent value="ghq12">
               <QuestionnaireForm title="GHQ-12 (General Health Questionnaire)" questions={ghq12Questions} />
            </TabsContent>
          </ScrollArea>
          <div className="flex justify-end mt-6">
            <Button asChild>
              <Link href="/ai-chatbot">
                Complete Onboarding
                <Rocket className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
