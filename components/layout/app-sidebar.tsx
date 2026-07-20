"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { desktopNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils/cn";
import { LogoutButton } from "@/features/auth/logout-button";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-neutral-200 bg-white px-4 py-5 dark:border-neutral-800 dark:bg-neutral-950 lg:block">
      <Link href="/home" className="flex items-center gap-2 px-2 text-lg font-semibold">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
        </span>
        Arixia
      </Link>
      <nav className="mt-8 space-y-1" aria-label="Desktop navigation">
        {desktopNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white",
                isActive && "bg-neutral-100 text-neutral-950 dark:bg-neutral-900 dark:text-white"
              )}
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-8 border-t border-neutral-200 pt-4 dark:border-neutral-800">
        <LogoutButton />
      </div>
    </aside>
  );
}
