import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getCategories, getProduct } from "@/lib/api";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";

const units = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export default async function ProductDetails({ params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const { slug } = await params;

  const [product, categories] = await Promise.all([
    getProduct(slug),
    getCategories(),
  ]);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffdf7] px-4">
        <div className="text-center">
          <div className="text-6xl">🔍</div>

          <h1 className="mt-5 text-4xl font-bold">
            পণ্য পাওয়া যায়নি
          </h1>

          <p className="mt-3 text-gray-500">
            আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যায়নি।
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-black px-6 py-3 text-white"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const prices = product.markets.flatMap((market) => [
    market.min,
    market.max,
  ]);

  const minimum = Math.min(...prices);
  const maximum = Math.max(...prices);

  const average = Math.round(
    prices.reduce((sum, price) => sum + price, 0) / prices.length
  );

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <main className="min-h-screen bg-[#fffdf7]">
      <Navbar categories={categories} />

      <PriceTicker products={[product]} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link
          href="/"
          className="text-sm text-gray-500 transition hover:text-black"
        >
          ← হোমে ফিরে যান
        </Link>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-3xl bg-[#fff8e8] text-7xl">
              {product.image}
            </div>

            <div>
              <p className="text-sm font-medium text-green-600">
                {product.categoryIcon} {product.categoryNameBn}
              </p>

              <h1 className="mt-2 text-4xl font-bold">
                {product.nameBn}
              </h1>

              <p className="mt-3 text-gray-500">
                আজকের বাজারের সর্বশেষ তথ্য
              </p>

              <p className="mt-3 text-gray-600">
                {units[product.unit] || product.unit}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              সর্বনিম্ন দাম
            </p>

            <p className="mt-2 text-3xl font-bold">
              {minimum.toLocaleString("bn-BD")} টাকা
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              সর্বোচ্চ দাম
            </p>

            <p className="mt-2 text-3xl font-bold">
              {maximum.toLocaleString("bn-BD")} টাকা
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              গড় দাম
            </p>

            <p className="mt-2 text-3xl font-bold">
              {average.toLocaleString("bn-BD")} টাকা
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">
                আজকের দাম
              </p>

              <h2 className="mt-1 text-4xl font-bold">
                {product.today.toLocaleString("bn-BD")} টাকা
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {units[product.unit] || product.unit}
              </p>
            </div>

            {isUp && (
              <span className="rounded-full bg-green-100 px-4 py-2 font-medium text-green-700">
                ▲ {product.change.pct.toLocaleString("bn-BD")}%
              </span>
            )}

            {isDown && (
              <span className="rounded-full bg-red-100 px-4 py-2 font-medium text-red-700">
                ▼{" "}
                {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
              </span>
            )}

            {!isUp && !isDown && (
              <span className="rounded-full bg-gray-100 px-4 py-2 font-medium text-gray-600">
                — ০.০%
              </span>
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <p className="mt-2 text-gray-600">
            বিভিন্ন বাজারে {product.nameBn}-এর বর্তমান দাম।
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {product.markets.map((market, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold">
                      {market.market}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {market.division}
                    </p>
                  </div>

                  <span className="text-sm text-gray-500">
                    {units[product.unit] || product.unit}
                  </span>
                </div>

                <div className="mt-5 flex justify-between">
                  <div>
                    <p className="text-xs text-gray-500">
                      সর্বনিম্ন
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {market.min.toLocaleString("bn-BD")} টাকা
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      সর্বোচ্চ
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {market.max.toLocaleString("bn-BD")} টাকা
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}