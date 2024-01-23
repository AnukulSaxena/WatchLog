import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setMediaType } from '../../../store/homeSlice.js'

const MediaSwitcher = ({ className = "" }) => {
    const [isChecked, setIsChecked] = useState(true)
    const dispatch = useDispatch()

    const handleCheckboxChange = () => {
        if (isChecked) {
            dispatch(setMediaType("tv"))
        } else {
            dispatch(setMediaType("movie"))
        }
        setIsChecked(prev => !prev)
    }

    return (
        <div className={className}>
            <label className=' flex cursor-pointer rounded-r-md bg-white p-1'>
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
