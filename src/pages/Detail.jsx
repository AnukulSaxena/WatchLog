import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../utils/api';
import { useSelector } from 'react-redux';
import Cast from '../components/Other/MovieDetail/Cast';
import Crew from '../components/Other/MovieDetail/Crew';
import { MovieDetail, Img, Rating } from '../components';
import Carousel from '../components/Other/MovieDetail/Carousel';
function Detail() {
    const { mediaType, id } = useParams()
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const url = useSelector(state => state.home.url)
    const imageUrl = url.backdrop + data?.poster_path;
    const [creditData, setCreditData] = useState(null)


    const fetchData = async () => {
        const response = await fetchDataFromApi(`/${mediaType}/${id}`)
        setData(response)

        const res = await fetchDataFromApi(`/${mediaType}/${id}/credits`)
        setCreditData(res);



        setLoading(false)
        console.log(imageUrl)
    };


    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData()
    }, [id])


    return (
        <div className='px-5 lg:pt-24 pt-16 dark:bg-neutral-700 lg:px-20 xl:px-40'>
            <div className=' dark:bg-neutral-700 border border-gray-400 lg:max-h-[520px] p-5 lg:flex gap-5  w-full '>
                <div className=" relative min-w-80 min-h-[480px] ">
                    <Rating
                        starWidth=' w-4 lg:w-5'
                        movieRating={data?.vote_average}
                        className={`absolute text-lg lg:text-2xl z-10 px-2 top-0 m-1 bg-neutral-700 rounded-lg lg:px-2 `}
                    />
                    <Img
                        className=' h-full  lg:max-w-80 rounded-xl'
                        src={`${imageUrl}`}

                    />
                </div>
                <MovieDetail
                    data={data}
                />
            </div>
            <div className=' my-5 bg-neutral-700 h-fit border border-gray-400 row-auto w-full p-5'>

                <div className='w-full'>

                    <Cast
                        data={creditData?.cast}
                        loading={loading}
                    />
                </div>
                <div className='w-full mt-10'>


                    <Crew
                        data={creditData?.crew}
                        loading={loading}
                    />

                </div>

            </div>
            <div className=' bg-neutral-700 border border-gray-400  h-fit w-full p-5'>
                {
                    data?.id && <Carousel
                        id={data?.id}
                        type='similar'
                    />
                }
                {
                    data?.id && <Carousel
                        id={data?.id}
                        type='recommendations'
                    />
                }


            </div>

        </div>
    )
}

export default Detail