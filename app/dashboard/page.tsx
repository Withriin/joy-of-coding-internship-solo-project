import React from 'react';
import TaskCard from "@/app/components/TaskCard";
import {Box, Card, Flex, Text} from "@radix-ui/themes";
import {Avatar, AvatarImage} from "@radix-ui/react-avatar";
import {AvatarIcon} from "@radix-ui/react-icons";


const DashboardPage = () => {
    return (
        <div>
            Dashboard Page
            <TaskCard />
        </div>
    );
};

export default DashboardPage;