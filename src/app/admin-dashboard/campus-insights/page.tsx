
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const overallWellnessData = [
  { month: "January", phq9: 14, gad7: 12, ghq12: 20 },
  { month: "February", phq9: 15, gad7: 13, ghq12: 21 },
  { month: "March", phq9: 12, gad7: 10, ghq12: 18 },
  { month: "April", phq9: 11, gad7: 9, ghq12: 16 },
  { month: "May", phq9: 9, gad7: 7, ghq12: 14 },
  { month: "June", phq9: 8, gad7: 6, ghq12: 12 },
]

const chartConfig = {
  phq9: {
    label: "Avg. PHQ-9",
    color: "hsl(var(--chart-1))",
  },
  gad7: {
    label: "Avg. GAD-7",
    color: "hsl(var(--chart-2))",
  },
  ghq12: {
    label: "Avg. GHQ-12",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

const scoreInterpretations = {
  phq9: {
    title: "PHQ-9 (Depression)",
    levels: {
      "0-4": "Minimal Risk",
      "5-9": "Mild Risk",
      "10-14": "Moderate Risk",
      "15-19": "Moderately Severe Risk",
      "20-27": "Severe Risk",
    },
    max: 27,
  },
  gad7: {
    title: "GAD-7 (Anxiety)",
    levels: {
      "0-4": "Minimal Risk",
      "5-9": "Mild Risk",
      "10-14": "Moderate Risk",
      "15-21": "Severe Risk",
    },
    max: 21,
  },
  ghq12: {
    title: "GHQ-12 (General Well-being)",
    levels: {
      "0-11": "Healthy Population",
      "12-19": "Some Distress",
      "20-36": "Significant Distress",
    },
    max: 36,
  },
}

export default function CampusInsightsPage() {
  const latestScores = overallWellnessData[overallWellnessData.length - 1];

  const getInterpretation = (type: 'phq9' | 'gad7' | 'ghq12', score: number) => {
    const interpretation = scoreInterpretations[type];
    for (const range in interpretation.levels) {
      const [min, max] = range.split('-').map(Number);
      if (score >= min && score <= max) {
        return interpretation.levels[range as keyof typeof interpretation.levels];
      }
    }
    return "N/A";
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <Button variant="ghost" asChild className="-ml-4 mb-4">
            <Link href="/admin-dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">Campus Wellness Insights</h1>
        <p className="text-muted-foreground">Aggregated and anonymized wellness data for the student population.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{scoreInterpretations.phq9.title}</CardTitle>
            <CardDescription>Latest Monthly Average: {latestScores.phq9} / {scoreInterpretations.phq9.max}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{getInterpretation('phq9', latestScores.phq9)}</p>
            <p className="text-sm text-muted-foreground">Overall Campus Depression Risk</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{scoreInterpretations.gad7.title}</CardTitle>
            <CardDescription>Latest Monthly Average: {latestScores.gad7} / {scoreInterpretations.gad7.max}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{getInterpretation('gad7', latestScores.gad7)}</p>
            <p className="text-sm text-muted-foreground">Overall Campus Anxiety Risk</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{scoreInterpretations.ghq12.title}</CardTitle>
            <CardDescription>Latest Monthly Average: {latestScores.ghq12} / {scoreInterpretations.ghq12.max}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{getInterpretation('ghq12', latestScores.ghq12)}</p>
            <p className="text-sm text-muted-foreground">Overall Campus Well-being</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Wellness Trends</CardTitle>
          <CardDescription>Monthly average scores from all student questionnaires.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart accessibilityLayer data={overallWellnessData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="phq9" fill="var(--color-phq9)" radius={4} />
              <Bar dataKey="gad7" fill="var(--color-gad7)" radius={4} />
              <Bar dataKey="ghq12" fill="var(--color-ghq12)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
