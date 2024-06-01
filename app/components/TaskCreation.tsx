'use client';

import React from "react";

interface TaskCreationProps {
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
}

// interface TaskCreationProps {
//     onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
// }

export const TaskCreation = ({onSubmit}: TaskCreationProps) => {

    const statusList = [0,1,2,3,4];
    const categoryList = ["A","B","C","D"];

    return (
        <div className='max-w-xl'>
            <form className='space-y-3'
                  onSubmit={onSubmit}
            >
                <div><span className={"fieldName"}>Title:</span><input name={"title"} type={"text"} className="title" required/></div>
                <div><span className={"fieldName"}>Status:</span>
                    <select name={"statusId"} className="status">
                        {
                            statusList.map((i: number) =>
                                <option key={i} value={i}>{i}</option>
                            )
                        }
                    </select>
                </div>
                <div><span className={"fieldName"}>Description:</span><textarea name={"description"} className="description"/></div>
                <div><span className={"fieldName"}>Category:</span>
                    <select name={"category"} className="category">
                        {
                            categoryList.map((i: string) =>
                                <option key={i} value={i}>{i}</option>
                            )
                        }
                    </select>
                </div>
                <button type={"submit"}>Save</button>
            </form>
        </div>
    )

}



