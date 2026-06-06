"use client";
import { useState } from "react";

export default function ForgottenPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/forgottenpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Reset link sent to your email!");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to send reset link.");
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Forgotten Password</h1>
      <p className="mb-4">
        Enter your email to receive password reset instructions.
      </p>
      <form className="max-w-md" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {" "}
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
