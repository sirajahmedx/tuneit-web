"use client";

import { useOnboarding } from "./onboarding-context";

interface StepHeaderProps {
  title: string;
  description: string;
  showProgress?: boolean;
}

export function StepHeader({
  title,
  description,
  showProgress = true,
}: StepHeaderProps) {
  const { currentStep, totalSteps } = useOnboarding();

  return (
    <div className="text-center space-y-3 mb-8">
      {showProgress && (
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <div className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
      )}

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-balance">{title}</h2>
        <p className="text-muted-foreground text-pretty max-w-md mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}
