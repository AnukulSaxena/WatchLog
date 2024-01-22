import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../utils/api';
import { useSelector } from 'react-redux';
import Cast from '../components/Other/Cast';
import Crew from '../components/Other/Crew';
import { MovieDetail, Img } from '../components';
function Detail() {
    const { mediaType, id } = useParams()
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const url = useSelector(state => state.home.url)
    const imageUrl = url.backdrop + data?.poster_path;
    const [creditData, setCreditData] = useState(null)


    const fetchData = async () => {
        const res = await fetchDataFromApi(`/${mediaType}/${id}/credits`)
        setCreditData(res);

        const response = await fetchDataFromApi(`/${mediaType}/${id}`)
        setData(response)

        setLoading(false)
        console.log(imageUrl)
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData()
    }, [])


    return (
        <div className='px-5 lg:pt-24 pt-16 dark:bg-neutral-700 lg:px-20 xl:px-40'>
            <div className=' bg-neutral-700 p-5 lg:flex gap-5  w-full '>
                <div className=" lg:min-h-[500px] ">
                    <Img
                        className=' h-full lg:max-w-80 rounded-xl'
                        src={`${imageUrl}`}

                    />
                </div>
                <MovieDetail
                    data={data}
                />
            </div>
            <div className=' bg-neutral-700 h-fit row-auto w-full p-5'>

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
            <div className=' bg-yellow-500  min-h-screen w-full'>

            </div>

        </div>
    )
}

export default Detail