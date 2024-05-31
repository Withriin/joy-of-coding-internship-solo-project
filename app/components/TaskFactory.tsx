'use client';
import {useEffect, useState} from "react";
import {Task} from "@prisma/client";

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

    return (
        <>
            {taskList.map(({id, title}) => (
                <div key={id}>
                    {title}
                </div>
            ))}
        </>
    );
};