export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
        <p>
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="max-w-xl md:text-right">
          এই ওয়েবসাইটের তথ্য শুধুমাত্র সাধারণ তথ্যের জন্য। বাজারভেদে
          প্রকৃত দাম পরিবর্তিত হতে পারে।
        </p>
      </div>
    </footer>
  );
}