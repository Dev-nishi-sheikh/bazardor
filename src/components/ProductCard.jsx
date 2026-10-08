import Link from "next/link";

const units = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export default function ProductCard({ product }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#fff8e8] text-3xl">
            {product.image}
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
            {product.categoryNameBn}
          </span>
        </div>

        <h3 className="mt-5 text-xl font-bold">
          {product.nameBn}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {units[product.unit] || product.unit}
        </p>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-2xl font-bold">
              {product.today.toLocaleString("bn-BD")} টাকা
            </p>
          </div>

          {isUp && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              ▲ {product.change.pct.toLocaleString("bn-BD")}%
            </span>
          )}

          {isDown && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
              ▼ {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
            </span>
          )}

          {!isUp && !isDown && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
              — ০.০%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}