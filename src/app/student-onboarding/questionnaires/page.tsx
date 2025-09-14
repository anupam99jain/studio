
"use client";

import { useState, useEffect } from "react";
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

type Answers = { [key: string]: string };

const QuestionnaireForm = ({
  title,
  questions,
  options,
  answers,
  onAnswerChange,
}: {
  title: string;
  questions: Question[];
  options?: { label: string; value: string }[];
  answers: Answers;
  onAnswerChange: (questionId: string, value: string) => void;
}) => (
  <div className="space-y-8">
    <p className="text-sm text-muted-foreground">Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
    {questions.map((q, index) => (
      <div key={q.id} className="space-y-3">
        <Label className="font-semibold">{index + 1}. {q.text}</Label>
        <RadioGroup
          className="flex flex-col sm:flex-row sm:gap-8 gap-4"
          value={answers[q.id]}
          onValueChange={(value) => onAnswerChange(q.id, value)}
        >
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
  const [phq9Answers, setPhq9Answers] = useState<Answers>({});
  const [gad7Answers, setGad7Answers] = useState<Answers>({});
  const [ghq12Answers, setGhq12Answers] = useState<Answers>({});
  const [areAllFormsComplete, setAreAllFormsComplete] = useState(false);

  useEffect(() => {
    const isPhq9Complete = Object.keys(phq9Answers).length === phq9Questions.length;
    const isGad7Complete = Object.keys(gad7Answers).length === gad7Questions.length;
    const isGhq12Complete = Object.keys(ghq12Answers).length === ghq12Questions.length;
    setAreAllFormsComplete(isPhq9Complete && isGad7Complete && isGhq12Complete);
  }, [phq9Answers, gad7Answers, ghq12Answers]);

  const handleAnswerChange = (form: 'phq9' | 'gad7' | 'ghq12') => (questionId: string, value: string) => {
    if (form === 'phq9') {
      setPhq9Answers(prev => ({ ...prev, [questionId]: value }));
    } else if (form === 'gad7') {
      setGad7Answers(prev => ({ ...prev, [questionId]: value }));
    } else {
      setGhq12Answers(prev => ({ ...prev, [questionId]: value }));
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Wellness Check-in</CardTitle>
        <CardDescription>Your responses are confidential and help us understand how we can best support you. Please complete all three forms.</CardDescription>
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
              <QuestionnaireForm
                title="PHQ-9 (Patient Health Questionnaire)"
                questions={phq9Questions}
                options={standardOptions}
                answers={phq9Answers}
                onAnswerChange={handleAnswerChange('phq9')}
              />
            </TabsContent>
            <TabsContent value="gad7">
              <QuestionnaireForm
                title="GAD-7 (Generalized Anxiety Disorder)"
                questions={gad7Questions}
                options={standardOptions}
                answers={gad7Answers}
                onAnswerChange={handleAnswerChange('gad7')}
              />
            </TabsContent>
            <TabsContent value="ghq12">
               <QuestionnaireForm
                title="GHQ-12 (General Health Questionnaire)"
                questions={ghq12Questions}
                answers={ghq12Answers}
                onAnswerChange={handleAnswerChange('ghq12')}
               />
            </TabsContent>
          </ScrollArea>
          <div className="flex justify-end mt-6">
            <Button asChild={areAllFormsComplete} disabled={!areAllFormsComplete}>
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
