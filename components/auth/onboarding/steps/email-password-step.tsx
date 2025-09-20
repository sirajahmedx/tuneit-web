"use client";
import { useState } from "react";
import { useOnboarding } from "../onboarding-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react";

export function EmailPasswordStep() {
  const { data, updateData, nextStep, signInType } = useOnboarding();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isGoogleSignIn = signInType === "google";
  const isEmailSignIn = signInType === "email";

  const handleNext = () => {
    // Placeholder validation
    if (!data.email) {
      console.log("Email validation would trigger here");
      return;
    }

    if (
      (isEmailSignIn || data.createPassword) &&
      (!data.password || !data.confirmPassword)
    ) {
      console.log("Password validation would trigger here");
      return;
    }

    if (
      (isEmailSignIn || data.createPassword) &&
      data.password !== data.confirmPassword
    ) {
      console.log("Password match validation would trigger here");
      return;
    }

    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          {isGoogleSignIn ? "Complete Your Account" : "Create Your Account"}
        </h2>
        <p className="text-muted-foreground text-sm">
          {isGoogleSignIn
            ? "We need a few more details to set up your account"
            : "Enter your email and create a secure password"}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="h-10"
          />
        </div>

        {isGoogleSignIn && (
          <Card className="p-4 border-dashed">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="create-password"
                checked={data.createPassword}
                onCheckedChange={(checked) =>
                  updateData({ createPassword: !!checked })
                }
                className="mt-0.5"
              />
              <div className="space-y-1">
                <Label
                  htmlFor="create-password"
                  className="text-sm font-medium cursor-pointer flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Create a password for email sign-in
                </Label>
                <p className="text-xs text-muted-foreground">
                  This allows you to sign in with email and password in the
                  future, even without using Google.
                </p>
              </div>
            </div>
          </Card>
        )}

        {(isEmailSignIn || data.createPassword) && (
          <div className="space-y-4 transition-all duration-200">
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a secure password"
                  value={data.password}
                  onChange={(e) => updateData({ password: e.target.value })}
                  className="h-10 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-10 w-10 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={data.confirmPassword}
                  onChange={(e) =>
                    updateData({ confirmPassword: e.target.value })
                  }
                  className="h-10 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-10 w-10 p-0"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Card className="p-3 bg-muted/50">
              <div className="space-y-2">
                <p className="text-xs font-medium">Password Requirements:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-foreground" />
                    At least 8 characters
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-foreground" />
                    One uppercase letter
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-foreground" />
                    One lowercase letter
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-foreground" />
                    One number
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleNext} className="px-6">
          Continue
        </Button>
      </div>
    </div>
  );
}
