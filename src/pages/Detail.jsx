import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../utils/api';
import { useSelector } from 'react-redux';
import Cast from '../components/Other/Cast';
import Crew from '../components/Other/Crew';
function Detail() {
    const { mediaType, id } = useParams()
    const [movieData, setMovieData] = useState(null);
    const [loading, setLoading] = useState(true)
    const url = useSelector(state => state.home.url)
    const imageUrl = url.backdrop + movieData?.poster_path;
    const [creditData, setCreditData] = useState(null)


    const fetchMovieData = async () => {
        const res = await fetchDataFromApi(`/${mediaType}/${id}/credits`)
        setCreditData(res);

        const response = await fetchDataFromApi(`/${mediaType}/${id}`)
        setMovieData(response)

        setLoading(false)
        console.log(imageUrl)
    };

    useEffect(() => {
        fetchMovieData()
    }, [])


    return (
        <div className='px-5 pt-24'>
            <div className=' bg-red-500 p-5 sm:flex gap-5 w-full '>
                <div className=" w-full sm:max-w-80">
                    <img
                        className=' h-full'
                        src={`${imageUrl}`}
                        alt={`${movieData?.poster_path}`}
                    />
                </div>
                <div className=" w-full sm:flex-grow">
                    <div>
                        {movieData?.title}
                    </div>
                    <div>{movieData?.overview}</div>
                    <div>sdfsdf</div>

                </div>

            </div>
            <div className=' bg-blue-500 min-h-screen w-full flex-row p-5'>
                <div className='w-full h-80'>
                    <Cast
                        data={creditData?.cast}
                        loading={loading}
                    />
                </div>
                <div className='w-full h-80'>
                    <Crew
                        data={creditData?.crew}
                        loading={loading}
                    />

                </div>

            </div>
            <div className=' bg-yellow-500  min-h-screen w-full'>

            </div>

        </div>
    )
}

export default Detail