import { ServiceForm } from "@/components/dashboard/services/service-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary/30 p-6 md:p-12">
      <div className="mx-auto max-w-5xl">
        <ServiceForm />
      </div>
    </main>
  );
}
