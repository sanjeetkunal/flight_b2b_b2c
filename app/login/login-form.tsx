"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, IdCard, Lock } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const agentId = String(formData.get("agentId") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    if (!agentId || !password) {
      setError("Please enter both Agent ID / Email and Password.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/home");
    }, 600);
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-7">
      <h1 className="text-lg font-semibold tracking-tight text-slate-900">Welcome back</h1>
      <p className="mt-1 text-sm text-slate-500">Sign in to your OrbitTravel agent account.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <div>
          <label htmlFor="agentId" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Agent ID / Email
          </label>
          <div className="relative">
            <IdCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="agentId"
              name="agentId"
              type="text"
              autoComplete="username"
              placeholder="AG-10234 or you@agency.com"
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Password
            </label>
            <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" name="remember" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30" />
          Remember me on this device
        </label>

        {error && (
          <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 ring-1 ring-inset ring-rose-600/20">{error}</p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Login"}
        </Button>
      </form>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-500">
        Demo access: enter any Agent ID and password to preview the portal.
      </div>

      <p className="mt-5 text-center text-xs text-slate-400">
        Don&apos;t have an account?{" "}
        <a href="#" className="font-medium text-blue-600 hover:text-blue-700">
          Sign up
        </a>
      </p>
    </div>
  );
}
