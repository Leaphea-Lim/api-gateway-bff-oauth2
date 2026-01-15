"use client";

import Link from "next/link";
import { useCart } from "../context/cardContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-slate-600">
          <p>Your cart is empty.</p>
          <Link
            href="/dashboard"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            ← Back to products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white/60 backdrop-blur rounded-xl p-4 shadow border"
              >
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {item.name}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white/60  backdrop-blur rounded-xl p-6 shadow border h-fit">
            <h2 className="text-xl text-slate-700 font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4 text-slate-700">
              <span className="">Total</span>
              <span className="font-bold">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={clearCart}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md mb-3"
            >
              Clear Cart
            </button>

            <button
              className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-md"
            >
              Checkout (Mock)
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
