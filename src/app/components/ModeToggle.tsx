"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [transitioning, setTransitioning] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Avoid rendering on the server

  const handleToggle = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    // Set custom properties for radial origin
    document.documentElement.style.setProperty(
      "--button-x",
      `${rect.left + rect.width / 2}px`
    );
    document.documentElement.style.setProperty(
      "--button-y",
      `${rect.top + rect.height / 2}px`
    );

    setTransitioning(true);

    // Delay theme switch until animation is complete
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
      setTransitioning(false);
    }, 700); // Match the animation duration
  };

  return (
    <div className="relative">
      {/* Wipe Overlay */}
      {transitioning && (
        <div
          className={`fixed inset-0 z-50 bg-black dark:bg-white animate-radial-wipe`}
        ></div>
      )}

      {/* Theme Toggle Button */}
      <Button
        className="mr-4"
        variant="outline"
        size="icon"
        onClick={handleToggle}
      >
        <Sun
          className={`${
            theme === "dark" ? "hidden" : "block"
          } h-[1.2rem] w-[1.2rem] transition-transform duration-500`}
        />
        <Moon
          className={`${
            theme === "dark" ? "block" : "hidden"
          } h-[1.2rem] w-[1.2rem] transition-transform duration-500`}
        />
      </Button>
    </div>
  );
}
