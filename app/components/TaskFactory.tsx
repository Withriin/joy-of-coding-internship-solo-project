'use client';
import React, {useCallback, useEffect, useState} from "react";
import {Prisma, Task} from "@prisma/client";
import TaskCard from "@/app/components/TaskCard";
import { TaskCreation } from "@/app/components/TaskCreation";
import axios from "axios";
import DateTimeFilter = Prisma.DateTimeFilter;




export const TaskFactory = ({ userId }: { userId: number }) => {
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [statusIds, setStatusIds] = useState<number[]>([]);

    const fetchTasks = useCallback(async () => {
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
    }, [userId]);

    const fetchStatusIds = useCallback(async () =>{
        try{
            const response = await fetch(`/api/status?userId=${userId}`);
            if (response.ok){
                const statuses = await response.json();
                setStatusIds(statuses.map((status: {id: number}) => status.id));
            }else{
                console.error("Failed to fetch status IDs");
            }
        }catch(error){
            console.error("Failed to fetch status IDs:", error);
        }
    }, [userId]);

    useEffect(() => {
        fetchTasks().catch(error => console.error("Error fetching tasks:", error));
        fetchStatusIds().catch(error => console.error("Error fetching status IDs:", error));
    }, [fetchTasks, fetchStatusIds]);

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const dueDate = formData.get('dueDate') as string | null;
        const dueTime = formData.get('dueTime') as string | null;

        let dueDateTime: Date | null = null;

        if(dueDate){
            if (dueTime) {
                dueDateTime = new Date(`${dueDate}T${dueTime}:00`);
            } else {
                dueDateTime = new Date(dueDate);
            }
        }

        const taskForm: any = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            statusId: parseInt(formData.get('statusId') as string, 10),
            category: formData.get('category') as string,
            userId: userId,
        };

        if (dueDateTime){
            taskForm.due_date = dueDateTime;
        }

        try {
            await createTask(taskForm);
            await fetchTasks(); // Refresh the task list after creating a new task
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
                <TaskCard key={task.id} task={task} statusIds={statusIds} />
            ))}
            <TaskCreation onSubmit={handleFormSubmit} statusIds={statusIds} />
        </>
    );
};
