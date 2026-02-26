"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, History, User } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Grid3X3 },
  { href: "/history", label: "History", icon: History },
  { href: "/profile", label: "Profile", icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur">
      <div className="container mx-auto px-2">
        <ul className="grid grid-cols-4">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex flex-col items-center justify-center py-2.5 gap-1 ${active ? "text-[#204099] dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
                    }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className={`h-5 w-5 ${active ? "" : "text-gray-500 dark:text-gray-500"}`} />
                  <span className="text-[11px] font-medium">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}


