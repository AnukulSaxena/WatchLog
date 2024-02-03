import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SeachBar({ toggleSearchBar }) {
    const navigate = useNavigate()
    const [currentOption, setCurrentOption] = useState("movie")
    const [inputValue, setInputValue] = useState('');
    const searchBarRef = useRef()
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
        }
    ]
    const handleClick = () => {
        if (inputValue) {
            toggleSearchBar()
            navigate(`/search/${currentOption}/${inputValue}`);
            setInputValue("")
        }
    };

    function handleClickOutside(event) {

        if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
            toggleSearchBar()

        }

    }


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

        </div>
    )
}

export default SeachBar