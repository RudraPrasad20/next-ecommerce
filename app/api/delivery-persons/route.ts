import { deliveryPersons, warehouses } from "@/db/schema";
import { db } from "@/lib/db";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPersonSchema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqData = await req.json();
  let validData;

  try {
    // make sure to send 13 number in the number field
    validData = await deliveryPersonSchema.parse(reqData);
  } catch (error) {
    return NextResponse.json(
      { message: "error in the schema you passed" },
      { status: 400 }
    );
  }

  try {
    await db.insert(deliveryPersons).values(validData);
    return NextResponse.json({ message: "OK" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "failed to load delivery person" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // leftjoin - to link with warehouse
    const allDeliveryPersons = await db
      .select({
        id: deliveryPersons.id,
        name: deliveryPersons.name,
        phone: deliveryPersons.phone,
        warehouse: warehouses.name,
      })
      .from(deliveryPersons)
      .leftJoin(warehouses, eq(deliveryPersons.warehouseId, warehouses.id))
      .orderBy(desc(deliveryPersons.id));
    return NextResponse.json(allDeliveryPersons);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch delivery persons" },
      { status: 500 }
    );
  }
}
