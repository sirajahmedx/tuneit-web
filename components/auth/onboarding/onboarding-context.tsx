"use client";

import { useMutation } from "@apollo/client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { updateMechanicMutation } from "./queries";

export interface OnboardingData {
  // Auth step
  email: string;
  password: string;
  confirmPassword: string;
  createPassword: boolean;

  // Personal details
  age: string;
  gender: string;

  // Skills
  skills: string[];

  // Experience
  experience: string;

  // Location
  city: string;
  country: string;

  // New fields for image uploads
  cnic_front: string | null;
  cnic_back: string | null;
  avatar: string | null;

  // Additional fields to match the final JSON structure
  role: string;
  cnic: string;
  _id: string | null;
  address: {
    city: string | null;
    flat: string | null;
    full_address: string | null;
    is_default: boolean | null;
    location: {
      type: string | null;
      coordinates: [number, number] | null;
    };
  }[];
}

interface OnboardingContextType {
  currentStep: number;
  totalSteps: number;
  data: OnboardingData;
  signInType: string;
  updateData: (updates: Partial<OnboardingData>) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  handleSubmit: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}

interface OnboardingProviderProps {
  children: ReactNode;
  signInType: string;
}

export function OnboardingProvider({
  children,
  signInType,
}: OnboardingProviderProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const [data, setData] = useState<OnboardingData>({
    email: "",
    password: "",
    confirmPassword: "",
    createPassword: signInType !== "email",
    age: "",
    gender: "",
    skills: [],
    experience: "",
    city: "",
    country: "",
    cnic_front: null,
    cnic_back: null,
    avatar: null,
    role: "",
    cnic: "",
    _id: null,
    address: [
      {
        city: null,
        flat: null,
        full_address: null,
        is_default: null,
        location: {
          type: null,
          coordinates: null,
        },
      },
    ],
  });

  const [updateMechanic] = useMutation(updateMechanicMutation);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      // Placeholder for validation logic
      handleNext();
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      // Placeholder for navigation logic
      handlePrevious();
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  // Placeholder functions for backend integration
  const handleNext = () => {
    console.log("Next step logic would go here");
  };

  const handlePrevious = () => {
    console.log("Previous step logic would go here");
  };

  const handleSubmit = async () => {
    // Exclude confirmPassword from the data sent to backend
    const {
      confirmPassword: _confirmPassword,
      createPassword: _createPassword,
      age: _age,
      skills: _skills,
      ...dataToSubmit
    } = data;

    // Map the data to the required input structure
    const input = {
      email: dataToSubmit.email,
      _id: dataToSubmit._id || "68ce501aa6462a998ffab11b",
      gender: dataToSubmit.gender,
      role: dataToSubmit.role,
      cnic: dataToSubmit.cnic || "",
      cnic_front: dataToSubmit.cnic_front || "",
      cnic_back: dataToSubmit.cnic_back || "",
      experience: dataToSubmit.experience,
      avatar: dataToSubmit.avatar,
      address: dataToSubmit.address.map((addr) => ({
        city: addr.city || dataToSubmit.city,
        flat: addr.flat,
        full_address: addr.full_address,
        is_default: addr.is_default,
        location: addr.location,
      })),
    };

    try {
      const { data: result } = await updateMechanic({
        variables: { input: input },
      });

      if (result.updateMechanic.success) {
        setCurrentStep(6); // Navigate to completion screen
        console.log("Update successful:", result);
      } else {
        console.error("Update failed:", result.updateMechanic.message);
      }
      // Handle success, e.g., redirect or show completion
    } catch (error) {
      console.error("Update failed:", error);
      // Handle error
    }
  };

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
  );
}
