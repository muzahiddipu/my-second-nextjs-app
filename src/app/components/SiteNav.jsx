"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useFavorites } from "./FavoritesProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/dashboard", label: "Dashboard" },
];

function isCurrentRoute(pathname, href) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export default function SiteNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favoritesCount } = useFavorites();

  const renderLinks = (mobile = false) =>
    links.map(({ href, label }) => {
      const isActive = isCurrentRoute(pathname, href);
      return (
        <Link
          key={href}
          href={href}
          aria-current={isActive ? "page" : undefined}
          onClick={() => setIsMenuOpen(false)}
          className={`${
            isActive ? "text-[#24573f]" : "text-[#5d6961] hover:text-[#17271e]"
          } ${
            mobile
              ? "block border-t border-[#e8ebe5] py-3 text-sm font-medium"
              : "border-b-2 py-5 text-sm font-medium transition-colors"
          } ${isActive && !mobile ? "border-[#356a4e]" : "border-transparent"}`}
        >
          {label}
          {href === "/dashboard" && favoritesCount > 0 && (
            <span className="ml-2 rounded-sm bg-[#e8eee7] px-1.5 py-0.5 text-xs tabular-nums text-[#24573f]">
              {favoritesCount}
            </span>
          )}
        </Link>
      );
    });

  return (
    <header className="sticky top-0 z-40 border-b border-[#e3e8e1] bg-[#fbfcf9]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3 py-3">
          <span className="grid size-9 place-items-center rounded-sm bg-[#285d43] text-sm font-semibold text-white">
            CT
          </span>
          <span>
            <span className="block text-base font-semibold leading-tight text-[#17271e]">
              Common Table
            </span>
            <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#768177]">
              Food, found well
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {renderLinks()}
        </nav>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded-sm border border-[#d8e0d8] px-3 py-2 text-sm font-medium text-[#24573f] md:hidden"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="px-5 pb-3 md:hidden"
        >
          {renderLinks(true)}
        </nav>
      )}
    </header>
  );
}
