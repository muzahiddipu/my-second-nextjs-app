import Link from "next/link";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center bg-[#f6f7f3] px-5 py-16 sm:px-8">
      <div className="mx-auto w-full max-w-2xl border-y border-[#dfe5de] py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c5b39]">
          404 · Not found
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[#17271e]">
          This page isn&apos;t on the menu.
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#647168]">
          The link may be out of date, or the page may have moved. Head back to
          the menu to find something good.
        </p>
        <Link
          href="/menu"
          className="mt-6 inline-flex rounded-sm bg-[#285d43] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#204a36]"
        >
          Explore the menu
        </Link>
      </div>
    </main>
  );
}
