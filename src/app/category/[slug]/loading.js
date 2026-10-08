export default function Loading() {
  return (
    <main className="min-h-screen bg-[#fffdf7]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />

        <div className="mt-10">
          <div className="h-14 w-14 animate-pulse rounded-xl bg-gray-200" />
          <div className="mt-5 h-10 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mt-3 h-5 w-80 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border bg-white p-5"
            >
              <div className="h-14 w-14 animate-pulse rounded-xl bg-gray-200" />

              <div className="mt-5 h-6 w-32 animate-pulse rounded bg-gray-200" />

              <div className="mt-2 h-4 w-24 animate-pulse rounded bg-gray-200" />

              <div className="mt-6 h-8 w-28 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
