"use client"

import { useOnboarding } from "../onboarding-context"
import { StepNavigation } from "../step-navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { GraduationCap, Briefcase, Trophy, Star, Info } from "lucide-react"

export function ExperienceStep() {
  const { data, updateData, nextStep, previousStep } = useOnboarding()

  const experienceLevels = [
    {
      value: "beginner",
      title: "Beginner",
      description: "Just starting out or learning the basics",
      icon: GraduationCap,
      details: [
        "New to the field or technology",
        "0-1 years of experience",
        "Learning fundamentals",
        "Looking for guidance and mentorship",
      ],
      color: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200",
    },
    {
      value: "intermediate",
      title: "Intermediate",
      description: "Have some experience and can work independently",
      icon: Briefcase,
      details: [
        "Comfortable with core concepts",
        "1-3 years of experience",
        "Can complete tasks independently",
        "Building more complex projects",
      ],
      color: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200",
    },
    {
      value: "advanced",
      title: "Advanced",
      description: "Experienced professional with deep knowledge",
      icon: Trophy,
      details: [
        "Strong expertise in the field",
        "3-7 years of experience",
        "Can mentor others",
        "Lead complex projects",
      ],
      color:
        "bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-950 dark:border-purple-800 dark:text-purple-200",
    },
    {
      value: "expert",
      title: "Expert",
      description: "Industry expert with extensive experience",
      icon: Star,
      details: [
        "Recognized expertise and thought leadership",
        "7+ years of experience",
        "Shape industry standards",
        "Architect large-scale solutions",
      ],
      color: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200",
    },
  ]

  const handleLevelSelect = (level: string) => {
    updateData({ experienceLevel: level as any })
  }

  const handleNext = () => {
    // Placeholder validation
    if (!data.experienceLevel) {
      console.log("Experience level validation would trigger here")
      return
    }

    nextStep()
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-balance">What's your experience level?</h2>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto">
          This helps us tailor content and opportunities to your skill level
        </p>
      </div>

      <div className="space-y-6">
        {experienceLevels.map((level) => {
          const Icon = level.icon
          const isSelected = data.experienceLevel === level.value

          return (
            <Card
              key={level.value}
              className={cn(
                "p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-2",
                isSelected
                  ? "ring-2 ring-primary/50 border-primary bg-primary/5 shadow-lg scale-[1.02]"
                  : "hover:border-primary/30 hover:bg-muted/20 border-border/50",
              )}
              onClick={() => handleLevelSelect(level.value)}
            >
              <div className="flex items-start space-x-5">
                <div className={cn("p-3 rounded-xl flex-shrink-0 transition-colors duration-200", level.color)}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xl">{level.title}</h3>
                    {isSelected && (
                      <Badge variant="default" className="bg-primary text-primary-foreground">
                        Selected
                      </Badge>
                    )}
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{level.description}</p>

                  <ul className="text-sm text-muted-foreground space-y-2">
                    {level.details.map((detail, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-5 bg-gradient-to-r from-muted/30 to-muted/10 border-border/50">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Info className="w-4 h-4 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Don't worry about being perfect</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your experience level helps us show you the most relevant content. You can always update this later as you
              grow and learn.
            </p>
          </div>
        </div>
      </Card>

      <StepNavigation onNext={handleNext} nextDisabled={!data.experienceLevel} />
    </div>
  )
}
