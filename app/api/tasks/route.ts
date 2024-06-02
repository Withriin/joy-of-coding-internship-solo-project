import {NextRequest, NextResponse} from "next/server";
import {z} from 'zod';
import prisma from '@/prisma/client';
import {validationSchemas} from "@/app/validationSchemas";

const getTasksByUserSchema = z.object({
    userId: z.number().positive().int(),
});

export async function POST(request: NextRequest){
    const body = await request.json();

    const validation = validationSchemas.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400})

    const data: any = {
        title: body.title,
        userId: body.userId,
    };
    if(body.description !== undefined) data.description = body.description;
    if(body.statusId != undefined) data.statusId = body.statusId;
    if(body.due_date !== undefined) data.due_date = new Date(body.due_date);

    try{
        const newTask = await prisma.task.create({data});
        return NextResponse.json(newTask, { status: 201 });
    }catch(error){
        console.error('Failed to create task:', error);
        return NextResponse.json({error: 'Failed to create task '}, {status: 500 });
    }
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

    if (isNaN(TaskId)){
        return NextResponse.json({error: 'Invalid task ID' }, { status: 400 });
    }

    const body = await request.json();

    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.userId !== undefined) updateData.userId = body.userId;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.statusId !== undefined) updateData.statusId = body.statusId;
    if (body.due_date !== undefined) updateData.due_date = new Date(body.due_date);

    try {
        const updateResponse = await prisma.task.update({
            where: {id: Number(TaskId)},
            data: updateData,
        });

        return NextResponse.json(updateResponse, {status: 200})
    }catch (error){
        console.error('Failed to update task:' , error);
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
        return NextResponse.json(deleteTask, {status: 200});
    }catch (error){
        console.error("Error deleting task:", error);
        return NextResponse.json({error: 'Failed to delete task'}, {status: 500});
    }
}

//Collaboration: body.Collaboration, TaskCategories: body.TaskCategories