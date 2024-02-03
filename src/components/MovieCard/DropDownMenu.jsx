import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import movieServicex from '../../express/movieConfig';

const DropdownMenu = ({ className = '', id, mediaType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { movieData } = useSelector(state => state.movie)
    const [loading, setLoading] = useState(true);
    const filterPanelRef = useRef(null)


    function handleClickOutside(event) {

        if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
            setIsOpen(false);

        }
    }

    function handleClick(item) {
        console.log(id, mediaType, item._id)
        movieServicex.addId(id, mediaType, item._id)
        setIsOpen(false)
    }

    function handleOpenClick(e) {
        e.stopPropagation()
        console.log(isOpen)
        setIsOpen(prev => !prev)

    }
    useEffect(() => {
        if (movieData.length)
            setLoading(false)
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            setLoading(true)
        }
    }, [movieData])
    return (
        <>
            <button
                className=" absolute bottom-0 text-white md:bottom-1 right-0 h-10 w-14"
                onClick={handleOpenClick}
            >
                <svg className="w-5 h-5  rounded-md ml-8 mt-2  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>

            </button>
            {
                isOpen && !loading && (
                    <div className=' absolute inset-0 bg-neutral-800 backdrop-blur-sm bg-opacity-30 flex justify-center items-center'>

                        <ul
                            ref={filterPanelRef}
                            className="  max-h-44 overflow-y-scroll no-scrollbar w-[136px]  md:w-[152px] rounded-lg   bg-neutral-700 text-white ">
                            {
                                movieData.map((item, index) => (
                                    <li
                                        key={item.name + index}
                                        onClick={() => { handleClick(item) }}
                                        className="px-4 hover:bg-neutral-800 py-1 truncate">

                                        {item.name}
                                    </li>)

                                )
                            }

                        </ul>

                    </div>
                )
            }
        </>
    );
};

export default DropdownMenu;

