
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FlourishULogo } from "@/components/logo";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import type { E164Number } from "libphonenumber-js/core";
import { useRouter } from "next/navigation";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" y1="8" x2="12" y2="8" />
      <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
      <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
    </svg>
  );
}


function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function LoginPage() {
  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState<E164Number | undefined>(undefined);
  const router = useRouter();

  const handleSendOtp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Here you would typically call an API to send the OTP
    setShowOtp(true);
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would verify the OTP here.
    // We'll just navigate to the home page for now.
    router.push('/home');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <FlourishULogo />
          </div>
          <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
          <CardDescription>Choose your preferred login method to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" asChild>
                <Link href="/home">
                  <GoogleIcon className="mr-2 h-5 w-5" />
                  Google
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/home">
                  <LinkedinIcon className="mr-2 h-5 w-5" />
                  LinkedIn
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <PhoneInput
                  id="phone"
                  placeholder="Enter your phone number"
                  disabled={showOtp}
                  value={phone}
                  onChange={setPhone}
                />
              </div>

              {showOtp && (
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP</Label>
                  <Input id="otp" type="text" placeholder="Enter the 6-digit OTP" required />
                </div>
              )}
              
              {!showOtp ? (
                <Button type="button" className="w-full" onClick={handleSendOtp} disabled={!phone}>
                  Send OTP
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Verify OTP & Login
                </Button>
              )}
            </form>
            <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="underline">
                    Create a new account
                </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
