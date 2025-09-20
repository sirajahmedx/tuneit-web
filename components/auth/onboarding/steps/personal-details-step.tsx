"use client";

import { useOnboarding } from "../onboarding-context";
import { StepNavigation } from "../step-navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { User, Calendar, Shield } from "lucide-react";

export function PersonalDetailsStep() {
  const { data, updateData, nextStep, previousStep } = useOnboarding();

  const handleNext = () => {
    // Placeholder validation
    if (!data.age || !data.gender) {
      console.log("Personal details validation would trigger here");
      return;
    }

    nextStep();
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Tell us about yourself</h2>
        <p className="text-muted-foreground text-sm">
          This helps us personalize your experience and connect you with
          relevant opportunities
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="age"
            className="text-sm font-medium flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Age
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="Enter your age"
            value={data.age}
            onChange={(e) => updateData({ age: e.target.value })}
            className="h-10"
            min="13"
            max="120"
          />
          <p className="text-xs text-muted-foreground">
            You must be at least 13 years old to use our service
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4" />
            Gender
          </Label>
          <Select
            value={data.gender}
            onValueChange={(value) => updateData({ gender: value })}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              {genderOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="p-4 bg-muted/50">
          <div className="flex items-start space-x-3">
            <Shield className="w-4 h-4 mt-0.5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Privacy Notice</p>
              <p className="text-xs text-muted-foreground">
                This information is used to improve your experience and will be
                kept private. You can update or remove this information at any
                time in your profile settings.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <StepNavigation
        onNext={handleNext}
        nextDisabled={!data.age || !data.gender}
      />
    </div>
  );
}
