"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";

import { useTheme } from "../components/theme-provider";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function NavigationHeader() {
  const isMobile = useIsMobile();
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();

  const [isSignedIn, setIsSignedIn] = useState(false);

  async function handleSignOut() {
    try {
      const response = await fetch("/api/user/signout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        localStorage.setItem("isAuthenticated", "false");
        setIsSignedIn(false);
        router.push("/signin");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <div className="sticky top-0 z-50 bg-[--header-bg-light] dark:bg-[--header-bg-dark] text-[--header-text-light] dark:text-[--header-text-dark] shadow-sm transition-colors duration-200">
      <NavigationMenu
        viewport={isMobile}
        className="w-full max-w-full border-b border-gray-200 dark:border-slate-700 p-3 px-4 flex justify-between"
      >
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <SidebarTrigger className={navigationMenuTriggerStyle()} />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="#">Go Live</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <button
          onClick={handleSignOut}
          className="p-2 rounded-lg dark:to-blue-600 background hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
        >
          Sign Out
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </NavigationMenu>
    </div>
  );
}
