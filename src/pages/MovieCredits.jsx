import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../utils/api'
import { MovieCard } from '../components'
import { useSelector } from 'react-redux'

function MovieCredits() {
    const { id } = useParams()
    const [movieData, setMovieData] = useState(null)
    const { mode } = useSelector(state => state.movie)

    useEffect(() => {
        fetchDataFromApi(`/person/${id}/movie_credits`)
            .then((res) => {
                if (mode) {
                    setMovieData(res.cast)
                } else {
                    setMovieData(res.crew)
                }
            })
    }, [mode])
    return (
        <div
            className='min-h-screen bg-neutral-700'
        >
            <div className='py-10 flex flex-wrap justify-center gap-3'>
                {movieData?.map((item, index) => {
                    return <MovieCard
                        key={index}
                        data={item}
                        initStatus={false}
                        crossCheck={false}
                    />
                })}


            </div>
        </div>
    )
}

export default MovieCredits