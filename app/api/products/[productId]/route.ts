import { products } from "@/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(res: NextResponse, { params }: { params: { productId: string } }) {
  try {
    const productId = params.productId;
    // checking if product.id is = productId of params or not - eq
    // should return 1 product array only - limit(1)
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(productId)))
      .limit(1);

    // if length = 0
    if (!product.length) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 400 }
      );
    }
    return NextResponse.json(product[0]);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch a product." },
      { status: 500 }
    );
  }
}
