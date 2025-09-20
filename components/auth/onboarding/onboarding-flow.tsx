"use client";

import { useOnboarding } from "./onboarding-context";
import { EmailPasswordStep } from "./steps/email-password-step";
import { PersonalDetailsStep } from "./steps/personal-details-step";
import { SkillsStep } from "./steps/skills-step";
import { ExperienceStep } from "./steps/experience-step";
import { LocationStep } from "./steps/location-step";
import { CompletionScreen } from "./completion-screen";
import { ProgressIndicator } from "./progress-indicator";
import { Card } from "@/components/ui/card";

export function OnboardingFlow() {
  const { currentStep } = useOnboarding();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <EmailPasswordStep />;
      case 2:
        return <PersonalDetailsStep />;
      case 3:
        return <SkillsStep />;
      case 4:
        return <ExperienceStep />;
      case 5:
        return <LocationStep />;
      case 6:
        return <CompletionScreen />;
      default:
        return <EmailPasswordStep />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">Welcome to TuneIt</h1>
        </div>

        {currentStep <= 5 && (
          <div className="mb-6">
            <ProgressIndicator />
          </div>
        )}

        <Card className="border shadow-sm">
          <div className="p-6">{renderStep()}</div>
        </Card>
      </div>
    </div>
  );
}
