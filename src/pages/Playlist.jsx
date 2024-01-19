import React from 'react'
import { Spinner } from '../components'
import { useEffect } from 'react';
import conf from '../conf/conf';
import movieService from '../render/movieconfig';

function Playlist() {


    const url = 'https://api.themoviedb.org/3/person/10912-eva-green/movie_credits?language=en-US';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjJmZWRmYzU4OGJjMDg1ODM1MzM3ODdjYzdlM2FhNyIsInN1YiI6IjY1ODZjZTlkZmFkOGU5NWQyMjhkYTEzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.csIchcypkH4e0loQ1g_QFCAh5l7hiNpY8CTJWnMk9TY'
        }
    };

    async function handleClick() {
        await fetch(url, options)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error('error:' + err));
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

        </div>
    )
}

export default Playlist