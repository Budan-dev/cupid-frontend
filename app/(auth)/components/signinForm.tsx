"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // IMPORTANT - This sends/receives cookies
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      console.log("Response cookies:", response.headers.getSetCookie?.());

      const data = await response.json();
      console.log("Response data:", data);

      // Check if response is successful (status 200-299)
      if (response.status >= 200 && response.status < 300) {
        console.log("Sign-in successful, cookies saved automatically");
        alert("Sign-in successful! Redirecting to profile...");
        setTimeout(() => {
          router.push("/profile");
        }, 200);
      } else if (response.status === 401) {
        console.error("Unauthorized: Invalid credentials");
        alert("Invalid email or password");
      } else if (response.status === 400) {
        console.error(`Error: ${data.message}`);
        alert(`Sign-in failed: ${data.message}`);
      } else {
        console.error(`Error: ${data.message}`);
        alert(`Sign-in failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error during sign-in");
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Log in to your account</CardTitle>
        <CardDescription>
          Enter your email below to log in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {/* <Button type="submit" className="w-full">
          Login
        </Button> */}
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
