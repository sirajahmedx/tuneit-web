"use client";

import { useOnboarding } from "./onboarding-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, MapPin, Code, Trophy, Mail } from "lucide-react";

export function CompletionScreen() {
  const { data } = useOnboarding();

  const handleGetStarted = () => {
    // Placeholder for navigation to main app
    console.log("Navigate to main app dashboard");
    window.location.href = "/dashboard";
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Welcome aboard! 🎉</h2>
          <p className="text-muted-foreground text-lg">
            Your profile is now complete and ready to go
          </p>
        </div>
      </div>

      {/* Profile Summary */}
      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-center">
          Your Profile Summary
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Mail className="w-4 h-4 text-primary" />
              Contact
            </div>
            <p className="text-sm text-muted-foreground pl-6">{data.email}</p>
          </div>

          {/* Personal Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <User className="w-4 h-4 text-primary" />
              Personal
            </div>
            <p className="text-sm text-muted-foreground pl-6">
              {data.age} years old, {data.gender}
            </p>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="w-4 h-4 text-primary" />
              Location
            </div>
            <p className="text-sm text-muted-foreground pl-6">
              {data.city}, {data.country}
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Trophy className="w-4 h-4 text-primary" />
              Experience
            </div>
            <p className="text-sm text-muted-foreground pl-6">
              {data.experience} years
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Code className="w-4 h-4 text-primary" />
            Skills ({data.skills.length})
          </div>
          <div className="flex flex-wrap gap-2 pl-6">
            {data.skills.slice(0, 8).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {data.skills.length > 8 && (
              <Badge variant="outline" className="text-xs">
                +{data.skills.length - 8} more
              </Badge>
            )}
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">What's next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Explore personalized recommendations based on your skills
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Connect with professionals in your area and skill level
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Discover opportunities that match your experience
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Update your profile anytime in settings
            </li>
          </ul>
        </div>
      </Card>

      {/* CTA Button */}
      <div className="text-center">
        <Button onClick={handleGetStarted} size="lg" className="px-8">
          Get Started
        </Button>
      </div>
    </div>
  );
}
