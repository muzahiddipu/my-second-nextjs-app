"use client";

import { useState } from "react";
import FoodCard from "./FoodCard";
import { useFavorites } from "./FavoritesProvider";

export default function MenuExplorer({ foods, loadError = false }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All dishes");
  const [sortOrder, setSortOrder] = useState("featured");
  const [savedOnly, setSavedOnly] = useState(false);
  const { favoriteIds } = useFavorites();
  const categories = [
    "All dishes",
    ...new Set(foods.map((food) => food.category).filter(Boolean)),
  ];

  const visibleFoods = foods
    .filter((food) => {
      const searchText = [
        food.dish_name,
        food.cuisine,
        food.category,
        ...(food.main_ingredients ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return (
        searchText.includes(query.trim().toLowerCase()) &&
        (activeCategory === "All dishes" || food.category === activeCategory) &&
        (!savedOnly || favoriteIds.includes(food.id))
      );
    })
    .sort((first, second) => {
      if (sortOrder === "price-low")
        return (first.price ?? 0) - (second.price ?? 0);
      if (sortOrder === "price-high")
        return (second.price ?? 0) - (first.price ?? 0);
      if (sortOrder === "rating")
        return (second.rating ?? 0) - (first.rating ?? 0);
      return 0;
    });

  const clearFilters = () => {
    setQuery("");
    setActiveCategory("All dishes");
    setSortOrder("featured");
    setSavedOnly(false);
  };

  return (
    <main className="flex-1 bg-[#f6f7f3]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-[#dfe5de] pb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c5b39]">
              The menu
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[#17271e] sm:text-4xl">
              Find your next favorite.
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#647168]">
              Explore dishes, ingredients, and local price estimates in one
              place.
            </p>
          </div>
          <p className="text-sm tabular-nums text-[#647168]" aria-live="polite">
            {visibleFoods.length}{" "}
            {visibleFoods.length === 1 ? "dish" : "dishes"}
          </p>
        </div>

        {loadError ? (
          <div
            className="mt-8 border-l-2 border-[#a94a37] bg-white px-5 py-4 text-sm text-[#713c31]"
            role="alert"
          >
            The menu could not be loaded right now. Please refresh to try again.
          </div>
        ) : (
          <>
            <section aria-label="Menu filters" className="space-y-5 py-7">
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-end">
                <label className="block text-sm font-medium text-[#34453a]">
                  Search dishes
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Dish, ingredient, or cuisine"
                    className="mt-2 h-11 w-full rounded-sm border border-[#d8e0d8] bg-white px-3 text-sm outline-none transition focus:border-[#356a4e] focus:ring-2 focus:ring-[#356a4e]/15"
                  />
                </label>

                <label className="block text-sm font-medium text-[#34453a]">
                  Sort by
                  <select
                    value={sortOrder}
                    onChange={(event) => setSortOrder(event.target.value)}
                    className="mt-2 h-11 w-full rounded-sm border border-[#d8e0d8] bg-white px-3 text-sm outline-none focus:border-[#356a4e] focus:ring-2 focus:ring-[#356a4e]/15"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                    <option value="rating">Highest rated</option>
                  </select>
                </label>

                <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm font-medium text-[#34453a]">
                  <input
                    type="checkbox"
                    checked={savedOnly}
                    onChange={(event) => setSavedOnly(event.target.checked)}
                    className="size-4 accent-[#356a4e]"
                  />
                  Saved only
                </label>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#78847a]">
                  Category
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  aria-label="Filter by category"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={activeCategory === category}
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-sm border px-3 py-2 text-sm transition-colors ${
                        activeCategory === category
                          ? "border-[#285d43] bg-[#285d43] text-white"
                          : "border-[#d8e0d8] bg-white text-[#526158] hover:border-[#9cafa0]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {visibleFoods.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleFoods.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            ) : (
              <div className="border-y border-[#dfe5de] py-16 text-center">
                <h2 className="text-xl font-semibold text-[#17271e]">
                  No dishes match those filters.
                </h2>
                <p className="mt-2 text-sm text-[#647168]">
                  A changing table of bright bowls, comforting classics, and
                  fresh ideas.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-sm bg-[#285d43] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#204a36]"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
