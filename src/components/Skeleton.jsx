export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="h-14 w-14 animate-pulse rounded-xl bg-gray-200" />

        <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
      </div>

      <div className="mt-5 h-6 w-32 animate-pulse rounded bg-gray-200" />

      <div className="mt-2 h-4 w-24 animate-pulse rounded bg-gray-200" />

      <div className="mt-6 flex items-end justify-between">
        <div>
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />

          <div className="mt-2 h-8 w-28 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="h-7 w-16 animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}