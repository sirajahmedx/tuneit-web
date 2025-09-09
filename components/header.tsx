"use client";
import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header: React.FC = () => {
  const { data: session } = useSession();
  const navigate = (path: string) => {
    window.location.href = path;
  };

  const initial = session?.user?.name
    ? session.user.name.charAt(0).toUpperCase()
    : "";

  return (
    <header className="flex justify-between items-center p-3.5 bg-background border-b border-gray-500">
      <h1 className="text-2xl font-bold">TuneIt</h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {session ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Link href="/sign-in" passHref>
            <Button onClick={() => navigate("/sign-in")} variant="default">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
