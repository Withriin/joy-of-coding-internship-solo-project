import React from 'react';
import {Box, Card, Flex, Text} from "@radix-ui/themes";
import {Avatar} from "@radix-ui/react-avatar";

const TaskCard = () => {
    return (
        <div>
            <Box>
                <Card>
                    <Flex>
                        <Box>
                            <Text as='div' size='2' weight='bold'>
                                TEST
                            </Text>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        </div>
    )};

export default TaskCard;