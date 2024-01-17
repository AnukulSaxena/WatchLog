import React from 'react'
import { Switcher } from '../'
function WindowFooter() {
    return (
        <div>
            <nav className="fixed z-10 w-full bottom-0 p-2 dark:bg-neutral-800 ">
                <div className='w-full  flex justify-center'>
                    <Switcher />
                </div>
            </nav>
        </div>
    )
}

export default WindowFooter