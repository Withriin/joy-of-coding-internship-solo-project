import React from 'react';
import {TaskFactory} from "@/app/components/TaskFactory";
import axios from 'axios';

const DashboardPage = () => {
const userId = 1;


    return (
        <div className='flex'>
            Dashboard Page
            <TaskFactory userId={userId}></TaskFactory>
        </div>
    );
};

export default DashboardPage;