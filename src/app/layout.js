import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "বাজার দর",
  description: "বাংলাদেশের বিভিন্ন বাজারের আজকের পণ্যের দাম",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <div className="flex-1">
          {children}
        </div>

        <Footer />

        <Toaster position="top-right" />
      </body>
    </html>
  );
}