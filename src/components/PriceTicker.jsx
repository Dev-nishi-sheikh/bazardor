export default function PriceTicker({ products = [] }) {
  return (
    <div className="border-b bg-black text-white">
      <marquee
        direction="left"
        scrollamount="6"
        behavior="scroll"
        className="py-3"
      >
        <div className="flex gap-10 text-sm">
          {products.map((product) => (
            <span key={product.id} className="mr-10">
              {product.image} {product.nameBn} {product.today} টাকা{" "}

              {product.change.dir === "up" && (
                <span className="text-green-400">
                  ▲ {product.change.pct}%
                </span>
              )}

              {product.change.dir === "down" && (
                <span className="text-red-400">
                  ▼ {Math.abs(product.change.pct)}%
                </span>
              )}
            </span>
          ))}
        </div>
      </marquee>
    </div>
  );
}