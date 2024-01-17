import React, { useEffect, useState } from 'react'
import movieService from '../appwrite/movieConfig.js'
import { useSelector } from 'react-redux'
import { InfiniteScrollComponent } from '../components'

function Watched() {
    const { $id } = useSelector(state => state.auth.userData);
    const [loading, setLoading] = useState(true);
    const [movieData, setMovieData] = useState(null);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        movieService.getMovieDocs($id, 25, 0)
            .then(response => {
                console.log("Watched :: useEffect :: response ", response);
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
            {
                !loading &&
                <InfiniteScrollComponent
                    movieData={movieData?.documents}
                    fetchNextPageData={fetchNextPageData}
                    pageNum={pageNum}
                    total_pages={Math.ceil(movieData?.total / 25)}
                    initStatus={true}
                    crossCheck={false}
                />
            }
        </div>
    );
}

export default Watched;
