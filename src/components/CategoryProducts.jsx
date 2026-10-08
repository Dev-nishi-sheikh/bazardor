"use client";

import { useState } from "react";
import ProductGrid from "./ProductGrid";

export default function CategoryProducts({ products = [] }) {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") {
      return a.today - b.today;
    }

    if (sort === "high") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">
          পণ্যসমূহ
        </h2>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border bg-white px-4 py-3 text-sm outline-none"
        >
          <option value="default">
            ডিফল্ট
          </option>

          <option value="low">
            দাম: কম থেকে বেশি
          </option>

          <option value="high">
            দাম: বেশি থেকে কম
          </option>
        </select>
      </div>

      {sortedProducts.length > 0 ? (
        <ProductGrid products={sortedProducts} />
      ) : (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <h3 className="text-xl font-bold">
            কোনো পণ্য পাওয়া যায়নি
          </h3>

          <p className="mt-2 text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>
        </div>
      )}
    </>
  );
}
