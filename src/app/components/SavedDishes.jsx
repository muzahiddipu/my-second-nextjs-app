"use client";

import Link from "next/link";
import FoodCard from "./FoodCard";
import { useFavorites } from "./FavoritesProvider";

export default function SavedDishes({ foods, loadError = false }) {
  const { favoriteIds, isReady } = useFavorites();
  const savedFoods = foods.filter((food) => favoriteIds.includes(food.id));

  if (!isReady) {
    return (
      <p
        className="border-y border-[#dfe5de] py-8 text-sm text-[#647168]"
        role="status"
      >
        Loading your saved dishes...
      </p>
    );
  }

  if (loadError) {
    return (
      <p
        className="border-l-2 border-[#a94a37] bg-white px-5 py-4 text-sm text-[#713c31]"
        role="alert"
      >
        Saved dishes could not be loaded. Please refresh to try again.
      </p>
    );
  }

  if (savedFoods.length === 0) {
    return (
      <div className="border-y border-[#dfe5de] py-12">
        <h2 className="text-xl font-semibold text-[#17271e]">
          Your collection is waiting for its first dish.
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#647168]">
          Start with a meal that sounds good today.
        </p>
        <Link
          href="/menu"
          className="mt-5 inline-flex rounded-sm bg-[#285d43] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#204a36]"
        >
          Explore the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {savedFoods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
}
