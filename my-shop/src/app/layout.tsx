import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CartProvider } from "./context/cardContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "PROCATE",
  description: "A Modern Product and Category Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
        {/* ===== Navbar ===== */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20 shadow-sm">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="text-xl font-bold text-slate-800">PROCATE</div>

            {/* Nav */}
            {/* <nav className="hidden md:flex items-center gap-8 text-sm">
              <Link
                href="/products"
                className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
              >
                Categories
              </Link>
            </nav> */}

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* <Link
                href="#"
                className="text-sm text-slate-700 hover:text-slate-900 font-medium transition-colors"
              >
                Sign in
              </Link> */}
              <Link
                href="http://localhost:8080/oauth2/authorization/gateway-client"
                className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-700 transition-all shadow-md hover:shadow-lg"
              >
                Sign in
              </Link>
            </div>
          </div>
        </header>
        <CartProvider>{children}</CartProvider>
        <footer className="backdrop-blur-md bg-white/30 text-slate-800 p-6 text-center mt-8 border-t border-white/20">
          <p className="font-medium">© 2026 PROCATE</p>
        </footer>
      </body>
    </html>
  );
}
