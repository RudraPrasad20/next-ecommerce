import { warehouses } from "@/db/schema";
import { db } from "@/lib/db";
import { warehouseSchema } from "@/lib/validators/wareHouseSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const reqData = await req.json()
    let validData;
    try {
        validData = await warehouseSchema.parse(reqData)
        
    } catch (error) {
        return NextResponse.json({message: error}, {status: 400})
    }

    try {
        await db.insert(warehouses).values(validData)
        return NextResponse.json({message: "OK" }, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "failed to store warehouse"}, {status: 500})
    }
}

export async function GET(req: NextRequest) {
    try {
        // get all warehouses
        const allWarehouses = await db.select().from(warehouses)
        return NextResponse.json(allWarehouses)
    } catch (error) {
        return NextResponse.json({message: "failed to fetch warehouse"}, {status: 500})
    }
}