"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  forgotPasswordAction,
  googleOAuthAction,
  loginAction,
  signupAction,
  type AuthActionState
} from "@/features/auth/actions";

type AuthMode = "login" | "signup" | "forgot-password";

const initialState: AuthActionState = {};

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const action = mode === "login" ? loginAction : mode === "signup" ? signupAction : forgotPasswordAction;
  const [state, formAction, pending] = useActionState(action, initialState);
  const title =
    mode === "login" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset your password";
  const description =
    mode === "login"
      ? "Sign in to continue shopping with Arixia."
      : mode === "signup"
        ? "Start your AI-powered shopping workspace."
        : "Receive a secure reset link for your account.";

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={formAction} className="space-y-4">
          {mode === "signup" ? (
            <Field id="fullName" label="Full Name" name="fullName" autoComplete="name" />
          ) : null}
          <Field id="email" label="Email" name="email" type="email" autoComplete="email" />
          {mode !== "forgot-password" ? (
            <Field id="password" label="Password" name="password" type="password" autoComplete="current-password" />
          ) : null}
          {mode === "signup" ? (
            <Field
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
            />
          ) : null}
          {state.error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {state.error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
            {mode === "login" ? "Login" : mode === "signup" ? "Create Account" : "Send Reset Link"}
          </Button>
        </form>
        {mode !== "forgot-password" ? (
          <form action={googleOAuthAction}>
            <Button type="submit" variant="secondary" className="w-full">
              Continue with Google
            </Button>
          </form>
        ) : null}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          {mode === "login" ? <Link href="/forgot-password">Forgot Password</Link> : <Link href="/login">Login</Link>}
          {mode !== "signup" ? <Link href="/signup">Sign Up</Link> : null}
        </div>
      </CardContent>
    </Card>
  );
}

type FieldProps = {
  id: string;
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
};

function Field({ id, label, name, type = "text", autoComplete }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} type={type} autoComplete={autoComplete} required />
    </div>
  );
}
