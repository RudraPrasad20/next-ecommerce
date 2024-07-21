import { products } from "@/db/schema";
import { db } from "@/lib/db";
import { productSchema } from "@/lib/validators/productSchema";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  let validData;
  // validator from lib/validators - zod
  try {
    validData = productSchema.parse({
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      image: data.get("image"),
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("catch error", { status: 400 });
  }

  // to generate and store in public/assets folder .pmg or .jpeg etc..
  const fileName = `${Date.now()}.${validData.image.name.split(".").pop()}`;

  try {
    const buffer = new Uint8Array(await validData.image.arrayBuffer());
    await writeFile(
      path.join(process.cwd(), "public/assets", fileName),
      buffer
    );
  } catch (error) {
    return NextResponse.json("catch error", { status: 500 });
  }

  try {
    await db.insert(products).values({ ...validData, image: fileName });
  } catch (error) {
    // remove img from fs
    return NextResponse.json("failed to store products in db", { status: 500 });
  }
  return NextResponse.json({ message: "OK" }, { status: 201 });
}

export async function GET(req: NextRequest) {
  try {
    const allProducts = await db.select().from(products).orderBy(products.id);
    return NextResponse.json(allProducts);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
