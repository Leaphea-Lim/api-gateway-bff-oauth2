import { NextResponse } from "next/server";

// Mock category data
const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Computers, phones, and gadgets",
  },
  {
    id: 2,
    name: "Clothing",
    description: "Fashion and apparel",
  },
  {
    id: 3,
    name: "Home & Garden",
    description: "Furniture and home decor",
  },
  {
    id: 4,
    name: "Books",
    description: "Educational and entertainment books",
  },
];

export async function GET() {
  try {
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
