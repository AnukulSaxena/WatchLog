import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMediaType } from '../../../store/homeSlice.js'
import { setParamFilters } from '../../../store/homeSlice.js'

const MediaSwitcher = ({ className = "" }) => {
    const [isChecked, setIsChecked] = useState(true)
    const dispatch = useDispatch()
    const { paramFilters } = useSelector(state => state.home)

    const handleCheckboxChange = () => {
        const updatedParamsFilters = {
            ...paramFilters,
            with_genres: '',
        };


        dispatch(setParamFilters(updatedParamsFilters));
        if (isChecked) {
            dispatch(setMediaType("tv"))
        } else {
            dispatch(setMediaType("movie"))
        }
        setIsChecked(prev => !prev)
    }

    return (
        <div className={className}>
            <label className=' flex cursor-pointer rounded-md bg-white p-1'>
                <input
                    type='checkbox'
                    name='Switcher'
                    className='sr-only'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <div
                    className={` text-center  w-8 rounded md:w-16 text-lg  ${!isChecked ? ' bg-neutral-500 text-white' : ''
                        }`}
                >
                    TV
                </div>
                <div
                    className={`text-center  w-8 rounded md:w-16 text-lg  ${isChecked ? ' bg-neutral-500 text-white' : ''
                        }`}
                >MV</div>
            </label>
        </div>
    )
}

export default MediaSwitcher
