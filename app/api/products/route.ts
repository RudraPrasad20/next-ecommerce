import { FormDescription } from "@/components/ui/form";
import { products } from "@/db/schema";
import { db } from "@/lib/db";
import { productSchema } from "@/lib/validators/productSchema";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
    const data = await req.formData()
    let validData;
    // validator from lib/validators - zod
    try {
        validData = productSchema.parse({
            name: data.get('name'),
            description: data.get('description'),
            price: Number(data.get('price')),
            image: data.get('image')
        })
        
    } catch (error) {
        console.log(error)
        return new NextResponse("catch error", {status: 400})
    }

// to generate and store in public/assets folder .pmg or .jpeg etc..
    const fileName = `${Date.now()}.${validData.image.name.split(".")}`

    try {
        const buffer = Buffer.from(await validData.image.arrayBuffer())
        await writeFile(path.join(process.cwd(), "public/assets", fileName), buffer)
    } catch (error) {
        return NextResponse.json("catch error", {status: 500})
    }

    try {
        await db.insert(products).values({...validData, image: fileName})
    } catch (error) {
        // remove img from fs
        return NextResponse.json("failed to store products in db", {status: 500})
    }
    return NextResponse.json({message: "OK"}, {status: 201})
}