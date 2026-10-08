import { ProductGridSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f4f8f4]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />

        <div className="mt-10">
          <div className="h-14 w-14 animate-pulse rounded-xl bg-gray-200" />

          <div className="mt-5 h-10 w-48 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-5 w-80 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="mt-10">
          <div className="mb-6 flex justify-between">
            <div className="h-7 w-32 animate-pulse rounded bg-gray-200" />

            <div className="h-11 w-44 animate-pulse rounded-lg bg-gray-200" />
          </div>

          <ProductGridSkeleton />
        </div>
      </div>
    </main>
  );
}