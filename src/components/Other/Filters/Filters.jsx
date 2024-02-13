import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListItem from './ListItem';
import { setParamFilters } from '../../../store/homeSlice';

function Filters() {
    const { filterData, mediaType } = useSelector(state => state.home);
    const [loading, setLoading] = useState(true);
    const filterPanelRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState(filterData?.genre?.movieGenre);
    const [currentOption, setCurrentOption] = useState({ name: 'Genre', id: 'with_genres' });
    const dispatch = useDispatch();


    function handleReset() {
        dispatch(setParamFilters({
            with_genres: '',
            with_origin_country: '',
            with_original_language: '',
            sort_by: 'vote_count.desc'
        }))
    }
    const multiOption = [
        { name: 'Genre', id: 'with_genres' },
        { name: 'Sort By', id: 'sort_by' },
        { name: 'Language', id: 'with_original_language' }
        , { name: 'Country', id: 'with_origin_country' }
    ];

    function togglePanel() {
        setIsOpen(prev => !prev);


    }



    function handleOptions() {
        switch (currentOption.name) {
            case "Genre":
                setOptions(mediaType === "movie" ? filterData?.genre?.movieGenre : filterData?.genre?.tvGenre);
                break;
            case "Language":
                setOptions(filterData?.language);
                break;
            case "Country":
                setOptions(filterData?.country);
                break;
            case "Sort By":
                setOptions(filterData?.sort);
                break;
            default:
                setOptions([]);
        }
        setLoading(false);
    }

    function handlemultiOptionClick(e) {
        const selectedOption = multiOption.find(option => option.name === e.target.value);
        setCurrentOption(selectedOption);
    }

    function handleClickOutside(event) {

        if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
            setIsOpen(false);

        }

    }

    useEffect(() => {
        setLoading(true);
        if (Object.keys(filterData).length !== 0) {
            handleOptions();
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mediaType, currentOption, filterData]);

    return !loading && (
        <div className={`flex justify-center z-10 w-full h-9 px-4 lg:px-6 bg-neutral-700`}>
            <button
                id='resetButton'
                onClick={togglePanel}
                className="filters-button bg-neutra-700 text-white px-6 md:px-10 rounded-md border border-gray-100 hover:bg-neutral-600 text-lg"
            >
                Filters
            </button>

            <div
                className={`${isOpen ? " " : "hidden"}
                flex justify-center items-center
                fixed z-40 inset-0 bg-neutral-800 bg-opacity-30 backdrop-blur-sm`}
            >
                <div
                    ref={filterPanelRef}
                    className={`   rounded-t-md absolute top-40 z-20 h-96 w-80 md:w-[590px]  bg-neutral-700`}
                >

                    <div className='flex h-full'>
                        <div className='w-1/3 z-50 h-full border-r border-neutral-600'>
                            <ul>
                                {multiOption?.map((item, index) => (
                                    <li key={index} className='w-full h-8 text-center text-white'>
                                        <button
                                            value={item.name}
                                            onClick={handlemultiOptionClick}
                                            className={`h-full w-full ${currentOption === item && "bg-white rounded-md text-black"} hover:rounded-md hover:bg-white hover:text-black`}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className=' w-2/3 h-full  overflow-auto no-scrollbar'>
                            <ul>
                                {options?.map((item, index) => (
                                    <ListItem
                                        key={currentOption.name + mediaType + index}
                                        item={item}
                                        currentOption={currentOption}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div
                        className='w-full h-11 bg-neutral-700 border-t p-1 border-neutral-600 flex rounded-b justify-center text-white'>
                        <button

                            onClick={handleReset}
                            className='text-lg border-gray-100 hover:bg-white hover:text-black px-8 md:px-12 rounded-md border'>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filters;
