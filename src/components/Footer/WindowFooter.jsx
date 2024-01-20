import React from 'react'
import { Switcher } from '../'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
function WindowFooter() {
    const movieData = useSelector(state => state.movie.movieData)
    return (
        <div>
            <nav className="fixed z-10 w-full bottom-0 p-2 dark:bg-neutral-800 ">
                <div className='flex justify-between items-center '>

                    <div className="flex-1 flex gap-16 lg:gap-40 items-center justify-center">
                        <Switcher />
                        <div className="flex gap-5">
                            <Link to="/" className="flex items-center">
                                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">WatchLog</span>
                            </Link>

                        </div>
                        <div className="">
                            <div className="rounded-lg bg-white text-lg py-1 px-3">{movieData?.total || 0}</div>
                        </div>
                    </div>


                </div>
            </nav>
        </div>
    )
}

export default WindowFooter