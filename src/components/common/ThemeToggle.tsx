"use client"

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!resolvedTheme) return null;

  return (
    <div className="flex items-center justify-center bg-transparent">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="h-[80px] w-[40px] rounded-full p-0 shadow-lg transition-colors duration-300 hover:bg-transparent dark:bg-gray-800 dark:hover:bg-gray-800"
      >
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <div
            className={`absolute inset-0 transition-transform duration-500 ease-spring ${
              resolvedTheme === "dark" ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-b from-indigo-500 to-purple-600">
              <Moon className="h-6 w-6 text-yellow-200 transition-transform duration-300 [transform-style:preserve-3d] [&>path]:animate-glow" strokeWidth={1.5} />
            </div>
          </div>
          <div
            className={`absolute inset-0 transition-transform duration-500 ease-spring ${
              resolvedTheme === "light" ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-t from-yellow-300 to-orange-400">
              <Sun className="h-7 w-7 text-orange-100 transition-transform duration-300 [transform-style:preserve-3d] [&>circle]:animate-pulse" strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}