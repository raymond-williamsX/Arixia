import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <Card className="flex min-h-48 flex-col items-center justify-center px-6 py-10 text-center">
      <Icon className="h-8 w-8 text-neutral-400" aria-hidden="true" />
      <h2 className="mt-4 text-base font-semibold">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-600 dark:text-neutral-400">{description}</p>
    </Card>
  );
}
