"use client";

import { useState } from "react";
import { useOnboarding } from "../onboarding-context";
import { StepNavigation } from "../step-navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Globe, Shield, CheckCircle } from "lucide-react";

export function LocationStep() {
  const {
    data,
    updateData,
    handleSubmit,
    previousStep: _previousStep,
  } = useOnboarding();
  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinish = async () => {
    // Placeholder validation
    if (!isRemote && (!data.city || !data.country)) {
      console.log("Location validation would trigger here");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      handleSubmit();
      setIsSubmitting(false);
    }, 2000);
  };

  const handleRemoteToggle = (checked: boolean) => {
    setIsRemote(checked);
    if (checked) {
      updateData({ city: "Remote", country: "Worldwide" });
    } else {
      updateData({ city: "", country: "" });
    }
  };

  const popularCountries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Australia",
    "Netherlands",
    "Sweden",
    "Japan",
    "Singapore",
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-balance">
          Where are you located?
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto">
          This helps us show you relevant opportunities and connect you with
          local communities
        </p>
      </div>

      <div className="space-y-8">
        <Card className="p-6 bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
          <div className="flex items-start space-x-4">
            <Checkbox
              id="remote-work"
              checked={isRemote}
              onCheckedChange={handleRemoteToggle}
              className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <div className="space-y-2">
              <Label
                htmlFor="remote-work"
                className="text-sm font-medium cursor-pointer flex items-center gap-2"
              >
                <Globe className="w-4 h-4 text-primary" />I work remotely /
                I&apos;m location flexible
              </Label>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Select this if you work from anywhere or are open to remote
                opportunities
              </p>
            </div>
          </div>
        </Card>

        {!isRemote && (
          <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
            <div className="space-y-3">
              <Label
                htmlFor="city"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <MapPin className="w-4 h-4 text-primary" />
                City
              </Label>
              <Input
                id="city"
                placeholder="Enter your city"
                value={data.city}
                onChange={(e) => updateData({ city: e.target.value })}
                className="h-12 text-base bg-input border-border/50 focus:border-primary transition-colors duration-200"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="country" className="text-sm font-medium">
                Country
              </Label>
              <Input
                id="country"
                placeholder="Enter your country"
                value={data.country}
                onChange={(e) => updateData({ country: e.target.value })}
                className="h-12 text-base bg-input border-border/50 focus:border-primary transition-colors duration-200"
                list="countries"
              />
              <datalist id="countries">
                {popularCountries.map((country) => (
                  <option key={country} value={country} />
                ))}
              </datalist>
            </div>
          </div>
        )}

        {(data.city || data.country) && (
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/20 rounded-xl">
                {isRemote ? (
                  <Globe className="w-5 h-5 text-primary" />
                ) : (
                  <MapPin className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <p className="font-semibold text-base">Your Location</p>
                <p className="text-muted-foreground">
                  {data.city}
                  {data.city && data.country && ", "}
                  {data.country}
                </p>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-5 bg-muted/30 border-border/50">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Privacy & Location Data</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your location information is used to show relevant job
                opportunities and local events. We never share your exact
                location with third parties without your consent.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-950 dark:to-emerald-950 dark:border-green-800">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Almost done! 🎉
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
                You&apos;re about to complete your profile setup. Once finished,
                you&apos;ll have access to personalized recommendations and our
                community features.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <StepNavigation
        onNext={handleFinish}
        nextLabel="Complete Setup"
        nextDisabled={!isRemote && (!data.city || !data.country)}
        isLoading={isSubmitting}
      />
    </div>
  );
}
