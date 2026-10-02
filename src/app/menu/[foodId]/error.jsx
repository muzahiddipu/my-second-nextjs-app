"use client";

import Link from "next/link";

export default function FoodDetailsError({ reset }) {
  return (
    <main className="min-h-[70vh] bg-[#f6f7f3] px-5 py-16 text-[#17271e] sm:px-8">
      <div className="mx-auto max-w-2xl border-y border-[#dfe5de] py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c5b39]">
          Dish details
        </p>
        <h1 className="mt-3 text-3xl font-semibold">
          We couldn&apos;t load this dish.
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#647168]">
          The food service may be temporarily unavailable. You can try again or
          return to the menu.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-sm bg-[#285d43] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#204a36]"
          >
            Try again
          </button>
          <Link
            href="/menu"
            className="rounded-sm border border-[#b8c5b8] px-4 py-2.5 text-sm font-semibold text-[#285d43] hover:bg-white"
          >
            Back to menu
          </Link>
        </div>
      </div>
    </main>
  );
}
