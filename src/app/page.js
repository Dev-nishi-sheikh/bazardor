import { getCategories, getProducts } from "@/lib/api";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f4f8f4]">
      <Navbar categories={categories} />

      <PriceTicker products={products} />

      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-5">
          <p className="text-xs font-semibold text-green-600">
            বাজারের ঊর্ধ্বমুখী দাম
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            আজ দাম বেড়েছে{" "}
            <span className="text-green-600">▲</span>
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            আজ যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে।
          </p>
        </div>

        {risingProducts.length > 0 ? (
          <ProductGrid products={risingProducts} />
        ) : (
          <div className="rounded-2xl border bg-white p-8 text-center text-gray-500">
            আজ দাম বাড়া কোনো পণ্য নেই।
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-5">
          <p className="text-xs font-semibold text-red-600">
            বাজারের নিম্নমুখী দাম
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            আজ দাম কমেছে{" "}
            <span className="text-red-600">▼</span>
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            আজ যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে।
          </p>
        </div>

        {fallingProducts.length > 0 ? (
          <ProductGrid products={fallingProducts} />
        ) : (
          <div className="rounded-2xl border bg-white p-8 text-center text-gray-500">
            আজ দাম কমা কোনো পণ্য নেই।
          </div>
        )}
      </section>

      <section
        id="সব-পণ্য"
        className="mx-auto max-w-6xl px-4 py-8 pb-16"
      >
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500">
            সম্পূর্ণ তালিকা
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            আজকের প্রয়োজনীয় সব পণ্যের বর্তমান দাম।
          </p>
        </div>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}