import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Construction className="h-8 w-8" />
          </div>
          <CardTitle className="mt-4 font-headline text-2xl">Administrator Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This area is currently under construction. Please check back later for updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
