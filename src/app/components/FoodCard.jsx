"use client";

import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

const FoodCard = ({ food }) => {
  const {
    id,
    dish_name: dishName,
    image_link: imageLink,
    cuisine,
    category,
    price,
    rating,
    main_ingredients: ingredients = [],
  } = food;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#e0e6df] bg-white transition-shadow hover:shadow-[0_16px_36px_-28px_rgba(23,39,30,0.5)]">
      <div className="relative aspect-4/3 bg-[#e7ebe5]">
        <Image
          src={imageLink}
          alt={dishName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <FavoriteButton
          foodId={id}
          dishName={dishName}
          className="absolute right-3 top-3 rounded-sm border border-white/80 bg-white/95 px-3 py-2 text-xs font-semibold text-[#24573f] shadow-sm transition-colors hover:bg-[#285d43] hover:text-white"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8c5b39]">
            {category}
          </p>
          {rating != null && (
            <p className="shrink-0 text-xs font-medium tabular-nums text-[#647168]">
              {rating} / 5
            </p>
          )}
        </div>
        <h2 className="mt-2 text-lg font-semibold leading-snug text-[#17271e]">
          {dishName}
        </h2>
        {cuisine && <p className="mt-1 text-sm text-[#607067]">{cuisine}</p>}
        {ingredients.length > 0 && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#748077]">
            {ingredients.slice(0, 3).join(" · ")}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          {price != null ? (
            <p className="text-sm font-semibold text-[#17271e]">BDT {price}</p>
          ) : (
            <span />
          )}
          <Link
            href={`/menu/${id}`}
            className="rounded-sm bg-[#285d43] px-3.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#204a36]"
          >
            View dish
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FoodCard;
