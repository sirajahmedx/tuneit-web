"use client";
import { OnboardingProvider } from "@/components/onboarding/onboarding-context";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

interface OnboardingPageProps {
  searchParams: {
    signInType?: string;
  };
}

export default function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const signInType = searchParams.signInType || "email";

  return (
    <div className="min-h-screen bg-background">
      <OnboardingProvider signInType={signInType}>
        <OnboardingFlow />
      </OnboardingProvider>
    </div>
  );
}
