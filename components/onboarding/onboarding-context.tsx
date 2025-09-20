"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface OnboardingData {
  // Auth step
  email: string
  password: string
  confirmPassword: string
  createPassword: boolean

  // Personal details
  age: string
  gender: string

  // Skills
  skills: string[]

  // Experience
  experienceLevel: "beginner" | "intermediate" | "advanced" | "expert" | ""

  // Location
  city: string
  country: string
}

interface OnboardingContextType {
  currentStep: number
  totalSteps: number
  data: OnboardingData
  signInType: string
  updateData: (updates: Partial<OnboardingData>) => void
  nextStep: () => void
  previousStep: () => void
  goToStep: (step: number) => void
  handleSubmit: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}

interface OnboardingProviderProps {
  children: ReactNode
  signInType: string
}

export function OnboardingProvider({ children, signInType }: OnboardingProviderProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  const [data, setData] = useState<OnboardingData>({
    email: "",
    password: "",
    confirmPassword: "",
    createPassword: signInType !== "email",
    age: "",
    gender: "",
    skills: [],
    experienceLevel: "",
    city: "",
    country: "",
  })

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
      // Placeholder for validation logic
      handleNext()
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      // Placeholder for navigation logic
      handlePrevious()
    }
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step)
    }
  }

  // Placeholder functions for backend integration
  const handleNext = () => {
    console.log("Next step logic would go here")
  }

  const handlePrevious = () => {
    console.log("Previous step logic would go here")
  }

  const handleSubmit = () => {
    console.log("Final submission logic would go here", data)
  }

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        totalSteps,
        data,
        signInType,
        updateData,
        nextStep,
        previousStep,
        goToStep,
        handleSubmit,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}
