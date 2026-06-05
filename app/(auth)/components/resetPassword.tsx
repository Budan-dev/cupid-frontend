import { useState } from "react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      alert("Password reset successful!");
      // Handle password reset logic here
    } else {
      alert("Passwords do not match!");
      // Handle password mismatch error
    }
    try {
      fetch("/api/user/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <p className="mb-4">Enter your new password below.</p>
      <form className="max-w-md" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
