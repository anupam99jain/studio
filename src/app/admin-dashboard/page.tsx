
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, BarChart2 } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Shield className="h-8 w-8" />
          </div>
          <CardTitle className="mt-4 font-headline text-2xl">Administrator Dashboard</CardTitle>
          <CardDescription>
            Manage university resources and gain insights into student wellness.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link href="/admin-dashboard/campus-insights" className="w-full">
            <Button className="w-full">
              <BarChart2 className="mr-2 h-5 w-5" />
              View Campus Insights
            </Button>
          </Link>
           <p className="text-sm text-center text-muted-foreground pt-2">
            More features coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
