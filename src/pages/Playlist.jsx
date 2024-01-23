import React from 'react'
import { Spinner } from '../components'
import { useEffect } from 'react';
import conf from '../conf/conf';
import movieService from '../render/movieconfig';
import GenreMenu from '../components/Footer/GenreMenu';

function Playlist() {
    function handleClick() {
        console.log('ok');
    }





    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className=' min-h-screen dark:bg-neutral-700 w-full text-center'>
            {/* <Spinner height='h-96' /> */}
            <button className='mt-40 p-3 bg-white rounded-lg' onClick={handleClick}>
                name
            </button>
            <GenreMenu />

        </div>
    )
}

export default Playlist