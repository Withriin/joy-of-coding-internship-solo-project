import React from 'react';
import {TaskFactory} from "@/app/components/TaskFactory";
import {useViewport} from "@/app/components/ViewPortContext";

const DashboardPage = () => {


    return (
        <div className='flex'>
            Dashboard Page
            <TaskFactory userId={1}></TaskFactory>
        </div>
    );
};

export default DashboardPage;