import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { TopNavigation } from "@/components/layout/top-navigation";

type ProtectedShellProps = {
  children: ReactNode;
  fullName: string;
  avatarUrl: string | null;
};

export function ProtectedShell({ children, fullName, avatarUrl }: ProtectedShellProps) {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-white">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <TopNavigation fullName={fullName} avatarUrl={avatarUrl} />
          <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-8">{children}</main>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
