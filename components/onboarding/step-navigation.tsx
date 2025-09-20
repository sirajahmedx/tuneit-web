"use client"

import { useOnboarding } from "./onboarding-context"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

interface StepNavigationProps {
  onNext?: () => void
  onPrevious?: () => void
  nextLabel?: string
  previousLabel?: string
  nextDisabled?: boolean
  previousDisabled?: boolean
  showPrevious?: boolean
  isLoading?: boolean
}

export function StepNavigation({
  onNext,
  onPrevious,
  nextLabel = "Continue",
  previousLabel = "Back",
  nextDisabled = false,
  previousDisabled = false,
  showPrevious = true,
  isLoading = false,
}: StepNavigationProps) {
  const { currentStep, nextStep, previousStep } = useOnboarding()

  const handleNext = () => {
    if (onNext) {
      onNext()
    } else {
      nextStep()
    }
  }

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious()
    } else {
      previousStep()
    }
  }

  return (
    <div className="flex justify-between items-center pt-6 mt-6 border-t">
      {showPrevious && currentStep > 1 ? (
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={previousDisabled || isLoading}
          className="flex items-center gap-2 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          {previousLabel}
        </Button>
      ) : (
        <div />
      )}

      <Button onClick={handleNext} disabled={nextDisabled || isLoading} className="flex items-center gap-2">
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            {nextLabel}
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  )
}
