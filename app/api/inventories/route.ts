import { inventories, products, warehouses } from "@/db/schema";
import { db } from "@/lib/db";
import { inventorySchema } from "@/lib/validators/inventoriesSchema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const requestData = await req.json();

  let validatedData;

  try {
    validatedData = await inventorySchema.parse(requestData);
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  try {
    console.log("validated data", validatedData);
    await db.insert(inventories).values(validatedData);

    return NextResponse.json({ message: "OK" }, { status: 201 });
  } catch (err) {
    console.log("error: ", err);
    // todo: check database status code, and if it is duplicate value code then send the message to the client.
    return NextResponse.json(
      { message: "Failed to store the inventory into the database" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allInventories = await db
      .select({
        id: inventories.id,
        sku: inventories.sku,
        warehouse: warehouses.name,
        product: products.name,
      })
      .from(inventories)
      .leftJoin(warehouses, eq(inventories.warehouseId, warehouses.id))
      .leftJoin(products, eq(inventories.productId, products.id))
      .orderBy(desc(inventories.id));

    return NextResponse.json(allInventories);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch inventories" },
      { status: 500 }
    );
  }
}
