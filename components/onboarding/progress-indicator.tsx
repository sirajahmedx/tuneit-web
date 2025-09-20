"use client"

import { useOnboarding } from "./onboarding-context"
import { cn } from "@/lib/utils"

export function ProgressIndicator() {
  const { currentStep, totalSteps } = useOnboarding()

  const steps = [
    { number: 1, title: "Account", description: "Sign up details" },
    { number: 2, title: "Personal", description: "About you" },
    { number: 3, title: "Skills", description: "Your expertise" },
    { number: 4, title: "Experience", description: "Your level" },
    { number: 5, title: "Location", description: "Where you are" },
  ]

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center space-y-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  currentStep >= step.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {step.number}
              </div>
              <div className="text-center">
                <div
                  className={cn(
                    "text-xs font-medium",
                    currentStep >= step.number ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-3">
                <div
                  className={cn(
                    "h-px w-full transition-colors",
                    currentStep > step.number ? "bg-primary" : "bg-border",
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      <div className="text-center">
        <span className="text-xs text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
      </div>
    </div>
  )
}
