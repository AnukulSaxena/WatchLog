import React, { useEffect, useState } from 'react'
import { Spinner } from '../components/index.js'
import movieService from '../appwrite/movieConfig.js'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { MovieCard } from '../components/index.js'


function Watched() {
    const { $id } = useSelector(state => state.auth.userData);
    const [loading, setLoading] = useState(true);
    const [movieData, setMovieData] = useState(null);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        movieService.getMovieDocs($id, 25, 0)
            .then(response => {
                console.log(response);
                setMovieData(response);
                setLoading(false);
            });
    }, [$id]);

    const fetchNextPageData = () => {
        movieService.getMovieDocs($id, 25, 25 * pageNum)
            .then((res) => {
                setMovieData((prevData) => ({
                    ...res,
                    documents: [...prevData.documents, ...res.documents],
                }));
                setPageNum((prev) => (prev + 1));
            })
            .then(() => {
                console.log("fetchNextPage :: moviesData", movieData);
            })
            .catch((error) => {
                console.error("Error fetching next page:", error);
            });
    };

    return (
        <div className='dark:bg-neutral-700 min-h-screen pt-14'>
            {loading ? <Spinner height='h-96' /> :
                <InfiniteScroll
                    className='py-10 flex flex-wrap justify-center gap-7'
                    dataLength={movieData?.documents?.length || 0}
                    next={fetchNextPageData}
                    hasMore={pageNum <= Math.ceil(movieData?.total / 25)}
                    loader={<Spinner />}
                >
                    {movieData?.documents?.map((item, index) => (
                        <MovieCard key={index} data={item}
                            initStatus={true}
                            crossCheck={false}
                        />
                    ))}
                </InfiniteScroll>
            }
        </div>
    );
}

export default Watched;
