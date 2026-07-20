import { LoadingState } from "@/components/ui/loading-state";

export default function AuthLoading() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <LoadingState />
    </main>
  );
}
