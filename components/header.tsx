import React from "react";
import { ThemeToggle } from "./theme-toggle";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-3.5 bg-background border-b border-gray-500">
      <h1 className="text-2xl font-bold">TuneIt</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
