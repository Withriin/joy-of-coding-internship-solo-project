'use client';

import {TextField} from "@radix-ui/themes";

const TaskCreation = () => {

    return (
        <div className='max-w-xl'>
            <form className='space-y-3'
                  onSubmit={onSubmit}
                  >
                <TextField.Root></TextField.Root>
            </form>
        </div>
    )

}



