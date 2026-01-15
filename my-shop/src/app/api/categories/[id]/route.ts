import { NextResponse } from "next/server";

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

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = categories.find((c) => c.id === parseInt(params.id));

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}
