import { SignUpForm } from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 h-screen">
      <div className="w-full max-w-md md:max-w-4xl">
        <SignUpForm />
      </div>
    </div>
  );
}
