"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";

export function HeroSection() {
  const { theme } = useTheme();

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-screen text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Welcome to TuneIt Web
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 drop-shadow-md">
          Connect with verified mechanics instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            size="lg"
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
          >
            <Link href="/sign-up?role=user">Sign up as User</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg"
          >
            <Link href="/sign-up?role=mechanic">Sign up as Mechanic</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
