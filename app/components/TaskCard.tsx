import React from 'react';
import {Box, Card, Flex, ScrollArea, Text} from "@radix-ui/themes";
import {Avatar} from "@radix-ui/react-avatar";

const TaskCard = () => {
    return (
        <div>
            <Box>
                <Card size='1'>
                    <Flex>
                        <Box maxWidth='100px' maxHeight='30px'>
                            <ScrollArea>
                            <Text as='div' size='2' weight='bold'>
                                TEST
                                {'\n'}Now testing scrollbar interaction
                                Now testing scrollbar interaction
                                Now testing scrollbar interaction
                            </Text>
                            </ScrollArea>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </div>
    )};

export default TaskCard;