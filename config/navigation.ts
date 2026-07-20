import { Bookmark, History, Home, Search, Settings, User } from "lucide-react";
import type { NavigationItem } from "@/types/navigation";

export const desktopNavigation: NavigationItem[] = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/history", label: "History", icon: History },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings }
];

export const mobileNavigation: NavigationItem[] = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/history", label: "History", icon: History },
  { href: "/profile", label: "Profile", icon: User }
];
