import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GenreSwitcher from './GenreSwitcher.jsx';


const GenreMenu = ({ className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState([]);
    const { movieGenre, tvGenre, mediaType } = useSelector(state => state.home)
    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(true)


    function handleClick(option) {
        setSelectedOption((prevData) => {
            const isOptionSelected = prevData.includes(option);

            if (isOptionSelected) {
                return prevData.filter((selectedOption) => selectedOption !== option);
            } else {
                return [...prevData, option];
            }
        });
        console.log(selectedOption)
    }

    function handleUpperClick() {
        setSelectedOption([])
    }

    useEffect(() => {
        setLoading(true)
        if (mediaType === 'movie') {
            setOptions(movieGenre)
        } else {
            setOptions(tvGenre)
        }
        setLoading(false)
        return () => {
            setSelectedOption([])
        }


    }, [mediaType])


    return (
        <div className={` flex rounded-md bg-white max-h-9 w-full p-1 ${className}`}>


            <button
                className={` text-white  pl-2 bg-neutral-700  left-1 rounded-l-md ${selectedOption.length ? "" : "hidden"}`}
                onClick={handleUpperClick}
            >Reset</button>

            <button
                onClick={() => setIsOpen(prev => !prev)}
                type="button"
                className={`inline-flex dark:bg-neutral-700 w-full  text-white justify-end ${selectedOption.length ? "rounded-r-md" : "rounded-md"} ${isOpen ? "rounded-tr-md" : ""} px-4 bg-white font-medium  hover:bg-neutral-500`}
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
            >

                Genre |
                <svg
                    className="-mr-1 ml-2 my-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 12a1 1 0 01-0.7-0.29l-4-4a1 1 0 111.4-1.42L10 9.58l3.3-3.3a1 1 0 111.4 1.42l-4 4a1 1 0 01-0.7 0.3z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>



            {isOpen && !loading && (
                <div className="  absolute top-[20px]  mt-2 w-[168px]  md:w-56 rounded-b-md shadow-lg bg-neutral-700  overflow-y-scroll no-scrollbar max-h-48">

                    {options?.map((option, index) => (
                        <GenreSwitcher
                            key={index}
                            item={option}
                            handleClick={handleClick}
                        />
                    ))}

                </div>
            )}
        </div>
    );
};

export default GenreMenu;
