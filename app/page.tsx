import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to TuneIt Web</h2>
        <p className="text-lg mb-8">
          Connect with verified mechanics instantly.
        </p>
        <Button size="lg" variant="destructive">
          Get Started
        </Button>
      </main>
    </div>
  );
}
