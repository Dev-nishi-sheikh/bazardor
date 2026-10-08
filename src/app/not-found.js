export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="text-center">
        <p className="text-7xl font-bold">404</p>

        <h1 className="mt-4 text-2xl font-bold">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-2 text-gray-600">
          আপনি যে পেজটি খুঁজছেন সেটি আর নেই বা ভুল URL দিয়েছেন।
        </p>

        <a href="/" className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
        >
          হোম পেজে ফিরে যান
        </a>
      </div>
    </main>
  );
} 