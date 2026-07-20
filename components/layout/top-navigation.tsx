import Link from "next/link";
import { Bell, Search, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

type TopNavigationProps = {
  fullName: string;
  avatarUrl: string | null;
};

export function TopNavigation({ fullName, avatarUrl }: TopNavigationProps) {
  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/home" className="flex items-center gap-2 font-semibold lg:hidden">
          <Sparkles className="h-5 w-5 text-blue-600" aria-hidden="true" />
          Arixia
        </Link>
        <Link
          href="/search"
          className="hidden h-10 flex-1 max-w-xl items-center gap-3 rounded-lg border border-neutral-200 px-3 text-sm text-neutral-500 dark:border-neutral-800 md:flex"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Search products, compare choices, or upload an image
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button type="button" variant="icon" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Link href="/profile" aria-label="Profile">
            <Avatar>
              {avatarUrl ? <AvatarImage src={avatarUrl} alt="" /> : null}
              <AvatarFallback>{initials || "AX"}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}
