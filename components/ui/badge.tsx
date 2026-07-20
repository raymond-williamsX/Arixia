import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", {
  variants: {
    variant: {
      default: "bg-neutral-100 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-200",
      ai: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
      success: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-200",
      warning: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-200",
      danger: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
