import React from 'react'
import Rating from './Rating'

function MovieDetail({ movieData }) {
    return (
        <div className=" w-full lg:flex-grow">
            <div className='my-5'>

                <h1
                    className="flex items-center text-5xl font-extrabold dark:text-white">
                    {movieData?.title}
                </h1>
            </div>
            <div>

                <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
                    <p>{movieData?.tagline}</p>
                </blockquote>

            </div>
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-400"></hr>

            <div>
                <h4 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 lg:text-3xl dark:text-white">Overview</h4>
                <p className='mb-3 text-gray-500 text-lg dark:text-gray-400'>{movieData?.overview}</p>
            </div>

            <div className='my-10'>
                <h4 className="mb-6 text-xl font-extrabold leading-none tracking-tight text-gray-900 lg:text-2xl dark:text-white">Genre</h4>
                <div>
                    {movieData?.genres?.map((genre) => {
                        return (
                            <span key={genre?.id} className='bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-1 rounded dark:bg-neutral-900 dark:text-gray-300'> {genre?.name} </span>
                        )
                    })}
                </div>
            </div>
            <div>
                <Rating
                    movieRating={movieData?.vote_average}
                    id={movieData?.id}
                />
            </div>
            <div className=" md:flex text-xl h my-5 gap-3">
                {movieData?.status && (
                    <div className="md:mr-5 my-2 ">
                        <span className=" dark:text-white">
                            Status:{" "}
                        </span>
                        <span className="dark:text-white opacity-50">
                            {movieData.status}
                        </span>
                    </div>
                )}
                {movieData?.release_date && (
                    <div className="md:mx-5 my-2">
                        <span className="dark:text-white">
                            Release Date:{" "}
                        </span>
                        <span className="dark:text-white opacity-50">
                            {
                                movieData.release_date
                            }
                        </span>
                    </div>
                )}
                {movieData?.runtime && (
                    <div className="md:mx-5 my-2">
                        <span className=" dark:text-white">
                            Runtime:{" "}
                        </span>
                        <span className=" dark:text-white opacity-50">
                            {
                                movieData.runtime
                            }
                        </span>
                    </div>
                )}
            </div>


        </div>
    )
}

export default MovieDetail