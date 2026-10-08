"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ categories = [] }) {
  const pathname = usePathname();

  return (
    <header className="border-b bg-[#fffdf7]">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold">
            🛒 বাজার দর

            <span className="block text-xs font-normal text-gray-500">
              আজকের বাজারদর
            </span>
          </Link>

          <div className="flex gap-2">
            <Link
              href="/signin"
              className="rounded-lg border px-4 py-2 text-sm"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-black px-4 py-2 text-sm text-white"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        <nav className="mt-5 flex gap-2 overflow-x-auto pb-1">
          <Link
            href="/"
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
              pathname === "/"
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            সব
          </Link>

          {categories.map((category) => {
            const isActive =
              pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category.categoryIcon} {category.nameBn}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}