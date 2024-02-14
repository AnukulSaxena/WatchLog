import React, { useEffect, useState } from 'react'
import playlistService from '../../../express/playlistConfig'
import { useSelector } from 'react-redux'
import { fetchDataFromApi } from '../../../utils/api'
import { useNavigate } from 'react-router-dom'

const BackDropPanel = ({ playlistId, closePanel }) => {
    const { mediaType, url } = useSelector(state => state.home);
    const [backdropData, setBackDropData] = useState([]);
    const [fileData, setFileData] = useState([])
    const [isSet, setIsSet] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        playlistService.getPlaylistBD(playlistId, mediaType)
            .then(res => {
                setBackDropData(res)
            })
    }, [mediaType])

    function handleClick(backdrop_path) {
        playlistService.setPlaylistBD(playlistId, backdrop_path)
            .then(res => {
                console.log(res)
                navigate('/playlist')
            })
    }

    function handleMore(id) {
        fetchDataFromApi(`/${mediaType}/${id}/images`)
            .then(res => {
                console.log(res.backdrops)
                setFileData(res.backdrops)
                setIsSet(prev => !prev)
            })
    }

    return (
        <div
            className='z-20 fixed overflow-y-scroll  py-24 inset-0 flex flex-col items-center  bg-neutral-800 backdrop-blur-sm bg-opacity-30   '
        >
            <button
                onClick={closePanel}
                className='bg-white text-lg font-semibold px-5 rounded-sm mb-16'
            >Close</button>
            {
                isSet ? <div
                    className='  h-fit w-full flex flex-wrap justify-center gap-5' >
                    {
                        backdropData.map(item => {
                            return item.backdrop_path &&
                                <div
                                    key={item._id}
                                    className='w-96 cursor-pointer h-52 relative '
                                >
                                    <button
                                        onClick={() => { handleMore(item.id) }}
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

                </div> :
                    <div
                        className='  h-fit w-full flex flex-wrap justify-center gap-5' >
                        {
                            fileData.map(item =>
                            (<div
                                key={item.file_path}
                                className='w-96 cursor-pointer h-52 relative'>
                                <button
                                    onClick={() => { handleClick(item.file_path) }}
                                    className='bg-white text-lg font-semibold px-5 rounded-sm bottom-2 left-2 absolute'
                                >Set</button>
                                <a className='bg-white text-lg font-semibold px-5 rounded-sm bottom-2 right-2 absolute' href={url.profile + item.file_path} target="_blank">Open</a>
                                <img
                                    className='w-full object-cover h-full '
                                    src={url.backdrop + item.file_path}
                                    alt="img" />
                            </div>)
                            )
                        }

                    </div>
            }

        </div>
    )
}

export default BackDropPanel