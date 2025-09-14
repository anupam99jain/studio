import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VerifyIdForm } from "@/components/verify-id-form";

export default function VerifyIdPage() {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Verify Your Student Status</CardTitle>
        <CardDescription>Please upload a clear picture of your college ID card. This helps us confirm you're a student.</CardDescription>
      </CardHeader>
      <CardContent>
        <VerifyIdForm />
      </CardContent>
    </Card>
  );
}
