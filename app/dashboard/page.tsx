import React from 'react';
import TaskCard from "@/app/components/TaskCard";
import {useViewport} from "@/app/components/ViewPortContext";

const DashboardPage = () => {


    return (
        <div className='flex'>
            Dashboard Page
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
        </div>
    );
};

export default DashboardPage;