import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMovieData, setMovieDataIndex } from '../../store/movieSlice';
import playlistService from '../../express/playlistConfig';
function PlaylistPanel() {
    const [inputValue, setInputValue] = useState('')
    const { movieData } = useSelector(state => state.movie)
    const dispatch = useDispatch()
    function handleClick(item) {
        const movieIndex = movieData.findIndex((movie) => movie.name === item.name);
        dispatch(setMovieDataIndex(movieIndex))
    }

    async function createPlaylist() {
        if (inputValue.trim() !== "") {
            const response = await playlistService.createPlaylist({ name: inputValue, description: "No Description" })
            if (response) {
                const newData = await playlistService.getUserPlaylists();
                if (newData.length)
                    dispatch(setMovieData(newData))
            }
        }
        setInputValue("")
    }

    const handleKeyDown = (event) => {
        console.log(event)
        if (event.key === 'Enter') {
            createPlaylist()
            console.log('init')
        }
    };

    return (
        <div
            className=' bg-neutral-800  text-white text-xl truncate bg-opacity-20 backdrop-blur-sm flex justify-center items-center  z-10 fixed inset-0 '
        >
            <div className='w-52 rounded-md h-72 text-center   space-y-2 flex-col flex bg-neutral-700'>
                <h1 className=' py-2 border-b border-neutral-800 '>Playlists</h1>
                <ul
                    className=' overflow-y-scroll no-scrollbar h-full '
                >
                    {
                        movieData.map((item, index) => (
                            <li
                                onClick={() => { handleClick(item) }}
                                className='hover:bg-white cursor-pointer hover:text-black'
                                key={index}>{item.name}</li>
                        ))
                    }
                </ul>
                <div className='w-full h-10 border-t border-neutral-800 flex p-1'>
                    <input type="text"
                        value={inputValue}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => { setInputValue(e.target.value) }}
                        placeholder='New Playlist.. '
                        className='h-full w-full px-1 truncate  text-lg bg-neutral-700' />
                    <button onClick={createPlaylist} className='h-full  w-10 bg-neutral-700 flex items-center justify-center '><span className=' inline-block align-middle'>+</span></button>

                </div>
            </div>

        </div>
    )
}

export default PlaylistPanel