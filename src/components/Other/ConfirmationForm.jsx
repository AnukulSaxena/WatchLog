import React, { useEffect } from 'react'
import playlistService from '../../express/playlistConfig'
import { useNavigate, useParams } from 'react-router-dom'

function ConfirmationForm({ mode, closeConfMenu }) {
    const { playlistId } = useParams();
    const navigate = useNavigate()
    async function handleResponse(e) {
        if (e.target.value === 'false') {
            closeConfMenu()
        } else {
            console.log(mode)
            if (mode === "delete") {
                await playlistService.deletePlaylist(playlistId)
                navigate('/playlist')
            }
        }
    }
    return (
        <div
            className=' w-60 h-40 flex flex-col justify-center items-center bg-white rounded-md'
        >
            <div
                className='h-20 w-full px-2 font-semibold'
            >
                This will permanently {mode} your playlist.
            </div>
            <div
                className='w-full h-10 py-1 flex justify-center gap-10'
            >
                <button
                    onClick={(e) => { handleResponse(e) }}
                    value={true}
                    className='h-full px-4 rounded-md bg-blue-500 hover:bg-neutral-300'
                >Yes</button>
                <button
                    onClick={(e) => { handleResponse(e) }}
                    value={false}
                    className='h-full border-neutral-700 border px-4 rounded-md hover:bg-neutral-300'
                >No</button>

            </div>

        </div>
    )
}

export default ConfirmationForm