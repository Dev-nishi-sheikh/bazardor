"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      toast.error("নাম লিখুন");
      return;
    }

    if (!cleanEmail) {
      toast.error("ইমেইল লিখুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: cleanName,
        email: cleanEmail,
        password,
      });

      console.log("SIGNUP RESULT:", result);

      if (result.error) {
        toast.error(
          result.error.message || "Account তৈরি করা যায়নি"
        );
        return;
      }

      toast.success("Account সফলভাবে তৈরি হয়েছে!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      toast.error(
        error?.message || "Signup করতে সমস্যা হয়েছে"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialLogin(provider) {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "http://localhost:3000/",
      });

      if (error) {
        console.error("SOCIAL LOGIN ERROR:", error);

        toast.error(
          error.message || "Social login failed"
        );
      }
    } catch (error) {
      console.error(error);

      toast.error("Social login করতে সমস্যা হয়েছে");
    } finally {
      setSocialLoading("");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffdf7] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-sm md:p-8">

        <div className="text-center">
          <Link
            href="/"
            className="text-2xl font-bold"
          >
            🛒 বাজার দর
          </Link>

          <h1 className="mt-6 text-3xl font-bold">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            বাজারদর দেখতে একটি account তৈরি করুন।
          </p>
        </div>

        <div className="mt-8 grid gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={socialLoading !== "" || loading}
            className="w-full rounded-xl border px-4 py-3 font-medium transition hover:bg-gray-50 disabled:opacity-50"
          >
            {socialLoading === "google"
              ? "Google দিয়ে সাইন আপ হচ্ছে..."
              : "Google দিয়ে সাইন আপ"}
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            disabled={socialLoading !== "" || loading}
            className="w-full rounded-xl border px-4 py-3 font-medium transition hover:bg-gray-50 disabled:opacity-50"
          >
            {socialLoading === "github"
              ? "GitHub দিয়ে সাইন আপ হচ্ছে..."
              : "GitHub দিয়ে সাইন আপ"}
          </button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-sm text-gray-400">
            অথবা
          </span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <form
          onSubmit={handleSignup}
          className="space-y-5"
        >
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
              disabled={loading}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              ইমেইল
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              disabled={loading}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              পাসওয়ার্ড
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              required
              disabled={loading}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black disabled:bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading || socialLoading !== ""}
            className="w-full rounded-xl bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
              : "সাইন আপ"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          আগে থেকেই account আছে?{" "}
          <Link
            href="/signin"
            className="font-medium text-black underline"
          >
            সাইন ইন করুন
          </Link>
        </p>

        <Link
          href="/"
          className="mt-5 block text-center text-sm text-gray-500 hover:text-black"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}