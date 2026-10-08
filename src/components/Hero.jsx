import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-4 md:py-5">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
        <div className="grid min-h-[270px] items-center md:grid-cols-[1.2fr_0.8fr]">
          <div className="px-6 py-8 md:px-10">
            <div className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              বৃহস্পতিবার, ৮ অক্টোবর, ২০২৬
            </div>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত তথ্য, সর্বনিম্ন-সর্বোচ্চ এবং দামের
              পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="#সব-পণ্য"
              className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          <div className="flex h-full items-center justify-center px-6 py-6 md:px-8">
            <Image
              src="/hero-market.png"
              alt="বাজারের পণ্য"
              width={420}
              height={280}
              priority
              className="h-auto max-h-[230px] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}