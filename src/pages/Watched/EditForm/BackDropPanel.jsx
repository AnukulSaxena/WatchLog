import React, { useEffect, useState } from 'react'
import playlistService from '../../../express/playlistConfig'
import { useSelector } from 'react-redux'

const BackDropPanel = ({ playlistId, closePanel }) => {
    const { mediaType, url } = useSelector(state => state.home);
    const [backdropData, setBackDropData] = useState([]);
    useEffect(() => {
        playlistService.getPlaylistBD(playlistId, mediaType)
            .then(res => {
                console.log(res)
                setBackDropData(res)
            })
    }, [mediaType])

    function handleClick(backdrop_path) {
        closePanel();
        console.log(backdrop_path)
        playlistService.setPlaylistBD(playlistId, backdrop_path)
            .then(res => {
                console.log(res)
            })
    }

    function handleMore() {

    }

    return (
        <div
            className='z-10 fixed overflow-y-scroll pt-40 inset-0 flex justify-center  bg-neutral-800 backdrop-blur-sm bg-opacity-30   '
        >
            <div
                className='  h-fit w-full flex flex-wrap justify-center gap-5' >
                {
                    backdropData.map(item => {
                        return item.backdrop_path &&
                            <div
                                key={item._id}
                                className='w-96 cursor-pointer h-52 relative '
                            >
                                <button
                                    onClick={handleMore}
                                    className=" absolute bottom-0 text-white md:bottom-0 right-0 h-10 w-14"
                                >
                                    <svg className="w-5 h-5  rounded-md ml-8 mt-2  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                    </svg>

                                </button>
                                <img
                                    className='w-full object-cover h-full '
                                    onClick={() => { handleClick(item.backdrop_path) }}
                                    src={url.backdrop + item.backdrop_path}
                                    alt="img" />
                            </div>
                    })
                }

            </div>

        </div>
    )
}

export default BackDropPanel