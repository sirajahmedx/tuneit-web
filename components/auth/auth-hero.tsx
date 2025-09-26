import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AuthHero() {
  return (
    <section className="flex w-full max-w-xl flex-col items-center rounded-2xl border border-border bg-card px-8 py-14 text-center shadow-sm">
      <span
        aria-hidden="true"
        className="mb-6 flex size-14 items-center justify-center rounded-full bg-accent text-primary"
      >
        <Lock className="size-6" />
      </span>
      <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Welcome
      </h1>
      <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
        Choose how you want to continue:
      </p>
      <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          type="button"
          className="w-full px-8 py-3 text-base font-semibold sm:w-auto"
        >
          Sign In
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full border-border px-8 py-3 text-base font-semibold text-foreground hover:bg-accent/60 sm:w-auto bg-transparent"
        >
          Sign Up
        </Button>
      </div>
    </section>
  );
}
