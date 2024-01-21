import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setMediaType } from '../../../store/homeSlice.js'

const MediaSwitcher = () => {
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
        <div>
            <label className=' inline-flex cursor-pointer items-center justify-center rounded-md bg-white p-1'>
                <input
                    type='checkbox'
                    name='Switcher'
                    className='sr-only'
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span
                    className={` space-x-[6px] w-8 rounded py-1 px-2 text-sm font-medium ${!isChecked ? ' bg-neutral-500 ' : ''
                        }`}
                >
                    TV
                </span>
                <span
                    className={`flex text-center space-x-[6px] w-8 rounded py-1  pl-1 text-sm font-medium ${isChecked ? ' bg-neutral-500' : ''
                        }`}
                >MV</span>
            </label>
        </div>
    )
}

export default MediaSwitcher
