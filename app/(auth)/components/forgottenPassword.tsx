"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgottenPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/forgottenpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess("Reset link sent to your email!");
        setEmail("");
        setTimeout(() => {
          setSuccess("");
          router.push("/signin");
        }, 5000); // Clear success message after 5 seconds
      } else {
        const data = await response.json();
        setError(data.message || "Failed to send reset link.");
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
      setError("An error occurred. Please try again.");
      setEmail("");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Forgotten Password</h1>
      <p className="mb-4">
        Enter your email to receive password reset instructions.
      </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
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
