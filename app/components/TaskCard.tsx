'use client'
import React, {useState, useEffect} from 'react';
import {Box, Card, Flex, ScrollArea, Text} from "@radix-ui/themes";
import {Task} from "@prisma/client";
import StatusDropdown from "@/app/components/StatusDropdown";

interface TaskProps{
    task: Task;
}
const TaskCard = ({task}: TaskProps) => {
    const [stateTask, setStateTask] = useState<Task>(task);

    const handleStatusChange = (statusId: number) => {
        setStateTask(prevTask => ({...prevTask, statusId}));
    };

    return (
        <div>
            <Box>
                <Card size='1'>
                    <Flex>
                        <Box maxWidth='300px' maxHeight='300px'>
                            <ScrollArea>
                                <Text key={stateTask.id} as='div' size='2' weight='bold'>
                                    {stateTask.title}
                                </Text>
                                <StatusDropdown id={stateTask.statusId} onChange={handleStatusChange}/>
                                <Text>{stateTask. description}</Text>
                            </ScrollArea>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </div>
    )};

export default TaskCard;