import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../../../utils/api';
import MovieCard from '../../MovieCard/MovieCard';

function Carousel({ id, type, mediaType }) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetchDataFromApi(`/${mediaType}/${id}/${type}?language=en-US&page=1`)
            .then((res) => {
                setData(res);
                if (res?.results?.length)
                    setLoading(false);
            })
            .catch(error => {
                console.error("Carousel :: useffect :: Error", error)
            })
    }, [])
    return !loading && (
        < div className=" h-fit" >
            <div className="text-center text-4xl font-extrabold  tracking-tight  md:text-4xl text-white">{type}</div>
            <hr className="h-px my-10  border-0 bg-gray-400"></hr>
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
                                mediaType={mediaType}
                            />
                        )
                }
            </div>



        </div >
    )
}

export default Carousel