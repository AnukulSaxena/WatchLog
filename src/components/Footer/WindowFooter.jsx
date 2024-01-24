import React from 'react'
import { Switcher, MediaSwitcher } from '../'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function WindowFooter() {
    const movieData = useSelector(state => state.movie.movieData)
    return (
        <div>
            <nav className="fixed z-10 round w-full bottom-0 p-2 dark:bg-neutral-800 flex justify-center">
                <div className="flex w-fit gap-6 rounded-md md:gap-32 justify-center ">
                    <Switcher />
                    <Link to="/" >
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">WatchLog</span>
                    </Link>
                    <MediaSwitcher />
                </div>
            </nav>
        </div>
    )
}

export default WindowFooter




{/* <div className="">
                                <div className="rounded-lg bg-white text-lg py-1 px-3">{movieData?.total || 0}</div>
                            </div> */}


//             <div className="flex gap-2 md:gap-16 lg:gap-40 ">
//     <div
//         className='flex-1 justify-center flex gap-4'>
//         <Switcher

//         />
//         <MediaSwitcher />

//     </div>

//     <div className='flex-1 flex gap-2 justify-center'>
//         <GenreMenu

//         />
//
//     </div>
// </div>