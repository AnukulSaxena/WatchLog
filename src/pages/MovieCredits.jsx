import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../utils/api'
import { MovieCard, CreditSwitcher } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { setMovieData as setMovieDataState } from '../store/movieSlice'
import movieService from '../render/movieconfig'
function MovieCredits() {
    const { id } = useParams()
    const [movieData, setMovieData] = useState(null)
    const [isChecked, setIsChecked] = useState(true)
    const { status, userData } = useSelector(state => state.auth)
    const { mediaType } = useSelector(state => state.home)
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()

    function handleChangeCredit() {
        setIsChecked(prev => !prev);
    }

    async function initialStatus() {
        const response = await fetchDataFromApi(`/person/${id}/${mediaType}_credits`);
        if (isChecked) {
            setMovieData(response.cast)
        } else {
            setMovieData(response.crew)
        }
        if (status) {
            const responseData = await movieService.getMovieDocs(userData?.$id, mediaType);
            console.log("Home :: handleUseEffect :: responseData ", responseData);
            dispatch(setMovieDataState(responseData));
        }
        setLoading(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        initialStatus();

        return () => {
            setLoading(true);
        }

    }, [isChecked, mediaType])
    return (
        <div
            className='min-h-screen pt-10 bg-neutral-700'
        >
            <CreditSwitcher
                className={'w-full flex justify-center mt-10'}
                handleChangeCredit={handleChangeCredit}

            />
            {
                !loading &&
                <div className=' mt-2 flex flex-wrap justify-center gap-3'>
                    {movieData?.map((item, index) => {
                        return <MovieCard
                            key={index}
                            data={item}
                            initStatus={false}
                            crossCheck={true}
                        />
                    })}
                </div>
            }
        </div>
    )
}

export default MovieCredits