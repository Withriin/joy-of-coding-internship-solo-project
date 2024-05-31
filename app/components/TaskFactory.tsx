'use client';
import React, { useEffect, useState } from "react";
import { Task } from "@prisma/client";
import TaskCard from "@/app/components/TaskCard";
import { TaskCreation } from "@/app/components/TaskCreation";

export const TaskFactory = ({ userId }: { userId: number }) => {
    const [taskList, setTaskList] = useState<Task[]>([]);

    useEffect(() => {
        fetchTasks();
    }, [userId]);

    const fetchTasks = async () => {
        try {
            const response = await fetch(`/api/tasks?userId=${userId}`);
            if (response.ok) {
                const tasks = await response.json();
                setTaskList(tasks);
            } else {
                console.error("Failed to fetch tasks");
            }
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const taskForm = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            statusId: parseInt(formData.get('statusId') as string, 10),
            category: formData.get('category') as string,
            userId: userId
        };

        try {
            await createTask(taskForm);
            fetchTasks(); // Refresh the task list after creating a new task
        } catch (error) {
            console.error("Failed to create task:", error);
        }
    };

    const createTask = async (taskData: any) => {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) {
            throw new Error("Failed to create task");
        }
    };

    return (
        <>
            {taskList.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
            <TaskCreation onSubmit={handleFormSubmit} />
        </>
    );
};
