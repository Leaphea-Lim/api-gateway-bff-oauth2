import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ===== Hero Section ===== */}
      <main className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <h1 className="text-4xl text-green-400 md:text-5xl font-extrabold mb-6">
              Shop confidently.
            </h1>

            <p className="text-slate-600 text-lg mb-8 max-w-md leading-relaxed">
              MyShop helps you manage products and categories easily with a
              clean and modern shopping experience.
            </p>

            <h1 className="text-green-400 font-extrabold text-2xl mb-2">
              CHECK OUT PROCATE
            </h1>
            <Link
              href="/dashboard"
              className="inline-block text-slate-700 px-6 py-3 rounded-md border-2 border-green-300"
            >
              Get started
            </Link>
          </div>

          {/* Right image */}
          <div className="flex justify-center">
            {/* Fake image placeholder – replace src with your SVG */}
            <Image
              src="/groceries.svg"
              alt="Illustration"
              width={500}
              height={400}
              className="w-full max-w-md"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
