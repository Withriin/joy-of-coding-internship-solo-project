import {z} from "zod";
import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";

const getCategoryByUserSchema = z.object({
    userId: z.number().positive().int(),
})

export async function GET(request: NextRequest){
    const url = new URL(request.url);
    const userIdParam = url.searchParams.get("userId");
    const userId = parseInt(userIdParam ?? '', 10);

    const validation = getCategoryByUserSchema.safeParse({userId});
    if(!validation.success){
        return NextResponse.json(validation.error.errors, {status: 404});
    }
    try{
        const getAllUserCategories = await prisma.category.findMany({
            where:{
                OR: [
                    { userId: 1 },
                    { userId: Number(userId)},
                ],
            },
        });

        return NextResponse.json(getAllUserCategories, {status: 200});
    }catch(error){
        return NextResponse.json({error: "Failed to fetch statuses"}, {status: 500});
    }
}