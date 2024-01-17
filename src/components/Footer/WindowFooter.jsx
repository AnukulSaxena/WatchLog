import React from 'react'
import { Switcher } from '../'
import { useSelector } from 'react-redux'
function WindowFooter() {
    const movieData = useSelector(state => state.movie.movieData)
    return (
        <div>
            <nav className="fixed z-10 w-full bottom-0 p-2 dark:bg-neutral-800 ">
                <div className='flex justify-between items-center '>

                    <div className="flex-1 flex gap-40 items-center justify-center">
                        <Switcher />
                        <div className="">
                            <div className="rounded-lg bg-white text-lg py-1 px-3">{movieData?.total}</div>
                        </div>
                    </div>


                </div>
            </nav>
        </div>
    )
}

export default WindowFooter