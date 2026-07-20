import { AuthForm } from "@/features/auth/auth-form";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12 dark:bg-neutral-950">
      <AuthForm mode="signup" />
    </main>
  );
}
