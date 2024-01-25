import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchDataFromApi } from '../../../utils/api';
import Spinner from '../Spinner';
import MovieCard from '../../MovieCard/MovieCard';

function Carousel({ id, type }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetchDataFromApi(`/movie/${id}/${type}?language=en-US&page=1`)
            .then((res) => {
                setData(res);
                if (res?.results?.length)
                    setLoading(false);
            })
    }, [])
    return !loading && (
        < div className=" h-fit" >
            <div className="text-center text-4xl font-extrabold  tracking-tight text-gray-900 md:text-4xl dark:text-white">{type}</div>
            <hr className="h-px my-10 bg-gray-200 border-0 dark:bg-gray-400"></hr>


            <div className="flex gap-5 md:h-80 h-72 w-full no-scrollbar overflow-x-scroll">
                {
                    !loading &&
                    data?.results?.map
                        ((item, index) =>
                            <MovieCard
                                key={index}
                                data={item}
                                initStatus={false}
                                crossCheck={true}
                            />
                        )
                }
            </div>



        </div >
    )
}

export default Carousel