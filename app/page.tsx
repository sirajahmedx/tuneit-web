"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-66px)] bg-background">
      <main className="flex flex-1 flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to TuneIt Web</h2>
        <p className="text-lg mb-8">
          Connect with verified mechanics instantly.
        </p>
        <Button size="lg" variant="destructive" onClick={() => signOut()}>
          Get Started
        </Button>
      </main>
    </div>
  );
}
