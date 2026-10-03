import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Explore the menu" },
  { href: "/dashboard", label: "Saved dishes" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#dfe5de] bg-[#edf1e9]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href="/"
            className="text-base font-semibold text-[#17271e] transition-colors hover:text-[#285d43]"
          >
            Common Table
          </Link>
          <p className="mt-1 text-sm text-[#647168]">Food, found well.</p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-6 gap-y-3"
        >
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-[#526158] transition-colors hover:text-[#285d43]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-[#748077]">
          &copy; {new Date().getFullYear()} Common Table
        </p>
      </div>
    </footer>
  );
}
