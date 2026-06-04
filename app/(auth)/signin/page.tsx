"use client";

import { SignInForm } from "../components/signinForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="w-full max-w-xl p-6 flex items-center justify-center">
        <SignInForm />
      </div>
    </div>
  );
}
