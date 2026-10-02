import Image from "next/image";
import Link from "next/link";
import FoodCard from "./components/FoodCard";
import { getTopFoods } from "../lib/foods";

export default async function Home() {
  let foods = [];
  let loadError = false;

  try {
    foods = await getTopFoods();
  } catch {
    loadError = true;
  }

  const featuredFood = foods[0];

  return (
    <main className="min-h-screen bg-[#f6f7f3]">
      <section className="border-b border-[#e1e6de] bg-[#edf1e9]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-12">
          <div className="py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c5b39]">
              An everyday food guide
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-[#17271e] sm:text-5xl">
              Good food, a little closer.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-[#5d6a60]">
              From bright Mediterranean bowls to familiar comfort food, find a
              dish for the moment.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/menu"
                className="rounded-sm bg-[#285d43] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#204a36]"
              >
                Browse the menu
              </Link>
              <Link
                href="/dashboard"
                className="rounded-sm border border-[#b8c5b8] bg-transparent px-5 py-3 text-sm font-semibold text-[#285d43] transition-colors hover:bg-white"
              >
                View saved dishes
              </Link>
            </div>
          </div>

          {featuredFood ? (
            <Link
              href={`/menu/${featuredFood.id}`}
              className="group relative block overflow-hidden rounded-lg bg-[#dce4db]"
            >
              <div className="relative aspect-4/3">
                <Image
                  src={featuredFood.image_link}
                  alt={featuredFood.dish_name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 rounded-sm bg-white/95 p-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8c5b39]">
                    Featured dish
                  </p>
                  <p className="mt-1 max-w-lg text-base font-semibold leading-snug text-[#17271e]">
                    {featuredFood.dish_name}
                  </p>
                </div>
                <span className="text-sm font-semibold text-[#285d43]">
                  BDT {featuredFood.price}
                </span>
              </div>
            </Link>
          ) : (
            <div
              className="flex aspect-4/3 items-end rounded-lg border border-[#d9e1d8] bg-white p-6"
              role={loadError ? "alert" : undefined}
            >
              <p className="max-w-md text-sm leading-6 text-[#647168]">
                {loadError
                  ? "The featured dishes could not be loaded. Visit the menu again shortly."
                  : "New dishes are being added to the table."}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c5b39]">
              Start exploring
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#17271e] sm:text-3xl">
              Dishes worth a closer look
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-sm font-semibold text-[#285d43] underline decoration-[#a8b9aa] underline-offset-4 hover:text-[#204a36]"
          >
            See the full menu
          </Link>
        </div>

        {loadError ? (
          <p
            className="border-y border-[#dfe5de] py-8 text-sm text-[#647168]"
            role="alert"
          >
            The menu is temporarily unavailable. Please try again later.
          </p>
        ) : foods.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(foods.length > 1 ? foods.slice(1, 4) : foods).map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <p className="border-y border-[#dfe5de] py-8 text-sm text-[#647168]">
            No dishes are available just yet.
          </p>
        )}
      </section>
    </main>
  );
}
