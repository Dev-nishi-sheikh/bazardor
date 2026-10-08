import { ProductGridSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f4f8f4]">
      <div className="border-b bg-[#fffdf7]">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200" />

              <div>
                <div className="h-6 w-28 animate-pulse rounded bg-gray-200" />
                <div className="mt-2 h-3 w-36 animate-pulse rounded bg-gray-200" />
              </div>
            </div>

            <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />
          </div>

          <div className="mt-5 flex gap-2 overflow-hidden">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="h-9 w-16 shrink-0 animate-pulse rounded-full bg-gray-200"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="h-10 animate-pulse bg-gray-200" />

      <section className="mx-auto max-w-6xl px-4 py-5">
        <div className="grid min-h-[270px] items-center rounded-3xl border bg-white p-8 md:grid-cols-2">
          <div>
            <div className="h-6 w-36 animate-pulse rounded-full bg-gray-200" />

            <div className="mt-5 h-12 w-80 animate-pulse rounded bg-gray-200" />

            <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-gray-200" />

            <div className="mt-2 h-5 w-80 max-w-full animate-pulse rounded bg-gray-200" />

            <div className="mt-6 h-11 w-32 animate-pulse rounded-lg bg-gray-200" />
          </div>

          <div className="flex justify-center">
            <div className="h-48 w-64 animate-pulse rounded-3xl bg-gray-200" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-5">
          <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-8 w-56 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-200" />
        </div>

        <ProductGridSkeleton />
      </section>
    </main>
  );
}