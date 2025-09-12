"use client";
import { SignUpForm } from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  // const router = useRouter();
  const role = searchParams.get("role");

  if (role) {
    return (
      <div className="flex flex-col items-center justify-center p-4 md:p-8 h-screen">
        <div className="w-full max-w-md md:max-w-4xl">
          <SignUpForm role={role} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 h-screen">
      <div className="w-full max-w-md md:max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Join TuneIt</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Choose your account type to get started
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-4 text-lg" asChild>
              <Link href="/sign-up?role=user">Sign up as User</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <Link href="/sign-up?role=mechanic">Sign up as Mechanic</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
