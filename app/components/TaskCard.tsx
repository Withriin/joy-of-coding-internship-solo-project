'use client'
import React, {useState, useEffect} from 'react';
import {Box, Card, Flex, ScrollArea, Text} from "@radix-ui/themes";
import {Avatar} from "@radix-ui/react-avatar";

const TaskCard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks?userId=1');
            if(response.ok){
                const data = await response.json();
                setTasks(data);
            }else{
                console.error('failed to fetch tasks', response.statusText);
            }
        };
        fetchTasks();
    }, []);
    return (
        <div>
            <Box>
                <Card size='1'>
                    <Flex>
                        <Box maxWidth='100px' maxHeight='30px'>
                            <ScrollArea>
                                {tasks.map(({id, title}) => (
                                    <Text key={id} as='div' size='2' weight='bold'>
                                        {title}
                                    </Text>
                                ))}
                            </ScrollArea>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </div>
    )};

export default TaskCard;