import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setParamFilters } from '../../../store/homeSlice';

function ListItem({ item, currentOption }) {
    const { mediaType, paramFilters } = useSelector((state) => state.home);
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkItemPresence = () => {
            const filters = paramFilters[currentOption.id];
            console.log(filters)

            if (currentOption.name === 'Genre') {
                setIsChecked(filters.split(',').includes(item.id.toString()));
            } else {
                setIsChecked(filters === item.id);
            }

            setLoading(false);
        };

        checkItemPresence();
    }, [mediaType, currentOption, item.id, paramFilters]);

    function handleClick() {
        setIsChecked((prev) => !prev);
        const newFilters = { ...paramFilters };

        if (currentOption.name === 'Genre') {
            const genreArray = newFilters.with_genres ? newFilters.with_genres.split(',') : [];
            const genreIndex = genreArray.indexOf(item.id.toString());

            if (genreIndex !== -1) {
                genreArray.splice(genreIndex, 1);
            } else {
                genreArray.push(item.id.toString());
            }

            newFilters.with_genres = genreArray.join(',');
        } else {
            if (newFilters[currentOption.id] !== item.id)
                newFilters[currentOption.id] = item.id;
            else
                newFilters[currentOption.id] = '';
        }

        dispatch(setParamFilters(newFilters));
    }

    return !loading && (
        <li className='w-full h-8 text-center dark:text-white'>
            <button
                value={item.name}
                onClick={handleClick}
                className={`h-full w-full truncate px-2 hover:text-black ${isChecked ? 'dark:bg-neutral-500 text-white' : ''}`}>
                {item.name}
            </button>
        </li>
    );
}

export default ListItem;
