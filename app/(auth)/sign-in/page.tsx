import { SignInForm } from "@/components/signin-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 h-screen">
      <div className="w-full max-w-md md:max-w-4xl">
        <SignInForm />
      </div>
    </div>
  );
}
