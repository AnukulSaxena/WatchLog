import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getQueryData } from '../../utils/openai';
import { fetchDataFromApi } from '../../utils/api';
import MovieCard from '../MovieCard/MovieCard';
function SeachBar({ toggleSearchBar }) {
    const navigate = useNavigate()
    const [currentOption, setCurrentOption] = useState("movie")
    const [inputValue, setInputValue] = useState('');
    const searchBarRef = useRef()
    const [searchMovieData, setSearchMovieData] = useState(null);
    const searchOptions = [
        {
            name: "Movie",
            value: "movie"
        },
        {
            name: "TvShow",
            value: "tv"
        },
        {
            name: "Person",
            value: "person"
        },
        {
            name: "AI",
            value: "AI"
        }
    ]
    const handleClick = () => {

        if (inputValue) {
            if (currentOption === "AI") {
                getQueryData(inputValue)
                    .then(res => {
                        const moviesString = res?.choices[0]?.message?.content;
                        const moviesArray = moviesString.split(', ').map(movie => movie.replace(/^"|"$/g, ''));

                        console.log(moviesArray);
                        const moviePromises = moviesArray.map(movie => fetchDataFromApi(`/search/movie?query=${movie}&page=1`))
                        Promise.all(moviePromises)
                            .then(res => {
                                console.log(res)
                                // const newArray = res.map(item => item.results[0])
                                // console.log(newArray)
                                setSearchMovieData(res)
                            })
                    })
            }
            else {
                toggleSearchBar()
                navigate(`/search/${currentOption}/${inputValue}`);
                setInputValue("")
            }
        }
    };

    function handleClickOutside(event) {

        if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
            toggleSearchBar()

        }

    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleClick()
        }
    };


    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (

        <div
            ref={searchBarRef}
            className='h-fit w-full p-5 space-y-2 bg-neutral-700 rounded-md'>
            <input
                placeholder='Blade Runner...'
                className='w-full h-10 pl-5 rounded-sm'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text" />

            <div
                className='w-full h-10 flex justify-between gap-5 '
            >
                <div
                    className='flex-grow h-full flex gap-4 justify-start'
                >
                    {
                        searchOptions.map((option, index) => (
                            <button
                                className={` ${(currentOption === option.value) ? " bg-neutral-800" : "border border-neutral-500"}  text-gray-300 px-2 md:px-4 rounded-md`}
                                key={option.name + index}
                                onClick={(e) => { setCurrentOption(e.target.value) }}
                                value={option.value}
                            >
                                {option.name}
                            </button>
                        ))

                    }
                </div>

                <button
                    onClick={handleClick}
                    className='px-2 rounded-md md:px-4 w-18 h-full bg-neutral-800 text-gray-300'
                >
                    Search
                </button>

            </div>
            {
                searchMovieData &&
                <div className=' space-y-10 '>
                    {
                        searchMovieData.map((item, index) => (
                            <div className='no-scrollbar overflow-x-scroll'>
                                <div className='flex gap-5 md:h-80 h-72 w-fit '>
                                    {
                                        item.results.map((movie, index) => (
                                            <MovieCard
                                                key={index}
                                                data={movie}
                                                initStatus={false}
                                                crossCheck={true}
                                                mediaType={'movie'}
                                            />
                                        ))
                                    }

                                </div>
                            </div>
                        ))
                    }

                </div>
            }

        </div>
    )
}

export default SeachBar