import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffdf7] px-4">
      <div className="w-full max-w-lg text-center">
        <div className="text-7xl">🛒</div>

        <p className="mt-6 text-sm font-semibold text-green-600">
          404 ERROR
        </p>

        <h1 className="mt-3 text-4xl font-bold md:text-5xl">
          পেজ পাওয়া যায়নি
        </h1>

        <p className="mx-auto mt-4 max-w-md text-gray-500">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে অথবা ঠিকানা
          পরিবর্তন করা হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}