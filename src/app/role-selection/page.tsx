import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield } from 'lucide-react';
import { FlourishULogo } from '@/components/logo';

export default function RoleSelectionPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8">
        <FlourishULogo />
      </div>
      <div className="text-center mb-10">
        <h1 className="font-headline text-4xl font-bold">Choose Your Role</h1>
        <p className="text-muted-foreground mt-2">How will you be using FlourishU today?</p>
      </div>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        <Link href="/student-onboarding/profile">
          <Card className="h-full transform cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 text-primary">
                <User className="h-12 w-12" />
              </div>
              <CardTitle className="font-headline text-2xl mt-4">Student</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Access mental health resources, connect with peers, and book counseling sessions.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin-dashboard">
          <Card className="h-full transform cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 text-primary">
                <Shield className="h-12 w-12" />
              </div>
              <CardTitle className="font-headline text-2xl mt-4">Administrator</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Manage university resources, view anonymized wellness analytics, and support your student community.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
