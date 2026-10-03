import SavedDishes from "../components/SavedDishes";
import { getTopFoods } from "../../lib/foods";

export const metadata = {
  title: "Your saved dishes",
};

const DashBoardPage = async () => {
  let foods = [];
  let loadError = false;

  try {
    foods = await getTopFoods();
  } catch {
    loadError = true;
  }

  return (
    <main className="flex-1 bg-[#f6f7f3]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#dfe5de] pb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c5b39]">
              Your collection
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[#17271e] sm:text-4xl">
              Saved dishes
            </h1>
            <p className="mt-2 text-sm text-[#647168]">
              The dishes that have stayed on your mind.
            </p>
          </div>
        </div>
        <section aria-label="Saved dishes" className="pt-7">
          <SavedDishes foods={foods} loadError={loadError} />
        </section>
      </div>
    </main>
  );
};

export default DashBoardPage;
