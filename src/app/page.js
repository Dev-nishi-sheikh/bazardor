import { getCategories, getProducts } from "@/lib/api";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import ProductGrid from "@/components/ProductGrid";

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();

  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#fffdf7]">
      <Navbar categories={categories} />

      <PriceTicker products={products} />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="text-sm font-semibold text-green-600">
          আজকের বাজারদর
        </p>

        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          প্রয়োজনীয় পণ্যের দাম এক নজরে
        </h1>

        <p className="mt-5 max-w-xl text-gray-600">
          বাংলাদেশের বিভিন্ন বাজারের আজকের পণ্যের দাম সহজে দেখুন।
        </p>

        <a
          href="#সব-পণ্য"
          className="mt-7 inline-block rounded-lg bg-black px-6 py-3 text-white"
        >
          সব পণ্য দেখুন
        </a>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">
            আজ দাম বেড়েছে <span className="text-green-600">▲</span>
          </h2>

          <p className="mt-2 text-gray-600">
            আজ যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে।
          </p>
        </div>

        <ProductGrid products={risingProducts} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">
            আজ দাম কমেছে <span className="text-red-600">▼</span>
          </h2>

          <p className="mt-2 text-gray-600">
            আজ যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে।
          </p>
        </div>

        <ProductGrid products={fallingProducts} />
      </section>

      <section
        id="সব-পণ্য"
        className="mx-auto max-w-6xl px-4 py-10 pb-20"
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold">
            সব পণ্য
          </h2>

          <p className="mt-2 text-gray-600">
            আজকের প্রয়োজনীয় সব পণ্যের বর্তমান দাম।
          </p>
        </div>

        <ProductGrid products={products} />
      </section>
    </main>
  );
}