"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar({ categories = [] }) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("Sign out করা যায়নি");
      return;
    }

    toast.success("Sign out হয়েছে");
    router.refresh();
  }

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

          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
            ) : session?.user ? (
              <>
                <Link
                  href="/profile"
                  className="hidden rounded-lg border px-4 py-2 text-sm sm:block"
                >
                  {session.user.name || "প্রোফাইল"}
                </Link>

                <button
                  onClick={handleSignOut}
                  className="rounded-lg bg-black px-4 py-2 text-sm text-white"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
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
            const isActive = pathname === `/category/${category.slug}`;

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