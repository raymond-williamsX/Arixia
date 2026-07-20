"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils/cn";

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 px-2 py-2 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95 lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-5 gap-1">
        {mobileNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg text-xs font-medium text-neutral-500",
                isActive && "bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-white"
              )}
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
