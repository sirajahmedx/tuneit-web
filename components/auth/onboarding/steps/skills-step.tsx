"use client";

import { useState } from "react";
import { useOnboarding } from "../onboarding-context";
import { StepNavigation } from "../step-navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  X,
  Plus,
  Code,
  Palette,
  BarChart,
  Users,
  Wrench,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SkillsStep() {
  const {
    data,
    updateData,
    nextStep,
    previousStep: _previousStep,
  } = useOnboarding();
  const [customSkill, setCustomSkill] = useState("");

  const predefinedSkills = [
    {
      category: "Development",
      icon: Code,
      skills: ["JavaScript", "Python", "React", "Node.js", "TypeScript", "SQL"],
    },
    {
      category: "Design",
      icon: Palette,
      skills: [
        "UI/UX Design",
        "Graphic Design",
        "Figma",
        "Adobe Creative Suite",
        "Prototyping",
      ],
    },
    {
      category: "Analytics",
      icon: BarChart,
      skills: [
        "Data Analysis",
        "Google Analytics",
        "Excel",
        "Tableau",
        "Statistics",
      ],
    },
    {
      category: "Marketing",
      icon: Users,
      skills: [
        "Digital Marketing",
        "Content Marketing",
        "SEO",
        "Social Media",
        "Email Marketing",
      ],
    },
    {
      category: "Operations",
      icon: Wrench,
      skills: [
        "Project Management",
        "Agile",
        "Scrum",
        "DevOps",
        "Quality Assurance",
      ],
    },
    {
      category: "Creative",
      icon: Lightbulb,
      skills: [
        "Writing",
        "Photography",
        "Video Editing",
        "Illustration",
        "Copywriting",
      ],
    },
  ];

  const handleSkillToggle = (skill: string) => {
    const currentSkills = data.skills;
    const isSelected = currentSkills.includes(skill);

    if (isSelected) {
      updateData({ skills: currentSkills.filter((s) => s !== skill) });
    } else {
      updateData({ skills: [...currentSkills, skill] });
    }
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !data.skills.includes(customSkill.trim())) {
      updateData({ skills: [...data.skills, customSkill.trim()] });
      setCustomSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    updateData({ skills: data.skills.filter((s) => s !== skill) });
  };

  const handleNext = () => {
    // Placeholder validation
    if (data.skills.length === 0) {
      console.log(
        "Skills validation would trigger here - at least one skill required"
      );
      return;
    }

    nextStep();
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-balance">
          What are your skills?
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto">
          Select your areas of expertise to help us match you with relevant
          opportunities
        </p>
      </div>

      <div className="space-y-8">
        {data.skills.length > 0 && (
          <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <Label className="text-sm font-medium mb-4 block flex items-center gap-2">
              <Code className="w-4 h-4 text-primary" />
              Selected Skills ({data.skills.length})
            </Label>
            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors duration-200"
                >
                  {skill}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-auto p-0 hover:bg-transparent text-primary/70 hover:text-primary"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </Card>
        )}

        <div className="space-y-6">
          <Label className="text-sm font-medium">
            Choose from popular skills
          </Label>
          <div className="grid gap-4">
            {predefinedSkills.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.category}
                  className="p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base">
                      {category.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Button
                        key={skill}
                        variant={
                          data.skills.includes(skill) ? "default" : "outline"
                        }
                        size="sm"
                        className={cn(
                          "h-9 text-sm transition-all duration-200",
                          data.skills.includes(skill)
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                            : "hover:bg-primary/10 hover:border-primary/50 hover:text-primary"
                        )}
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="p-6 bg-muted/30 border-border/50">
          <Label className="text-sm font-medium mb-4 block flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" />
            Add a custom skill
          </Label>
          <div className="flex gap-3">
            <Input
              placeholder="Type a skill not listed above"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddCustomSkill()}
              className="flex-1 h-11 bg-background border-border/50 focus:border-primary transition-colors duration-200"
            />
            <Button
              onClick={handleAddCustomSkill}
              disabled={
                !customSkill.trim() || data.skills.includes(customSkill.trim())
              }
              className="px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Lightbulb className="w-4 h-4 text-accent" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Tip</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Select 3-8 skills that best represent your expertise. You can
                always update these later in your profile.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <StepNavigation
        onNext={handleNext}
        nextDisabled={data.skills.length === 0}
      />
    </div>
  );
}
