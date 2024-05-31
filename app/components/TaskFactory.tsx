'use client';
import React, {useEffect, useState} from "react";
import {Task} from "@prisma/client";
import TaskCard from "@/app/components/TaskCard";
import {TaskCreation} from "@/app/components/TaskCreation";

export const TaskFactory = ({userId}:{userId:number}) => {
    const [taskList,setTaskList] = useState<Task[]>([]);

    useEffect(() => {
        fetch(`/api/tasks?userId=${userId}`).then(
            (response) => {
                if(response.ok) {
                    return response.json()
                }
            }
        ).then((json) => {
            setTaskList(json);
        });
    }, [userId]);

    function submitForm(taskForm:any) {
        // TODO - change this very obvious function name. \/\/\/
        postButNotFetchButIDontRememberTheName(`/api/tasks`, {
            title: taskForm.title,
            userId: 1,
            description: taskForm.description,
            statusId: taskForm.statusId
        }).finally(
            () => {
                // TODO - trigger effect
            }
        );

    }

    return (
        <>
            {taskList.map((task) => (
                <TaskCard key={task.id} task={task}/>
            ))}
            <TaskCreation onSubmit={submitForm}></TaskCreation>
        </>
    );
};