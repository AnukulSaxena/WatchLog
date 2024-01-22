import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../utils/api'
import { MovieCard, CreditSwitcher } from '../components'
import { useSelector } from 'react-redux'

function MovieCredits() {
    const { id } = useParams()
    const [movieData, setMovieData] = useState(null)
    const [isChecked, setIsChecked] = useState(true)
    const { mediaType } = useSelector(state => state.home)
    function handleChangeCredit() {
        setIsChecked(prev => !prev);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchDataFromApi(`/person/${id}/${mediaType}_credits`)
            .then((res) => {
                if (isChecked) {
                    setMovieData(res.cast)
                } else {
                    setMovieData(res.crew)
                }
            })
    }, [isChecked, mediaType])
    return (
        <div
            className='min-h-screen pt-10 bg-neutral-700'
        >
            <CreditSwitcher
                className={'w-full flex justify-center mt-10'}
                handleChangeCredit={handleChangeCredit}

            />
            <div className=' mt-2 flex flex-wrap justify-center gap-3'>
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