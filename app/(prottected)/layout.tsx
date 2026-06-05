"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { NavigationHeader } from "../components/navigation-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/user/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/signin");
          return;
        }

        setLoading(false);
      } catch (err) {
        router.push("/signin");
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex w-screen h-screen overflow-hidden">
        <div className="h-full">
          <AppSidebar />
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto h-full scrollbar-hide">
          <NavigationHeader />

          <div className="flex-1 w-full p-4 overflow-y-auto scrollbar-hide">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
