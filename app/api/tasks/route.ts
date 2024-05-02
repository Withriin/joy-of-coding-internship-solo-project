import {NextRequest, NextResponse} from "next/server";
import { z } from 'zod';
import prisma from '@/prisma/client';

const createTaskSchema = z.object({
    title: z.string().min(1, 'Title is required'). max(100),
    // subtasks: z.array(z.string()),
    description: z.string().max(255),
    // category: z.string().max(100),
    statusId: z.number(),
    // Collaborations: z.array(z.string()),
    // TaskCategories: z.array(z.string())
});

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = createTaskSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, {status: 404})
    const newTask = await prisma.task.create({
        data: { title: body.title, description: body.description, statusId: body.status}
    });

    return NextResponse.json(newTask, {status: 201});
}

//Collaboration: body.Collaboration, TaskCategories: body.TaskCategories