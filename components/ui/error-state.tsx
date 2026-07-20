import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

type ErrorStateProps = {
  title?: string;
  description?: string;
};

export function ErrorState({
  title = "Something went wrong.",
  description = "Refresh the page or try again in a moment."
}: ErrorStateProps) {
  return (
    <Card className="border-red-200 bg-red-50 px-5 py-4 text-red-900 dark:border-red-950 dark:bg-red-950 dark:text-red-100">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="mt-1 text-sm leading-6">{description}</p>
        </div>
      </div>
    </Card>
  );
}
