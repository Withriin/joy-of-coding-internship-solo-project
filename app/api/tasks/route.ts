import {NextRequest, NextResponse} from "next/server";
import {z} from 'zod';
import prisma from '@/prisma/client';
import {validationSchemas} from "@/app/validationSchemas";
import {NextApiRequest} from "next";

const getTasksByUserSchema = z.object({
    userId: z.number()
});

export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = validationSchemas.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})
    const newTask = await prisma.task.create({
        data: {
            title: body.title,
            userId: body.userId,
            description: body.description,
            statusId: body.statusId}
    });

    return NextResponse.json(newTask, {status: 201});
}

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const userIdParam = url.searchParams.get("userId");
    const userId = parseInt(<string>userIdParam, 10);

    const validation = getTasksByUserSchema.safeParse({userId});
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 404});
    }

    try {
        const getTaskByUserId = await prisma.task.findMany({
            where: {userId: validation.data.userId},
        });

        return NextResponse.json(getTaskByUserId, {status: 200});
    }catch (error){
        return NextResponse.json({error: "Failed to fetch tasks"}, {status: 500});
    }
}

export async function PUT(request: NextRequest) {
    const url = new URL(request.url);
    const TaskIdParam = url.searchParams.get("taskId");
    const TaskId = parseInt(TaskIdParam ?? '', 10);

    const body = await request.json();
    try {
        const updateResponse = await prisma.task.update({
            where: {id: Number(TaskId)},
            data: {
                title: body.title,
                userId: body.userId,
                description: body.description,
                statusId: body.statusId
            }
        })

        return NextResponse.json(updateResponse, {status: 200})
    }catch (error){
        return NextResponse.json({error: 'Failed to update task'}, {status: 500});
    }
}

export async function DELETE(request: NextRequest) {
    const url = new URL(request.url);
    const taskIdParam = url.searchParams.get("taskId");
    const taskId = parseInt(taskIdParam ?? '', 10);

    if(isNaN(taskId)){
        return NextResponse.json({error: "Invalid task ID"}, {status: 400});
    }
    try {
        const deleteTask = await prisma.task.delete({
            where: {id: taskId}
        });
        return NextResponse.json(deleteTask, {status: 204});
    }catch (error){
        console.error("Error deleting task:", error);
        return NextResponse.json({error: 'Failed to delete task'}, {status: 500});
    }
}

//Collaboration: body.Collaboration, TaskCategories: body.TaskCategories