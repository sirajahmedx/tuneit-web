"use client";

import { useOnboarding } from "../onboarding-context";
import { StepNavigation } from "../step-navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, Info } from "lucide-react";

export function ExperienceStep() {
  const { data, updateData, nextStep, previousStep } = useOnboarding();

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      updateData({ experience: value });
    }
  };

  const handleNext = () => {
    // Placeholder validation
    if (!data.experience || parseInt(data.experience) < 0) {
      console.log("Experience validation would trigger here");
      return;
    }

    nextStep();
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-balance">
          How many years of experience do you have?
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto">
          This helps us tailor content and opportunities to your skill level
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <Label htmlFor="experience" className="text-base font-medium">
              Years of Experience
            </Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="experience"
                type="number"
                min="0"
                placeholder="e.g., 2"
                value={data.experience}
                onChange={handleExperienceChange}
                className="pl-10"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Enter 0 if you're just starting out
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-5 bg-gradient-to-r from-muted/30 to-muted/10 border-border/50">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Info className="w-4 h-4 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Don't worry about being perfect
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your experience level helps us show you the most relevant content.
              You can always update this later as you grow and learn.
            </p>
          </div>
        </div>
      </Card>

      <StepNavigation
        onNext={handleNext}
        nextDisabled={!data.experience || parseInt(data.experience) < 0}
      />
    </div>
  );
}
