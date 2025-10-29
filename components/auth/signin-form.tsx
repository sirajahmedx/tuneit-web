"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { SignInMutation } from "@/app/(auth)/queries";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "../loader";
import ErrorMessage from "../error";
import { setCookie } from "cookies-next";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [SignIn, { loading, error }] = useMutation(SignInMutation);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!SignIn) {
        throw new Error(
          "SignIn mutation is not available. Apollo Client may not be initialized."
        );
      }

      const { data } = await SignIn({
        variables: {
          input: {
            email: user.email,
            password: user.password,
          },
        },
      });
      if (data?.signIn?.success) {
        const { role, onboarded, token } = data.signIn.data;

        if (token) {
          setCookie("token", token);

          if (!onboarded && role === "mechanic") {
            router.push("/auth/onboarding?role=mechanic");
          } else {
            router.push("/");
          }
        } else {
          throw new Error("Authentication token is missing.");
        }
      } else {
        throw new Error("Sign-in failed. Please try again.");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      alert(`Sign-in failed: ${errorMessage}`);
    }
  };

  if (error) {
    return <ErrorMessage error={error as any} fullscreen />;
  }

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card className="overflow-hidden p-0 h-[500px]">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-4 md:p-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 py-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your TuneIt account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="me@example.com"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {loading ? <Loader size="small" /> : "Login"}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={() =>
                    signIn("google", {
                      callbackUrl:
                        "/auth/onboarding?signInType=google&role=" +
                        (role || "user"),
                    })
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/images/signin.jpeg"
              alt="Image"
              width={600}
              height={350}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
            />
          </div>
        </CardContent>
      </Card>
      {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  );
}
