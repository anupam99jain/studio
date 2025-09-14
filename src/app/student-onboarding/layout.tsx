
import { FlourishULogo } from "@/components/logo";
import { AppContextProvider } from "@/app/(app)/app-context";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppContextProvider>
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
        <div className="absolute top-8 left-8">
          <FlourishULogo />
        </div>
        <main className="w-full max-w-xl">
          {children}
        </main>
      </div>
    </AppContextProvider>
  );
}
