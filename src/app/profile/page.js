"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  async function handleUpdate(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    setLoading(true);

    const { error } = await authClient.updateUser({
      name: name.trim(),
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Profile update করা যায়নি");
      return;
    }

    toast.success("Profile update হয়েছে!");
    router.refresh();
  }

  if (isPending || !session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffdf7]">
        <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffdf7] px-4 py-10">
      <div className="mx-auto max-w-xl">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← হোমে ফিরে যান
        </Link>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-3xl text-white">
              {session.user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <h1 className="mt-5 text-3xl font-bold">
              প্রোফাইল
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              আপনার প্রোফাইলের তথ্য পরিবর্তন করুন।
            </p>
          </div>

          <form onSubmit={handleUpdate} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                নাম
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম"
                required
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                ইমেইল
              </label>

              <input
                type="email"
                value={session.user.email || ""}
                disabled
                className="w-full rounded-xl border bg-gray-100 px-4 py-3 text-gray-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-black px-4 py-3 font-medium text-white disabled:opacity-50"
            >
              {loading ? "আপডেট হচ্ছে..." : "প্রোফাইল আপডেট করুন"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}