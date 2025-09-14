
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useAppContext } from "../app-context"

const chartConfig = {
  phq9: {
    label: "PHQ-9",
    color: "hsl(var(--chart-1))",
  },
  gad7: {
    label: "GAD-7",
    color: "hsl(var(--chart-2))",
  },
  ghq12: {
    label: "GHQ-12",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

const scoreInterpretations = {
  phq9: {
    title: "PHQ-9 (Depression)",
    levels: {
      "0-4": "Minimal",
      "5-9": "Mild",
      "10-14": "Moderate",
      "15-19": "Moderately Severe",
      "20-27": "Severe",
    },
    max: 27,
  },
  gad7: {
    title: "GAD-7 (Anxiety)",
    levels: {
      "0-4": "Minimal",
      "5-9": "Mild",
      "10-14": "Moderate",
      "15-21": "Severe",
    },
    max: 21,
  },
  ghq12: {
    title: "GHQ-12 (General Well-being)",
    levels: {
      "0-11": "Healthy",
      "12-19": "Some Distress",
      "20-36": "Significant Distress",
    },
    max: 36,
  },
}

export default function ProfilePage() {
  const { student, getInterpretation } = useAppContext();

  const wellnessData = student.wellnessHistory;
  const latestScores = wellnessData[wellnessData.length - 1] || { phq9: 0, gad7: 0, ghq12: 0 };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Your Wellness Dashboard</h1>
        <p className="text-muted-foreground">Track your mental wellness journey over time.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{scoreInterpretations.phq9.title}</CardTitle>
            <CardDescription>Latest Score: {latestScores.phq9} / {scoreInterpretations.phq9.max}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{getInterpretation('phq9', latestScores.phq9)}</p>
            <p className="text-sm text-muted-foreground">Depression Level</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{scoreInterpretations.gad7.title}</CardTitle>
            <CardDescription>Latest Score: {latestScores.gad7} / {scoreInterpretations.gad7.max}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{getInterpretation('gad7', latestScores.gad7)}</p>
            <p className="text-sm text-muted-foreground">Anxiety Level</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{scoreInterpretations.ghq12.title}</CardTitle>
            <CardDescription>Latest Score: {latestScores.ghq12} / {scoreInterpretations.ghq12.max}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{getInterpretation('ghq12', latestScores.ghq12)}</p>
            <p className="text-sm text-muted-foreground">Well-being Status</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wellness Score History</CardTitle>
          <CardDescription>Monthly scores from your completed questionnaires.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart accessibilityLayer data={wellnessData}>
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
