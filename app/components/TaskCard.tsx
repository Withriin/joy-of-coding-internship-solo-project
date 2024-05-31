'use client'
import React, {useState, useEffect} from 'react';
import {Box, Card, Flex, ScrollArea, Text} from "@radix-ui/themes";
import {Avatar} from "@radix-ui/react-avatar";
import {Task} from "@prisma/client";

const TaskCard = ({task}:{task:Task}) => {
    const [stateTask, setStateTask] = useState<Task>(task);

    useEffect(() => {
    }, []);

    return (
        <div>
            <Box>
                <Card size='1'>
                    <Flex>
                        <Box maxWidth='100px' maxHeight='30px'>
                            <ScrollArea>
                                <Text key={stateTask.id} as='div' size='2' weight='bold'>
                                    {stateTask.title}
                                </Text>
                                <Text>{stateTask.description}</Text>
                            </ScrollArea>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </div>
    )};

export default TaskCard;