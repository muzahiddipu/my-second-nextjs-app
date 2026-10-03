"use client";

import { useFavorites } from "./FavoritesProvider";

export default function FavoriteButton({
  foodId,
  dishName,
  className = "rounded-sm border border-white/80 bg-white/95 px-3 py-2 text-xs font-semibold text-[#24573f] shadow-sm transition-colors hover:bg-[#285d43] hover:text-white",
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isSaved = isFavorite(foodId);

  return (
    <button
      type="button"
      aria-label={`${isSaved ? "Remove" : "Save"} ${dishName} ${isSaved ? "from" : "to"} favorites`}
      aria-pressed={isSaved}
      onClick={() => toggleFavorite(foodId)}
      className={`${className} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285d43]`}
    >
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}
