"use client";

import ResetPassword from "../components/resetPassword";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="w-full max-w-xl p-6 flex items-center justify-center">
        <ResetPassword />
      </div>
    </div>
  );
}
