import React from 'react'
import { Spinner } from '../components'
import { useEffect } from 'react';
import conf from '../conf/conf';
import movieService from '../render/movieconfig';

function Playlist() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className=' min-h-screen dark:bg-neutral-700 text-white w-full text-center'>
            <Spinner height='h-96' />
            Coming Soon
        </div>
    )
}

export default Playlist