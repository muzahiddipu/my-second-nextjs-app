export default function FoodDetailsLoading() {
  return (
    <main
      className="flex-1 bg-[#f6f7f3] px-5 py-8 sm:px-8 sm:py-12"
      aria-busy="true"
      aria-label="Loading dish details"
    >
      <div className="mx-auto max-w-6xl">
        <div className="h-5 w-32 animate-pulse rounded-sm bg-[#dfe5de]" />
        <div className="mt-6 grid overflow-hidden rounded-lg border border-[#dce5df] bg-white lg:grid-cols-2">
          <div className="aspect-4/3 animate-pulse bg-[#e7ebe5] lg:aspect-auto lg:min-h-140" />
          <div className="space-y-5 p-6 sm:p-9">
            <div className="h-4 w-40 animate-pulse rounded-sm bg-[#e7ebe5]" />
            <div className="h-10 w-4/5 animate-pulse rounded-sm bg-[#e7ebe5]" />
            <div className="h-20 w-full animate-pulse rounded-sm bg-[#e7ebe5]" />
            <div className="h-14 w-2/3 animate-pulse rounded-sm bg-[#e7ebe5]" />
          </div>
        </div>
      </div>
    </main>
  );
}
