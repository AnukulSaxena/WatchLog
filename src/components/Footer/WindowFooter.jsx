import React, { useEffect, useState } from 'react'
import { Switcher, MediaSwitcher } from '../'
import { useSelector } from 'react-redux'
import PlaylistPanel from './PlaylistPanel';
function WindowFooter() {
    const [currentPlaylist, setCurrentPlaylist] = useState('Watched');
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const { movieData, movieDataIndex } = useSelector(state => state.movie)
    function handleClick() {
        setIsPanelOpen(prev => !prev)
    }
    useEffect(() => {
        if (movieData.length) {
            setCurrentPlaylist(movieData[movieDataIndex]?.name)
            setIsPanelOpen(false)
        }
    }, [movieDataIndex])

    return (

        <>
            {
                isPanelOpen &&
                <PlaylistPanel />
            }
            <nav className="fixed z-50 round w-full bottom-0 p-2 bg-neutral-800 flex lg:px-72 px-10 justify-center">
                <div className="flex w-full gap-6 rounded-md md:gap-32 justify-between ">
                    <Switcher />
                    <div
                        className='md:w-32 w-28 text-white relative text-lg text-center p-1 bg-white rounded-md '
                    >
                        <button
                            onClick={handleClick}
                            className='w-full rounded-md h-full px-2 truncate  bg-neutral-800'
                        >
                            {currentPlaylist}
                        </button>
                    </div>
                    <MediaSwitcher />
                </div>
            </nav>
        </>

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