"use client";

import { ErrorState } from "@/components/ui/error-state";

export default function AuthError() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <ErrorState title="Authentication error" description="The authentication page could not be loaded." />
    </main>
  );
}
