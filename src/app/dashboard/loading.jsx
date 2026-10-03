export default function DashboardLoading() {
  return (
    <main
      className="flex-1 bg-[#f6f7f3]"
      aria-busy="true"
      aria-label="Loading saved dishes"
    >
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="h-8 w-56 animate-pulse rounded-sm bg-[#dfe5de]" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-lg border border-[#e0e6df] bg-white"
            >
              <div className="aspect-4/3 animate-pulse bg-[#e7ebe5]" />
              <div className="space-y-3 p-5">
                <div className="h-4 w-1/3 animate-pulse rounded-sm bg-[#e7ebe5]" />
                <div className="h-6 w-4/5 animate-pulse rounded-sm bg-[#e7ebe5]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
