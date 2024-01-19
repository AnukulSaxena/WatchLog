import React, { useEffect, useState } from 'react'
import movieService from '../render/movieconfig';
import { useSelector } from 'react-redux'
import { InfiniteScrollComponent } from '../components'

function Watched() {
    const { status, userData } = useSelector(state => state.auth);
    const [loading, setLoading] = useState(true);
    const [movieData, setMovieData] = useState({
        success: true,
        data: [],
        totalCount: 0
    });
    const [pageNum, setPageNum] = useState(1);

    async function getNextPageData() {
        const response = await movieService.getPaginatedMovieDocs({
            user_id: userData?.$id,
            pageNum,
            limit: 25
        })
        console.log("Watched :: getNextPageData :: response", response)
        setPageNum(prev => prev + 1);
        setMovieData((prevData) => ({
            ...response, data: [...prevData.data, ...response.data],
        }));
        setLoading(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (status) {
            getNextPageData();
        }
    }, []);


    return (
        <div className='dark:bg-neutral-700 min-h-screen pt-14'>
            {
                !loading &&
                <InfiniteScrollComponent
                    movieData={movieData?.data}
                    fetchNextPageData={getNextPageData}
                    pageNum={pageNum}
                    total_pages={Math.ceil(movieData?.totalCount / 25)}
                    initStatus={true}
                    crossCheck={false}
                />
            }
        </div>
    );
}

export default Watched;
