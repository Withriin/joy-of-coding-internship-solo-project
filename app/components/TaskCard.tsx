
import React, {useState, useEffect} from 'react';
import {Box, Card, Flex, ScrollArea, Text} from "@radix-ui/themes";
import {Task} from "@prisma/client";
import StatusDropdown from "@/app/components/StatusDropdown";
import axios from "axios";

interface TaskProps{
    task: Task;
    statusIds: number[];
}
const TaskCard = ({task, statusIds}: TaskProps) => {
    const [stateTask, setStateTask] = useState<Task>({
        ...task,
        due_date: task.due_date ? new Date(task.due_date) : null,
});

    const handleStatusChange = (statusId: number) => {
        setStateTask(prevTask => ({...prevTask, statusId}));
    };

    return (
        <div>
            <Box>
                <Card size='1'>
                    <Flex>
                        <Box className='inline-block' maxWidth='300px' maxHeight='300px'>
                            <ScrollArea>
                                <Text key={stateTask.id} as='div' size='2' weight='bold'>
                                    {stateTask.title}
                                </Text>
                                <StatusDropdown id={stateTask.statusId} statusIds={statusIds} onChange={handleStatusChange}/>
                                <Text>{stateTask.description}</Text>
                                <Text>
                                    {stateTask.due_date
                                        ? new Date(stateTask.due_date).toDateString()
                                        : 'No due date'
                                    }
                                </Text>
                            </ScrollArea>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </div>
    )};

export default TaskCard;