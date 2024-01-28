import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { MovieCard, Spinner } from '..'
import Avatar from './Avatar'

function InfiniteScrollComponent({
    data,
    fetchNextPageData,
    pageNum,
    total_pages,
    initStatus,
    crossCheck,
    searchType
}) {

    return (
        <div>
            <InfiniteScroll
                className='py-4 flex flex-wrap justify-center gap-3'
                dataLength={data?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= total_pages}
                loader={<Spinner />}
                endMessage={
                    <p className='text-center w-full text-white'>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {data?.map((item, index) => {
                    return (searchType === 'person') ? <Avatar key={index} item={item} /> :
                        <MovieCard
                            key={index}
                            data={item}
                            initStatus={initStatus}
                            crossCheck={crossCheck}
                            mediaType={searchType}
                        />
                })}
            </InfiniteScroll>
        </div>
    )
}

export default InfiniteScrollComponent