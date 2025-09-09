import { SignInForm } from "@/components/signin-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-10 min-h-screen">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SignInForm />
      </div>
    </div>
  );
}
