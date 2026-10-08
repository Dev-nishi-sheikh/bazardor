import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import CategoryProducts from "@/components/CategoryProducts";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffdf7] px-4">
        <div className="text-center">
          <div className="text-6xl">🔍</div>

          <h1 className="mt-5 text-4xl font-bold">
            ক্যাটাগরি পাওয়া যায়নি
          </h1>

          <p className="mt-3 text-gray-500">
            আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি পাওয়া যায়নি।
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

  const categoryProducts = products.filter(
    (product) => product.category === slug
  );

  return (
    <main className="min-h-screen bg-[#fffdf7]">
      <Navbar categories={categories} />

      <PriceTicker products={categoryProducts} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link
          href="/"
          className="text-sm text-gray-500 transition hover:text-black"
        >
          ← হোমে ফিরে যান
        </Link>

        <section className="mt-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-5xl">
                {category.categoryIcon}
              </p>

              <h1 className="mt-4 text-4xl font-bold">
                {category.nameBn}
              </h1>

              <p className="mt-2 text-gray-600">
                {category.nameBn} ক্যাটাগরির সব পণ্যের আজকের দাম।
              </p>
            </div>

            <div className="rounded-xl border bg-white px-5 py-3 text-sm text-gray-600">
              মোট পণ্য:{" "}
              {categoryProducts.length.toLocaleString("bn-BD")}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <CategoryProducts products={categoryProducts} />
        </section>
      </div>
    </main>
  );
}