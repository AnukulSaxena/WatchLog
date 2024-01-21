import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { MovieCard, Spinner } from '..'

function InfiniteScrollComponent({
    data,
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
                dataLength={data?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= total_pages}
                loader={<Spinner />}
                endMessage={
                    <p className='text-center w-full dark:text-white'>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {data?.map((item, index) => {
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