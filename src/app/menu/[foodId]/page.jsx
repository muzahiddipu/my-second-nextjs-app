import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FavoriteButton from "../../components/FavoriteButton";
import { getFoodById } from "../../../lib/foods";

const FoodDetailsPage = async ({ params }) => {
  const { foodId } = await params;
  const food = await getFoodById(foodId);
  if (!food) notFound();

  const {
    dish_name: dishName,
    category,
    alternative_names: alternativeNames = [],
    main_ingredients: ingredients = [],
    approximate_nutrition_per_serving: nutrition = {},
    rating,
    price,
    possible_price_in_dhaka: priceRanges = {},
    cuisine,
    origin_and_popularity: origin,
    cooking_steps: cookingSteps = [],
    image_link: imageLink,
  } = food;

  return (
    <div className="flex-1 bg-[#f5f7f4]">
      <main className="mx-auto w-full max-w-6xl px-5 py-8 text-[#17231e] sm:px-8 sm:py-12">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/menu"
            className="text-sm font-semibold text-[#28684e] transition-colors hover:text-[#174631]"
          >
            &larr; Back to menu
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#718078]">
            Menu / Dish details
          </p>
        </nav>

        <section className="mt-6 grid overflow-hidden rounded-xl border border-[#dce5df] bg-white shadow-[0_18px_55px_-38px_rgba(23,35,30,0.4)] lg:grid-cols-2">
          <div className="relative aspect-4/3 bg-[#e5ece7] lg:aspect-auto lg:min-h-140">
            <Image
              src={imageLink}
              alt={dishName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute left-5 top-5 rounded-sm bg-white/95 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#28684e]">
              {category}
            </span>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-11">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="min-w-0 wrap-break-word font-semibold text-[#28684e]">
                {cuisine}
              </span>
              {rating != null && (
                <span className="text-[#65736b]">Rated {rating} / 5</span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-normal text-[#17231e] sm:text-4xl">
              {dishName}
            </h1>
            {origin && (
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#58665e]">
                {origin}
              </p>
            )}

            <div className="mt-7 grid grid-cols-2 gap-4 border-y border-[#e2e9e4] py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#718078]">
                  Menu price
                </p>
                <p className="mt-1 text-xl font-semibold text-[#17231e]">
                  BDT {price}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#718078]">
                  Category
                </p>
                <p className="mt-1 text-xl font-semibold capitalize text-[#17231e]">
                  {category}
                </p>
              </div>
            </div>

            {alternativeNames.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#718078]">
                  Also known as
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#58665e]">
                  {alternativeNames.join(" / ")}
                </p>
              </div>
            )}
            <div className="mt-7">
              <FavoriteButton
                foodId={food.id}
                dishName={dishName}
                className="rounded-sm bg-[#285d43] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#204a36]"
              />
            </div>
          </div>
        </section>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <section aria-labelledby="ingredients-heading">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#718078]">
              What&apos;s inside
            </p>
            <h2
              id="ingredients-heading"
              className="mt-2 text-2xl font-semibold text-[#17231e]"
            >
              Main ingredients
            </h2>
            <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
              {ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="border-b border-[#e2e9e4] py-3 text-sm leading-6 text-[#46554c]"
                >
                  <span className="mr-2 text-[#39815e]">+</span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>

          <aside className="space-y-10">
            <section aria-labelledby="nutrition-heading">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#718078]">
                Per serving
              </p>
              <h2
                id="nutrition-heading"
                className="mt-2 text-2xl font-semibold text-[#17231e]"
              >
                Nutrition
              </h2>
              <dl className="mt-5">
                {Object.entries(nutrition).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 border-b border-[#e2e9e4] py-3 text-sm"
                  >
                    <dt className="capitalize text-[#58665e]">
                      {label.replaceAll("_", " ")}
                    </dt>
                    <dd className="text-right font-semibold text-[#17231e]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="price-heading">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#718078]">
                Local estimate
              </p>
              <h2
                id="price-heading"
                className="mt-2 text-2xl font-semibold text-[#17231e]"
              >
                Dhaka price guide
              </h2>
              <dl className="mt-5">
                {Object.entries(priceRanges).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 border-b border-[#e2e9e4] py-3 text-sm"
                  >
                    <dt className="capitalize leading-6 text-[#58665e]">
                      {label.replaceAll("_", " ")}
                    </dt>
                    <dd className="shrink-0 text-right font-semibold text-[#17231e]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </aside>
        </div>

        <section
          aria-labelledby="steps-heading"
          className="mt-12 border-t border-[#dce5df] pt-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#718078]">
            From prep to plate
          </p>
          <h2
            id="steps-heading"
            className="mt-2 text-2xl font-semibold text-[#17231e]"
          >
            How it&apos;s made
          </h2>
          <ol className="mt-6 grid gap-x-12 sm:grid-cols-2">
            {cookingSteps.map((step, index) => (
              <li
                key={step}
                className="flex gap-4 border-t border-[#e2e9e4] py-5"
              >
                <span className="pt-0.5 text-sm font-semibold tabular-nums text-[#39815e]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-7 text-[#46554c]">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
};

export async function generateMetadata({ params }) {
  const { foodId } = await params;

  try {
    const food = await getFoodById(foodId);
    return food
      ? {
          title: food.dish_name,
          description:
            food.origin_and_popularity || `Details for ${food.dish_name}`,
        }
      : { title: "Dish not found" };
  } catch {
    return { title: "Dish details" };
  }
}

export default FoodDetailsPage;
