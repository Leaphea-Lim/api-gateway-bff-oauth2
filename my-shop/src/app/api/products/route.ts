import { NextResponse } from "next/server";

// Mock product data
const products = [
  {
    id: 1,
    name: "Laptop",
    description: "High-performance laptop",
    price: 999.99,
    stock: 10,
  },
  {
    id: 2,
    name: "Mouse",
    description: "Wireless mouse",
    price: 29.99,
    stock: 50,
  },
  {
    id: 3,
    name: "Keyboard",
    description: "Mechanical keyboard",
    price: 79.99,
    stock: 25,
  },
  {
    id: 4,
    name: "Monitor",
    description: "4K monitor",
    price: 299.99,
    stock: 15,
  },
];

export async function GET() {
  try {
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
