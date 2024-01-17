import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { MovieCard, Spinner } from '../components'

function InfiniteScrollComponent({
    movieData,
    fetchNextPageData,
    pageNum,
    total_pages,
    initStatus,
    crossCheck
}) {
    return (
        <div>
            <InfiniteScroll
                className='py-10 flex flex-wrap justify-center gap-3'
                dataLength={movieData?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= total_pages}
                loader={<Spinner />}
            >
                {movieData?.map((item, index) => {
                    return <MovieCard
                        key={index}
                        data={item}
                        initStatus={initStatus}
                        crossCheck={crossCheck}
                    />
                })}
            </InfiniteScroll>
        </div>
    )
}

export default InfiniteScrollComponent