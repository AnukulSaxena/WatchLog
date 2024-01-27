import React, { useEffect, useState } from 'react'
import movieService from '../render/movieconfig';
import { useSelector } from 'react-redux'
import { InfiniteScrollComponent } from '../components'

function Watched() {
    const { status, userData } = useSelector(state => state.auth);
    const { mediaType } = useSelector(state => state.home)
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        success: true,
        data: [],
        totalCount: 0
    });
    const [pageNum, setPageNum] = useState(1);

    async function getNextPageData(page = pageNum) {
        try {
            const response = await movieService.getPaginatedMovieDocs({
                user_id: userData?.$id,
                pageNum: page,
                limit: 25
            }, mediaType)
            console.log("Watched :: getNextPageData :: response", response)
            setPageNum(prev => prev + 1);
            setData((prevData) => ({
                ...response, data: [...prevData?.data, ...response?.data],
            }));
            setLoading(false);
        } catch (error) {
            console.error("Watched :: getNextPageData :: Error", error)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (status) {
            getNextPageData(1);
            console.log(pageNum)
        }
        return () => {

            setPageNum(1)
            setLoading(true)
            setData({
                success: true,
                data: [],
                totalCount: 0
            })
        }

    }, [mediaType]);


    return (
        <div className='dark:bg-neutral-700 min-h-screen pt-14'>
            {
                !loading &&
                <InfiniteScrollComponent
                    data={data?.data}
                    fetchNextPageData={getNextPageData}
                    pageNum={pageNum}
                    total_pages={Math.ceil(data?.totalCount / 25)}
                    initStatus={true}
                    crossCheck={false}
                    searchType={mediaType}

                />
            }
        </div>
    );
}

export default Watched;
