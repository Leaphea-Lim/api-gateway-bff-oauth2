"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/cardContext";
import Link from "next/link";

type Category = {
  id: number;
  name: string;
  description?: string;
};

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  categoryId?: number;
};

export default function DashboardPage() {
  const { addToCart } = useCart();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("/api/categories", { cache: "no-store" }),
          fetch("/api/products", { cache: "no-store" }),
        ]);

        if (!catRes.ok || !prodRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const cats = await catRes.json();
        const prods = await prodRes.json();

        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProducts =
    selectedCategory === null
      ? products
      : products.filter((p) => p.categoryId === selectedCategory);

  return (
    <main className="container mx-auto px-6 py-10">
      {/* Header with Cart Icon */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-1">
            Product Dashboard
          </h1>
          <p className="text-slate-600">Browse products by category</p>
        </div>
        <Link
          href="/cart"
          className="relative flex items-center justify-center w-12 h-12 bg-green-200 hover:bg-green-400 text-white rounded-full shadow-md hover:shadow-lg transition-all"
          title="Go to cart"
        >
          🛒
        </Link>
      </div>

      {loading && (
        <p className="text-center text-slate-600 py-10">Loading dashboard...</p>
      )}

      {error && <p className="text-center text-red-600 py-10">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories */}
          <aside className="lg:col-span-1">
            <div className="bg-green-500/10 backdrop-blur rounded-xl p-4 border border-white/30 shadow-md">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Categories
              </h2>

              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-3 py-2 rounded-md mb-2 text-sm transition
                  ${
                    selectedCategory === null
                      ? "bg-white text-slate-700"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
              >
                All Products
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-md mb-2 text-sm transition
                    ${
                      selectedCategory === cat.id
                        ? "bg-green-500 text-white"
                        : "hover:bg-slate-100 text-slate-700"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Products */}
          <section className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <p className="text-slate-600">
                No products found in this category.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group backdrop-blur-md bg-white/40 rounded-xl p-4 border border-white/20 shadow-md hover:shadow-xl hover:bg-white/60 transition-all"
                  >
                    <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-600">
                      {product.name}
                    </h3>

                    <p className="text-slate-600 text-sm line-clamp-3 min-h-[3.5rem] mb-4">
                      {product.description || "No description available"}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                      <p className="text-xl font-bold text-slate-800">
                        ${product.price.toFixed(2)}
                      </p>

                      <button
                        onClick={() =>
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                          })
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
